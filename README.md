# GQL Services

## Overview

GQL Services is an enterprise GraphQL project that aggregates many of the business domains at MGM.

Additional details and guides on GraphQL can be found on our Confluence page:
https://mgmdigitalventures.atlassian.net/wiki/spaces/LB/pages/435618312

## Developer Guide

### Setup GQL

To get started, select the appropriate guide from below based on your operating system.

<details>
  <summary>View Windows setup guide</summary>

#### Setup Guide (Windows)

1. Install Node.js 14 at https://nodejs.org/dist/latest-v14.x/. This is used as the project's runtime.

2. Request for the "AWS (Digital Venture)" role from SailPoint. This project uses AWS SSM for secrets. For local development, these secrets are obtained using your AWS credentials.

3. Install AWS CLI at https://aws.amazon.com/cli/. This is used for fetching SSM variables.

> :warning: Do not run `aws configure` Your credentials will be automatically set when using the Okta AWS Assume Role tool.

> :warning: If you already have a `credentials` file in `C:\Users\{{ user }}\.aws\`, move it. Otherwise, it will interfere with Okta AWS Assume Role tool.

4. JDK 11 (OpenJDK is fine) installed. If you have multiple versions of Java, consider using [jabba](https://github.com/shyiko/jabba) or following [this guide](https://mgmdigitalventures.atlassian.net/wiki/spaces/LB/pages/1809612816/Change+Java+Versions+using+System+Variables+and+Scripts)

- Download the ZIP file from `https://jdk.java.net/java-se-ri/11`
- Extract the files to `C:\Program Files\Java`
- Add the bin folder path (i.e. `C:\Program Files\Java\jdk-11\bin`) to the PATH environment variable

5. Install the Okta AWS Assume Role tool.

> :warning: The latest version can be buggy. If errors occur, consider using a version that is one or two versions old at https://github.com/oktadeveloper/okta-aws-cli-assume-role.

