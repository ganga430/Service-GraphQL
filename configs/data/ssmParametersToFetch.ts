import { expectedSSMParameters } from '../../scripts/src/aws-scripts/utils/expectedSSMParameters';
import { GQLEnvironment } from '../../scripts/src/shared/enums';

// TODO: In the future, this should be the source of SSM parameters to load, not expectedSSMParameters
export const ssmParametersToFetch: Record<GQLEnvironment | 'common', string> = {
  common: expectedSSMParameters.common.join(),
  dev: [...expectedSSMParameters.common, ...expectedSSMParameters.dev].join(),
  qa4: [...expectedSSMParameters.common, ...expectedSSMParameters.qa4].join(),
  'qa4-green': [...expectedSSMParameters.common, ...expectedSSMParameters['qa4-green']].join(),
  uat: [...expectedSSMParameters.common, ...expectedSSMParameters.uat].join(),
  preprod: [...expectedSSMParameters.common, ...expectedSSMParameters.preprod].join(),
  'preprod-green': [...expectedSSMParameters.common, ...expectedSSMParameters['preprod-green']].join(),
  production: [...expectedSSMParameters.common, ...expectedSSMParameters.production].join()
};
