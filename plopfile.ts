// eslint-disable-next-line import/no-extraneous-dependencies
import fs from 'fs-extra';
// eslint-disable-next-line import/no-extraneous-dependencies
import { NodePlopAPI, Actions } from 'node-plop';
import { commonConfigs } from './configs/configs.common';
import { GQLService, GQLEnvironment } from './scripts/src/shared/enums';
import { GraphQLConfigurationService } from './scripts/src/configs/core/GraphQLConfigurationService';

const outputPath = 'tf';
const gqlServices: GQLService[] = fs
  .readdirSync('./services')
  .filter(val => !(val.startsWith('.') || val === 'gateway')) as GQLService[];

const typescriptServices = new Set<GQLService>();
gqlServices.forEach(service => {
  const dirs = fs.readdirSync(`./services/${service}`);
  if (dirs.includes('tsconfig.json')) {
    typescriptServices.add(service);
  }
});

const envList = {
  name: 'env',
  type: 'list',
  choices: Object.values(GQLEnvironment),
  default: GQLEnvironment.Dev
};

const awsRegionList = {
  name: 'awsRegion',
  type: 'list',
  choices: ['us-west-2', 'us-east-2'],
  default: 'us-west-2'
};

const gwVersion = {
  type: 'input',
  name: 'gwVersion',
  message: 'Enter Gateway Version',
  default: '1.0.0'
};

const vpcSubnets = new Map<string, string>([['default', '[]']]);

const vpcSecurityGroups = new Map<string, string>([['default', '[]']]);

function extractEnabledServices(selectedServices: GQLService[] | 'all'): GQLService[] {
  if (selectedServices === 'all') {
    return gqlServices;
  }

  return selectedServices as GQLService[];
}

export default (plop: NodePlopAPI) => {
  plop.setGenerator('buildServices', {
    description: 'build the services.json file for gateway to load',
    prompts: [envList],
    actions: data => {
      const { env } = data;
      const cicdConfig = new GraphQLConfigurationService(env, 'cicd', './configs', commonConfigs);

      const { enabledServices } = cicdConfig.cicdConfiguration;
      const enabledLambdaServices = extractEnabledServices(enabledServices);

      return [
        {
          type: 'add',
          path: 'services/gateway/src/services.generated.ts',
          templateFile: 'templates/services/services.generated.ts.hbs',
          data: {
            lambdaServices: enabledLambdaServices
          },
          force: true
        }
      ];
    }
  });
  plop.setGenerator('taskDef', {
    description: 'generate task def for env',
    prompts: [envList, gwVersion, awsRegionList],
    actions: data => {
      const { env, awsRegion } = data;
      const cicdConfig = new GraphQLConfigurationService(env, 'cicd', './configs', commonConfigs);
      const gatewayConfigService = new GraphQLConfigurationService(env, 'gateway', './configs', commonConfigs);

      const envVars = gatewayConfigService.environmentVariablesConfiguration;
      const { enabledServices, aws } = cicdConfig.cicdConfiguration;
      const { awsAccountId, awsTaskRoleArn } = aws;
      const regionConfigs = aws[awsRegion];

      if (!regionConfigs) {
        throw new Error(`No configuration set up for AWS region ${awsRegion} for GQL environment ${env}!`);
      }

      const { awsAPIGatewayUrl } = regionConfigs;

      if (!awsAPIGatewayUrl) {
        throw new Error(
          `No awsAPIGatewayUrl configuration set up for AWS region ${awsRegion} for GQL environment ${env}!`
        );
      }

      const enabledLambdaServices = extractEnabledServices(enabledServices);

      return [
        {
          type: 'add',
          path: 'services/gateway/task-def.json',
          templateFile: 'templates/task-def/gw-task-def.json.hbs',
          data: {
            gatewayBaseUrl: awsAPIGatewayUrl,
            awsAccountId,
            awsTaskRoleArn,
            awsRegion,
            ssmPrefix: envVars.SSM_PREFIX,
            lambdaServices: enabledLambdaServices,
            envVars,
            enableApolloStudio: envVars.DISABLE_APOLLO_STUDIO !== 'true' && awsRegion === 'us-west-2'
          },
          force: true
        }
      ];
    }
  });
  plop.setGenerator('terraform', {
    description: 'create terraform config files',
    prompts: [envList, gwVersion, awsRegionList],
    actions: data => {
      const actions: Actions = [];

      const { env, awsRegion } = data;

      const gatewayConfigService = new GraphQLConfigurationService(env, 'gateway', './configs', commonConfigs);
      const cicdConfig = new GraphQLConfigurationService(env, 'cicd', './configs', commonConfigs);
      const { enabledServices, aws } = cicdConfig.cicdConfiguration;
      const { awsAccountId, awsLambdaExecutionRole } = aws;
      const regionConfigs = aws[awsRegion];

      if (!regionConfigs) {
        throw new Error(`No configuration set up for AWS region ${awsRegion} for GQL environment ${env}!`);
      }

      const { awsApplicationLoadBalancer } = regionConfigs;

      if (!awsApplicationLoadBalancer) {
        throw new Error(
          `No awsApplicationLoadBalancer configuration set up for AWS region ${awsRegion} for GQL environment ${env}!`
        );
      }

      const enabledLambdaServices = extractEnabledServices(enabledServices);
      const ssmPrefix = gatewayConfigService.environmentVariablesConfiguration.SSM_PREFIX;

      actions.push(() => {
        fs.emptyDirSync(`${outputPath}`);
        return `rm -rf /${outputPath}`;
      });
      actions.push(() => {
        fs.copySync('templates/tf/zip.sh', `${outputPath}/zip.sh`);
        return `/${outputPath}/zip.sh`;
      });
      actions.push({
        type: 'add',
        path: `${outputPath}/main.tf`,
        templateFile: 'templates/tf/main.tf.hbs',
        data: {
          ssmPrefix
        },
        force: true
      });
      actions.push({
        type: 'add',
        path: `${outputPath}/api-gateway.tf`,
        templateFile: 'templates/tf/api-gateway.tf.hbs',
        data: {
          envAlb: awsApplicationLoadBalancer,
          lambdaServices: enabledLambdaServices
        },
        force: true
      });
      enabledLambdaServices.forEach(name => {
        const configService = new GraphQLConfigurationService(env, name, './configs', commonConfigs);
        actions.push({
          type: 'add',
          path: `${outputPath}/${name}.tf`,
          templateFile: 'templates/tf/service.tf.hbs',
          data: {
            name,
            awsAccountId,
            awsLambdaExecutionRole,
            handler: typescriptServices.has(name) ? 'dist/index.handler' : 'index.handler',
            subnets: vpcSubnets.has(name) ? vpcSubnets.get(name) : vpcSubnets.get('default'),
            securityGroups: vpcSecurityGroups.has(name)
              ? vpcSecurityGroups.get(name)
              : vpcSecurityGroups.get('default'),
            envVars: configService.environmentVariablesConfiguration
          },
          force: true
        });
      });

      return actions;
    }
  });
};