- Open powershell as administrator and run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy unrestricted -Force; Invoke-Expression ((New-Object Net.WebClient).DownloadString('https://raw.githubusercontent.com/oktadeveloper/okta-aws-cli-assume-role/master/bin/Install-OktaAwsCli.ps1')); .$profile`
- Replace the contents of `C:\Users\{{ user }\.okta\config.properties` with:

```bash
# OktaAWSCLI
OKTA_ORG=mgmresorts.okta.com
OKTA_AWS_APP_URL=https://mgmresorts.okta.com/home/amazon_aws/0oa1f262mogTgEyJb1d8/272
OKTA_PROFILE=default
OKTA_STS_DURATION=3600
OKTA_AWS_REGION=us-west-2
```

- Run `java -jar C:\Users\{{ user }}\.okta\okta-aws-cli.jar aws sts get-caller-identity` to test the installation. You should be prompted to login and able to select a power user.

6. Create a GitHub personal access token with SSO enabled.

> Consider saving this token as `NPM_TOKEN` in your environment variables. This will avoid having to export it each time you need to install dependencies.

- Go to the personal access tokens page for your GitHub account: https://github.com/settings/tokens
- Generate a new token with the scopes `write:packages` and `repo`.
- Enable SSO for this token.

7. Install VS Code at https://code.visualstudio.com/download. It is **strongly recommended** to use this for development, along with the following extensions:

- Apollo GraphQL
- Prettier – Code formatter
- ESLint

8. Install Python
</details>

<details>
  <summary>View Linux and MacOS setup guide</summary>

#### Setup Guide (Linux and MacOS)

1. Install Node.js 14 at https://nodejs.org/dist/latest-v14.x/. This is the project's runtime.

2. Request for the "AWS (Digital Venture)" role from SailPoint. This project uses AWS SSM for secrets. For local development, these secrets are obtained using your AWS credentials.

3. Install AWS CLI at https://aws.amazon.com/cli/. This is used for fetching SSM variables.

> :warning: Do not run `aws configure` Your credentials will be automatically set when using the Okta AWS Assume Role tool.

> :warning: If you already have a `credentials` file in `~/.aws/`, move it. Otherwise, it will interfere with Okta AWS Assume Role tool.

4. Install JDK 11 (OpenJDK is fine) with `sudo apt update && sudo apt install openjdk-11-jdk`. If you have multiple versions of Java, consider using [jabba](https://github.com/shyiko/jabba) or any other Java version manager.

5. Install the Okta AWS Assume Role tool.

> :warning: The latest version can be buggy. If errors occur, consider using a version that is one or two versions old at https://github.com/oktadeveloper/okta-aws-cli-assume-role.

> :warning: On MacOS, you must enable and log on as the root user to successfully run the scripts below. For instructions on enabling root user, see https://www.maketecheasier.com/enable-root-user-mac/.

- `sudo PREFIX=~/.okta bash <(curl -fsSL https://raw.githubusercontent.com/oktadeveloper/okta-aws-cli-assume-role/master/bin/install.sh) -i`
  - If the above command gives an error, execute it manually:

```bash
curl https://raw.githubusercontent.com/oktadeveloper/okta-aws-cli-assume-role/master/bin/install.sh > install.sh
chmod 777 install.sh
sudo ./install.sh -i
```

- Replace the contents of `~/.okta/config.properties` with:

```bash
# OktaAWSCLI
OKTA_ORG=mgmresorts.okta.com
OKTA_AWS_APP_URL=https://mgmresorts.okta.com/home/amazon_aws/0oa1f262mogTgEyJb1d8/272
OKTA_PROFILE=default
OKTA_STS_DURATION=3600
OKTA_AWS_REGION=us-west-2
```

- Run `java -jar ~/.okta/okta-aws-cli.jar aws sts get-caller-identity` to test the installation. You should be prompted to login and able to select a power user.
  - This script must be run from your `~/.okta` folder.
  - If this command gives you permission issues, please use `su` to elevate to root user and execute commands as root user (`sudo` may not solve the issue fully).
  - Permission issues will also appear as a problem asking for execution of `aws configure` or `An error occurred (InvalidToken) when calling the GetCallerIdentity operation`.

6. Create a GitHub personal access token with SSO enabled.

> Consider saving this token as `NPM_TOKEN` in your environment variables. This will avoid having to export it each time you need to install dependencies.

- Go to the personal access tokens page for your GitHub account: https://github.com/settings/tokens
- Generate a new token with the scopes `write:packages` and `repo`.
- Enable SSO for this token.

7. It is **strongly recommended** to use VSCode for development, along with the following extensions:

- Apollo GraphQL
- Prettier – Code Formatter
- ESLint

8. Install Python
</details>

### Start GQL Locally

Select the appropriate local startup guide below based on your operating system.

<details>
  <summary>View Windows local startup guide</summary>

#### Start GQL Locally (Windows)

- Run `set NPM_TOKEN={token here}`, which will set your GitHub personal access token (which should have been made during setup earlier) to be used during NPM installations.
  - This step can be skipped if you already set `NPM_TOKEN` as a system or user environment variable.
- Run `npm ci` to install dependencies and provide additional setup through the "postinstall" script.
- Run `java -jar C:\Users\{{ user }}\.okta\okta-aws-cli.jar aws sts get-caller-identity` to assume the role of a power user.
  - If you need to login as a different user, run `java -jar C:\Users\{{ user }}\.okta\okta-aws-cli.jar logout`
- Start Apollo Services with `npm run start-services`
- Once services startup, start Apollo Gateway with `npm run start-gateway` in another terminal.

</details>

<details>
  <summary>View Linux and MacOS local startup guide</summary>

#### Start GQL Locally (Linux and MacOS)

> :warning: If any permission issues occur, execute commands using `su`.

- Run `export NPM_TOKEN={token here}`, which will set your GitHub personal access token (which should have been made during setup earlier) to be used during NPM installations.
  - This step can be skipped if you already set NPM_TOKEN as a system or user env variable.
- Run `npm ci` to install dependencies and provide additional setup through the "postinstall" script.
  - If you get an npm warning saying that the postinstall script was not able to be executed, run the scripts in the postinstall script manually:
    - `npm run lerna-bootstrap` will install and symlink all dependencies in the `services/` and `packages/` directories
    - `npx plop buildServices all` will build the services.js file needed for gateway (if this fails, run `npx plop buildServices dev`)
    - `npm run compile-clean` will clean the current compile history
    - `npm run build-config` will build configuration files
    - `npm run compile` will compile TypeScript files into js files in the dist directories
- Run `java -jar ~/.okta/okta-aws-cli.jar aws sts get-caller-identity` to assume the role of a power user
  - If you need to login as a different user, run `java -jar ~/.okta/okta-aws-cli.jar logout`
- Start Apollo Services with `npm run start-services`
- Once services startup, start Apollo Gateway with `npm run start-gateway` in another terminal.

If you get an error saying port 3000 is in use, use `export PORT = 3001` (or any other unused port of your choice) to set an environment variable for the Gateway to use instead of the default port 3000.

</details>

### Debugging with VSCode

Because services (subgraphs) are ran as Lambda functions, we use [serverless-offline](https://www.npmjs.com/package/serverless-offline) to emulate Lambda and API Gateway locally.

Select the appropriate guide below based on whether you want to debug services or the Gateway. For most cases, developers want to debug their services and run the Gateway normally.

<details>
  <summary>View how to debug services</summary>

#### Debugging Services

To debug services:

- In the "Run and Debug" pane:
  - Select "Debug Services" from the dropdown.
  - Press F5 or click the green arrow next to the dropdown.
- Once services are running, start the Gateway by running `npm run start-gateway` in another terminal.

If this fails, you can run the steps manually:

- Start the services with `npm run debug-services`
- In the "Run and Debug" pane:
  - Select "Node: Attach" from the dropdown.
  - Press F5 or click the green arrow next to the dropdown.
  - For "Pick the node.js process to attach to", select the process started in the first step.
- Once services are running, start the Gateway by running `npm run start-gateway` in another terminal.

</details>

<details>
  <summary>View how to debug Gateway</summary>

#### Debugging Gateway

> Ensure that services are running. Service can be running regularly with `npm run start-services` or in debug mode.

To debug Gateway:

- In the "Run and Debug" pane:
  - Select "Debug Gateway" from the dropdown.
  - Press F5 or click the green arrow next to the dropdown.

If this fails, you can run the steps manually:

- Start the Gateway with `npm run debug-gateway` in another terminal.
- In the "Run and Debug" pane:
  - Select "Node: Attach" from the dropdown.
  - Press F5 or click the green arrow next to the dropdown.
  - For "Pick the node.js process to attach to", select the process started in the first step.

</details>

### Knowledge

It is expected that developers working on this project should learn the following subjects over time:

<details>
  <summary>View subjects to learn</summary>

- TypeScript: https://www.typescriptlang.org/
- NodeJS: https://nodejs.org/en/about/
- GraphQL: https://graphql.org/learn/
- Apollo Server: https://www.apollographql.com/docs/apollo-server/
- Apollo Federation: https://www.apollographql.com/docs/apollo-server/federation/introduction/
- npm: https://docs.npmjs.com/about-npm/
- Lerna: https://github.com/lerna/lerna#about
- AWS Lambda: https://aws.amazon.com/lambda/
- AWS ECS: https://aws.amazon.com/ecs/
- Terraform: https://www.terraform.io/intro/index.html
- GitHub Actions: https://docs.github.com/en/actions
- Conventional Commits: https://www.conventionalcommits.org/en/v1.0.0/
- Jest: https://jestjs.io/
</details>

## CI/CD

This project uses GitHub Actions for CI/CD.

### Branching

There are three main branches: `develop`, `preprod`, and `master`, each of which tie into deployment workflows (see [Environments](#environments)).

For standard changes, branching should be done off of our `develop` branch, the default branch of the repo. Be sure to include unit tests for any added code. A Jira task in the PR's description for writing these tests later is also acceptable. We will target 90%+ statement-level coverage in the future.

### Environments

> :warning: All Apigee endpoints are protected by JWT signature, issuer, expiration, and aud verification.

> :warning: All non-Apigee endpoints are deprecated. Strongly consider using Apigee endpoints when integrating with GraphQL.

GraphQL can be accessed through its Apigee API Proxy, Load Balancer, or API Gateway endpoints. The table below shows these endpoints and the deployment trigger for each environment.

| Environment  | Endpoints  | Deployment Trigger |
| --- | --- | --- |
| `dev` | <ul><li>https://mgm-nonprod-dev.apigee.net/graphql</li><li>https://dev-api.mgmresorts.com/graphql</li><li>https://dbxmnajkgd.execute-api.us-west-2.amazonaws.com/dev/graphql</li></ul> | [Manually triggered workflow.](https://github.com/MGMResorts/services-gql/actions/workflows/manual-deploy-non-prod.yml) |
| `qa4` | <ul><li>https://mgm-nonprod-qa4.apigee.net/graphql</li><li>https://qa4-api.mgmresorts.com/graphql</li><li>https://wb0oppcu5d.execute-api.us-west-2.amazonaws.com/qa4/graphql</li></ul> | Merge into `develop` branch.                                                                                            |
| `uat` | <ul><li>https://mgm-nonprod-qa2.apigee.net/graphql</li><li>https://uat-api.mgmresorts.com/graphql</li><li>https://pdwb8ircpd.execute-api.us-west-2.amazonaws.com/uat/graphql</li></ul> | Merge into `develop` branch.                                                                                            |
| `preprod` | <ul><li>https://mgm-nonprod-preprod.apigee.net/graphql</li><li>https://preprod-api.mgmresorts.com/graphql</li><li>https://lofgrv7xh9.execute-api.us-west-2.amazonaws.com/preprod/graphql</li></ul> | Merge into `preprod` branch. |
| `qa4-green` | <ul><li>https://mgm-nonprod-green.apigee.net/graphql</li><li>https://dev-graphqlgw.mgmresorts.com/qa4-green/graphql</li><li>https://53uy0actvb.execute-api.us-west-2.amazonaws.com/qa4-green/graphql</li></ul> | Merge into `master` branch. |
| `production` | <ul><li>https://mgm-prod-prod.apigee.net/graphql</li><li>https://api.mgmresorts.com/graphql</li><li>https://yzg0bxeqi8.execute-api.us-west-2.amazonaws.com/production/graphql</li></ul> | [Manually triggered workflow.](https://github.com/MGMResorts/services-gql/actions/workflows/deploy-production.yml) |

Note: `dev` is our sandbox environment which undergoes many platform-side changes (i.e. it is not stable). Strongly consider using any other non-production environment when integrating with GQL Services.

For details on the production deployment process, see:  
https://mgmdigitalventures.atlassian.net/wiki/spaces/LB/pages/749011032

For details on which underlying services are used per environment, see:  
https://mgmdigitalventures.atlassian.net/wiki/spaces/LB/pages/827523491

### Committing and Versioning

This repo follows the Conventional Commits specification and uses Lerna along with it for automated versioning, change tracking, managing dependencies, and package publishing.

Read about them here:

- https://www.conventionalcommits.org/en/v1.0.0
- https://github.com/lerna/lerna

It is important to follow the specification as Lerna will read the commits to apply versioning and write change logs. Here are examples of appropriate commit messages:

```
feat: add MGM Profile to customer schema
ci: update workflows to store environment variables with $GITHUB_ENV
perf: use distributed cache for static-content subgraph
```

### Pull Requests

PRs should be created against develop and follow the following format:  
`{Jira project}-{Jira ticket number}: {Description}`

<details>
  <summary>View example workflow for standard changes</summary>

- Create branch `RCS-123-NewFeature` off of `develop`.
- Implement feature.
- Create a PR `RCS-123: Add New Feature` from branch `RCS-123-SomeNewFeature` to branch `develop`.
- Fill out the description template.
- After checks succeed and approvals are obtained, merge the PR.
  - This will kick off CI/CD to deploy to `qa4` and `uat` environments.

</details>

### Artifact Publishing

Builds are tied together using the Gateway version. The docker image and all Lambda functions will be tagged with this. Additionally, all artifacts generated will reference this.

All production deployments will upload artifacts for the Lambda ZIP files. This will be uploaded both to GitHub as a workflow artifact and AWS S3 in the `services-gql-builds` bucket as `service-lambdas-{{env}}-v{{gwVersion}}-{{timestamp}}-{{github sha if available or gh action runId}}`.

Artifacts can be triggered to upload on non-prod runs by adding `[upload]` in the commit message or by typing `true` in the upload input if triggering manually.

## Schema

### Code Generation

We use [graphql-code-generator](https://github.com/dotansimha/graphql-code-generator) to generate TypeScript type definitions GQL schemas and resolvers. For code generation to succeed:

- Any common schema items should be placed in `/gql-core/dist/common-schema/schema` directory.
- All service schemas should be definined in its own `schema.ts` file (or collection of `*-schema.ts` files).

Each time the schema is updated, you should:

- Run `npm run generate-schema-types` to build TypeScript types from the schema and put them in the `gql-types` package.
- Run `npm run compile` to compile the generated types.
- Fix any type errors in the services resulting from the schema changes.

### Common Schema

Whenever possible, if you are creating a type that is logically the same as an existing type, reuse or expand that existing type.

To share types among multiple services, define them in `/packages/gql-core/src/common-schema/schema`. If you end up creating a new schema file, export it in the index and add a reference to the file for your service in codegen, `codegen.yml`. Note that some services are importing all the files in the schema folder of the common schema.

### Integrated Schema

Sometimes two graph might want to share a type that has cross graph connections. An example of this would be a type that has a field that is resolved by another graph, like the static content graph.

This can cause an issue if:

- A graph imports this schema, but is missing reference to the type that is being resolved cross graph.
- A graph imports this schema, but resolves the reference using different fields which are not available in this instance.
- The Apollo Studio schema for a service includes this without the reference to the foreign type.

To fix these issues, we separate the integrated common schema from the regular common schema. The integrated common schema lives in `/packages/gql-core/src/common-schema/integratedSchema`.

If you add a schema here you should:

- Export it in the index file but do not include it in `allCommonSchema`.
- Update `/scripts/src/shared/integratedSchemaMappings.ts`.
  - The key in the map should be the name of your service.
  - The value in the map should be an array of the names of the integrateSchema files you want associated with your graph.
- Add the integratedSchema files you need to your service in codegen, `codegen.yml`. Do not use /\* to get all as future additions would break your graph.

## Configuration and Secrets

For details on how configuration and secrets work, see:  
https://mgmdigitalventures.atlassian.net/wiki/spaces/LB/pages/644745639

### Environment Variables

Environment variables are managed in the configuration files found in the `configs` folder.

### Secrets

Secrets are stored and managed in AWS SSM under the Parameter Store service.

The prefix for these secrets is `/ServicesGQL/{env}`. For example, a secret with the key `AWS_GW_API_KEY` in the `qa4` environment will be found in AWS SSM as `/ServicesGQL/qa4/AWS_GW_API_KEY`.

<details>
  <summary>View descriptions of some of the secrets used by this project</summary>

- `AWS_GW_API_KEY` API key for AWS API Gateway.
- `SHAPE_BYPASS_KEY` Shape automation bypass header value.
- `RETRY_STATUS_CODES` (optional) comma deliminated string of status codes which should be retried if received. These are in addition to the base rule of retrying all 500+ responses.
- `EXCLUDE_RETRY_STATUS_CODES` (optional) comma deliminated string of status codes which should not be retried if received. These would primarily be used to override the base rule of retrying all 500+ responses.
  - These take priority over `RETRY_STATUS_CODES`.
  - For example, if 404 is in both `RETRY_STATUS_CODES` and `EXCLUDE_RETRY_STATUS_CODES`, 404 responses will not be retried because `EXCLUDE_RETRY_STATUS_CODES` takes priority `RETRY_STATUS_CODES`.
- `RBS_APIM_SUBSCRIPTION_KEY` APIM subscription key used to access the APIM where the room booking services are located.
- `RCS_APIM_SUBSCRIPTION_KEY` APIM subscription key used to access the APIM where the room check-in services are located.
- `NOTIFICATION_APIM_SUBSCRIPTION_KEY` APIM subscription key used to access the APIM where the notification services are located.
- `USER_PREF_APIM_SUBSCRIPTION_KEY` APIM subscription key used to access the APIM where the user preference services are located.
- `BLACKLIST_IDENTITY_EMAILS` Comma deliminated list of emails which will cause a random email to be created during identity creation.
- `RCS_CLIENT_SECRET` Client secret for RCS service token. Used for integration tests.
- `RCS_CLIENT_ID` Client id for RCS service token. Used for integration tests.
</details>

## Integration Testing and Postman Test Collections

For integration testing, we use Newman to run Postman test collections on running instances of our project.

See the guide below for details on adding to our Postman test collections.

<details>
  <summary>View Postman collections guide</summary>

### Mandatory Naming Standards

1. Name your collection and environment file according to the following standard:
   - `${uniquePrefix}-postman-collection.json`
   - `${uniquePrefix}-${env}-environment.json`
2. Use `GRAPHQL_ENDPOINT` as the name of the endpoint variable in postman.

### How to Add Post Deployment Integration Test to a Specific Environment

Required:

- JSON collection: `${uniquePrefix}-postman-collection.json`
- Environment file: `${uniquePrefix}-${env}-environment.json`

Steps:

1. Add your collection to `scripts/src/newman/collections/${env}`
2. Add your environment file to `scripts/src/newman/environments`
3. Use `scripts/src/aws-scripts/putSSM.ts` to add secrets to AWS SSM (specific env)
4. Add expected secrets to `scripts/src/aws-scripts/utils/expectedSSMParameters`
5. For your postman environment file, specify the config in `scripts/src/newman/utils/ssmSecretsToHydrateWith`

### How to Add PR Integration Test

Required:

- JSON collection: `${uniquePrefix}-postman-collection.json`
- Environment file: `${uniquePrefix}-local-environment.json`

Steps:

1. Add your collection to `scripts/src/newman/collections/local`
2. Add your environment file to `scripts/src/newman/environments`
3. Use `scripts/src/aws-scripts/putSSM.ts` to add secrets to AWS SSM (dev)
4. Add expected secrets to `scripts/src/aws-scripts/utils/expectedSSMParameters`
5. For your postman environment file, specify the config in `scripts/src/newman/utils/ssmSecretsToHydrateWith`

### How to Add Integration Test to ALL Environments and PR Check

Required:

- JSON collection: `${uniquePrefix}-postman-collection.json`
- Environment files:
  - `${uniquePrefix}-local-environment.json`
  - `${uniquePrefix}-${env}-environment.json` (such as `dev`, `qa4`, `uat`, and so on)

Steps:

1. Add your collection to `scripts/src/newman/collections`
2. Add your environment files to `scripts/src/newman/environments`
3. Use `scripts/src/aws-scripts/putSSM.ts` to add secrets to AWS SSM for all environments
4. Add expected secrets to `scripts/src/aws-scripts/utils/expectedSSMParameters`
5. For all your postman environment files, specify the config in `scripts/src/newman/utils/ssmSecretsToHydrateWith`

</details>

## Manual Deployment

Not to be confused with manually triggered deployments, this section outlines how to perform deployments using Terraform and Docker on a local machine.

In nearly all cases, workflows for [deploying to non-production environments](https://github.com/MGMResorts/services-gql/actions/workflows/manual-deploy-non-prod.yml) and [deploying to the production environment](https://github.com/MGMResorts/services-gql/actions/workflows/deploy-production.yml) will work fine with significantly less effort. Only consider doing this if there is a major platform change, such as Terraform being updated.

<details>
  <summary>View manual deployment guide</summary>

### Prerequisites

- Same prerequisites to run locally (AWS access, AWS CLI installed, Node.js 14, JDK 11, and Okta Assume Role tool)
- Linux or MacOS (VMs work great. Linux subsystem for Windows works for Terraform workflow, but not for docker)
- unzip installed: `sudo apt-get install unzip`
- zip installed: `sudo apt-get install zip`
- Terraform installed. Check the `.tool-versions` file for which version of Terraform to install (it is important that the same version is used)
  - `wget https://releases.hashicorp.com/terraform/{{ CORRECT TERRAFORM VERSION }}/terraform_{{ CORRECT TERRAFORM VERSION }}_linux_amd64.zip`
  - `unzip terraform_{{ CORRECT TERRAFORM VERSION }}_linux_amd64.zip`
  - `sudo mv terraform /usr/local/bin/`
  - Test installation with `terraform -v`
- Docker installed
  - `sudo apt-get install \ apt-transport-https \ ca-certificates \ curl \ gnupg-agent \ software-properties-common`
  - `curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -`
  - `sudo add-apt-repository \ "deb [arch=amd64] https://download.docker.com/linux/ubuntu \ $(lsb_release -cs) \ stable"`
  - `sudo apt-get update`
  - `sudo apt-get install docker-ce docker-ce-cli containerd.io`
  - Test installation with `docker -v`
  - Test service is running with `service docker status`
- Ensure the following S3 buckets exist:
  - `mgmresorts-services-tf-state`
  - `services-gql-builds`
- Ensure an ECS service named `gql-gw` exists with the correct ALB for the environment and is running in a fargate cluster named `{{env}}-fargate`

### Terraform Workflow (federated service deployment)

- cd into root directory of services-gql
- Clean dependencies with `lerna clean`
- Install production dependencies with `npm i --only=prod`
- Build services.js file `npx plop buildServices`
  - Select environment
  - Choose which services to include in services.js
- Build terraform files `npx plop terraform`
  - Select environment
  - Choose which services to build terraform files for (this should be the same list as when building the service.js file in the previous step)
  - Enter the SSM prefix (This should be `/ServicesGQL/{{ lowercase env }}`, such as `/ServicesGQL/qa4` for qa4)
- cd into tf directory where new tf files were built with `cd tf`
- Use the okta assume role tool to assume the role of an account user
  - Run `java -jar ~/.okta/okta-aws-cli.jar aws sts get-caller-identity`
  - Login in and choose the correct account
- Run terraform init
  - `terraform init -backend-config="bucket={{ s3 bucket }}" -backend-config="key={{env lowercase}}/gql.json" -backend-config="region=us-west-2" -backend-config="profile=default"`
- Run terraform plan and read it to make sure it is correct
  - `TF_VAR_SSM_PREFIX="{{SSM Prefix (should be /ServicesGQL/<env lowercase>)}}" AWS_DEFAULT_REGION=us-west-2 terraform plan`
- Run terraform apply
  - `TF_VAR_SSM_PREFIX="{{SSM Prefix (should be /ServicesGQL/<env lowercase>)}}" AWS_DEFAULT_REGION=us-west-2 terraform apply`

### Docker Workflow (Gateway deployment)

- Ensure that the following are set up in AWS:
  - An S3 bucket for TF state
  - An ECR repository for GQL
  - An ECS service that uses the GQL ECR
    - Ensure this service is set to use the correct ALB and that ALB has an endpoint of `/graphql*`
  - A log group set up that matches the log group defined in task def
- cd into root directory of services-gql
- If not doing after Trraform workflow, clean dependencies with `lerna clean` and then install production dependecies `npm i --only=prod` (no need to do this if this was already done for terraform workflow)
- Build the task definition file with `npx plop taskDef`
  - Select environment
  - Choose which services to build Terraform files for (this should be the same list as when building the service.js file in the previous step)
  - Enter the SSM prefix (This should be `/ServicesGQL/{{ lowercase env }}`, such as `/ServicesGQL/qa4` for qa4)
- cd into the Gateway directory with `cd services/gateway`
- Modify the `taskDef.json` `containerDefinitions.image` property to the correct value of `{{ ecr repository }}:{{ image tag }}`
  - This must be set manually as this is normally set during CI/CD
- If the token file is not in the directory, add it with your GitHub personal access token
  - `echo {{ your github token }} > ./token`
- Use the Okta Assume Role tool to assume the role of an account user
  - Run `java -jar ~/.okta/okta-aws-cli.jar aws sts get-caller-identity`
  - Login in and choose the correct account
- Build the docker image with `DOCKER_BUILDKIT=1 docker build --secret id=NPM_TOKEN,src=./token -t {{ ecr repository }}:{{ image tag }} .`
  - Examples:
    - `DOCKER_BUILDKIT=1 docker build --secret id=NPM_TOKEN,src=./token -t 143757183630.dkr.ecr.us-west-2.amazonaws.com/services-gql-gateway:v2.12.0 .` for prod with image tag v2.12.0
    - `DOCKER_BUILDKIT=1 docker build --secret id=NPM_TOKEN,src=./token -t 705869507755.dkr.ecr.us-west-2.amazonaws.com/services-gql-gateway:v2.12.0 .` for non-prod with image tag v2.12.0
- Login to aws ecr
  - `aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin {{ ecr repository }}`
  - This uses whatever your currently assumed role is (which is set during the okta assume role step)
- Push the image to ECR
  - `docker push {{ ecr repository }}:{{ image tag }}`

</details>

## Troubleshooting

### General Troubleshooting Tips

Read the troubleshooting guide:  
https://mgmdigitalventures.atlassian.net/wiki/spaces/LB/pages/538575374/Troubleshooting

View dashboards that give an overview of errors and logs for across GQL:

- Prod: https://us-west-2.console.aws.amazon.com/cloudwatch/home?region=us-west-2#dashboards:name=gql-production-overview
- QA4: https://us-west-2.console.aws.amazon.com/cloudwatch/home?region=us-west-2#dashboards:name=gql-qa4-overview
- And so on for each environment (replace `qa4` in the URL with the desired environment).

### Runtime Errors

<details>
  <summary>Apollo error codes encountered</summary>

For details on Apollo error codes and their meanings, see:
https://www.apollographql.com/docs/federation/errors

</details>

<details>
  <summary>Couldn't load service definitions for {subgraph} at http://localhost:3000/dev/{subgraph}: 400: Bad Request</summary>

While this error is seen in the Gateway logs, this usually means the services ran into an issue. Check the logs in the terminal the services were running in for insight on the actual issue.

If there are no errors in the services logs, this means that Gateway ran into issues connecting to the services.

Things to check:

- Check the `services/gateway/src/services.generated.ts` file.
  - Confirm that the URLs and overall configuration looks correct.
  - URLs should be in the standard `http://localhost:{port}/{env}/{subgraph}`.
- Check on any recent changes in `services/gateway/src/index.ts`.
- Check the `fetcher` option in `services/gateway/src/utils/gateway.ts`.

</details>

<details>
  <summary>Gateway will not load due to "Error: Cannot find module '../services'"</summary>

If services.generated.ts does not exist in `services/gateway/src`, run `npx plop buildServices dev` from the project's root directory.

</details>

<details>
  <summary>Invalid or expired AWS credentials: "Error while loading SSM The security token included in the request is expired"</summary>

Use the Okta AWS Assume Role tool to log in and refresh AWS credentials. See [the setup guide](#setup-gql) for details on using this tool.

</details>

### CI/CD Errors

<details>
  <summary>Assert SSM Parameters step failed</summary>

Do _just one_ of the following for each SSM parameter that failed:

- Adjust the expected SSM parameters in [this file](https://github.com/MGMResorts/services-gql/blob/develop/scripts/src/aws-scripts/utils/expectedSSMParameters.ts).
- Add the failed SSM parameter in AWS SSM Parameter Store.

</details>

<details>
  <summary>Gateway deploy to AWS failed due to package.json and package-lock.json being out of sync</summary>
  
Do _just one_ of the following:

- Navigate to `/services/gateway` and run `npm i` to install the latest versions of @mgmresorts packages.
- Navigate to `/services/gateway` and set dependencies on @mgmresorts packages to `latest` instead of a specific version.

</details>

<details>
  <summary><code>lerna publish</code> fails due to attempting to push to protected branch</summary>

- Lerna cannot push new versions and change log updates to protected branches. Ensure that the publish action occurs on a branch that is not protected.
- Note: Lerna still pushes tags if this occurs, which will cause problems on the next publish. Be sure to either manually update version numbers or delete the pushed tags.

</details>

<details>
  <summary><code>lerna publish</code> fails due to tag already existing</summary>

- Lerna pushes new tags to the repo when publishing. If this error occurs, it means that the tag lerna was trying to push already exists in the repo.
- To fix, do _just one_ of the following:
  - Delete the tag from the repo `git push --delete origin {{ tag }}`
  - Manually increase the version numbers.
  </details>

<details>
  <summary><code>lerna bootstrap</code> fails due to package versions being behind</summary>

After a production deployment, if you have a branch that is behind a full deployment or more, `lerna bootstrap` can give an error where it cannot find the correct version of certain packages, such as `@mgmresorts/gql-types`.

To fix, go to wherever the error is coming from (e.g. `/packages/gql-common-datasources/packages.json`) and manually update the version of the affected package to the current one.

</details>
