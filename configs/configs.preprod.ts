import { GraphQLConfiguration } from '../scripts/src/configs/core/models';
import { GQLEnvironment } from '../scripts/src/shared/enums';
import { ssmParametersToFetch } from './data/ssmParametersToFetch';

export const configs: GraphQLConfiguration = {
  ci: {
    aws: {
      'us-west-2': {
        awsAPIGatewayUrl: 'https://lofgrv7xh9.execute-api.us-west-2.amazonaws.com',
        awsApplicationLoadBalancer: 'alb-preprod-api.mgmresorts.com'
      }
    },
    apigee: {
      keyValueMaps: {
        graphql: {
          gqlGatewayUrl: 'https://alb-preprod-api.mgmresorts.com/graphql'
        }
      }
    }
  },
  all: {
    environmentVariables: {
      NODE_ENV: GQLEnvironment.Production, // emulate production
      SSM_PREFIX: '/ServicesGQL/preprod',
      ENABLE_DEBUG: 'false',
      SSM_PARAMETERS_TO_FETCH: ssmParametersToFetch.preprod,
      AS_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/guestservices/as/api/'
    }
  },
  gateway: {
    environmentVariables: {
      APOLLO_GRAPH_VARIANT: GQLEnvironment.PreProd
    },
    local: {
      playgroundUrl: `https://lofgrv7xh9.execute-api.us-west-2.amazonaws.com/${GQLEnvironment.PreProd}/graphql`
    }
  },
  customer: {
    environmentVariables: {
      CONTENT_API_BASE_URL: 'https://preprod-content.mgmresorts.com/content-api/v3/en/',
      PROFILE_CORE_BASE_URL: 'https://azdeapi-dev.mgmresorts.com/profile/r/v1/core/',
      PROFILE_CORE_V2_BASE_URL: 'https://azdeapi-dev.mgmresorts.com/profile/stg/v2/',
      USE_DIRECT_LOOKUP_API: 'true',
      GSE_BASE_URL: 'https://auroraws-pp.mgmresorts.local',
      LOYALTY_PROFILE_BASE_URL: 'https://azdeapi-dev.mgmresorts.com/loyalty/stg/v5/core/',
      SERVICE_API_BASE_URL: 'https://preprod-api.mgmresorts.com/v2/',
      LOYALTY_INFO_BASE_URL: 'https://azdeapi-dev.mgmresorts.com/loyalty/stg/v4/service/',
      USER_PREFERENCE_BASE_URL: 'https://azdeapi-dev.mgmresorts.com/userpreferences-apis-r/v1/',
      ID_API_BASE_URL: 'https://azdeapi-dev.mgmresorts.com/stg/identity/directory/v1/',
      REDIS_CACHE_HOST: 'gql-uw-rc-r.redis.cache.windows.net',
      ENABLE_BREAK_IDP: 'true',
      USE_NA_DEFAULT_ADDRESS: 'true'
    }
  },
  'customer-insight': {
    environmentVariables: {
      CDP_SERVICES_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/c360/v1'
    }
  },
  identity: {
    environmentVariables: {
      ID_API_BASE_URL: 'https://azdeapi-dev.mgmresorts.com/stg/identity/directory/v1/',
      ID_ENROLL_API_BASE_URL: 'https://azdeapi-dev.mgmresorts.com/stg/identity/enrollment/v1/enroll',
      ENABLE_BREAK_IDP: 'true'
    }
  },
  itinerary: {
    environmentVariables: {
      MOVE_AVAILABLE: 'false',
      ITINERARY_SERVICES_BASE_URL: 'https://azdeapi-dev.mgmresorts.com/service/stg/v2/itinerary',
      MOVE_ITINERARY_BASE_URL: 'https://azdeapi-dev.mgmresorts.com/service/stg/v3/itinerary',
      DBS_API_BASE_URL: 'https://azdeapi-dev.mgmresorts.com/pp/booking/restaurant/v1',
      TRIP_SERVICES_BASE_URL: 'https://mgm-nonprod-stage.apigee.net/trips/v1',
      TRIP_INTENT_SERVICES_BASE_URL: 'https://mgm-nonprod-stage.apigee.net/trips/intent/v1',
      INTENT_ID: 'fed6864e-c4e3-4fa4-bf0e-6f2cbcffa63d',
      ENABLE_INTENT: 'true',
      CONTENT_API_BASE_URL: 'https://preprod-content.mgmresorts.com/content-api/v3/en/',
      SERVICE_API_BASE_URL: 'https://preprod-api.mgmresorts.com/v2/',
      REDIS_CACHE_HOST: 'gql-uw-rc-r.redis.cache.windows.net'
    }
  },
  cart: {
    environmentVariables: {
      CART_SERVICE_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/shopping/v1/',
      ITINERARY_SERVICES_BASE_URL: 'https://azdeapi-dev.mgmresorts.com/service/stg/v2/itinerary',
      ABANDONED_CART_BASE_URL: 'https://azdeapi-dev.mgmresorts.com/abandoned-cart/stg/',
      ROOMBOOKING_V2_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/booking/room/v2',
      PROFILE_CORE_V2_BASE_URL: 'https://azdeapi-dev.mgmresorts.com/profile/qa/v2/',
      ORDER_SERVICE_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/order/v1/',
      CONTENT_API_BASE_URL: 'https://preprod-content.mgmresorts.com/content-api/v3/en/',
      SERVICE_LIFE_STAGE: 'Development',
      SAME_SITE_COOKIE: 'true'
    }
  },
  'product-information-management': {
    environmentVariables: {
      PIM_BASE_URL_V1: 'https://mgm-nonprod-qa.apigee.net/product-catalog-api/v1'
    }
  },
  'mgm-room-booking': {
    environmentVariables: {
      ROOMBOOKING_V2_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/booking/room/v2',
      MYVEGAS_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/booking/myvegas',
      CART_SERVICE_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/shopping/v1/',
      REST_DATASOURCE_DISABLE_TIMEOUT_RULES: 'false',
      RATEPLAN_SEARCH_ENR_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/booking',
      PROFILE_CORE_V2_BASE_URL: 'https://azdeapi-dev.mgmresorts.com/profile/stg/v2/',
      CONTENT_API_BASE_URL: 'https://preprod-content.mgmresorts.com/content-api/v3/en/',
      REDIS_CACHE_HOST: 'gql-uw-rc-r.redis.cache.windows.net'
    }
  },
  'mgm-show-booking': {
    environmentVariables: {
      SHOWSHOPPING_V2_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/shopping/show/v2',
      SHOWBOOKING_V2_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/booking/show/v2',
      SHOWSHOPPING_V3_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/shopping/show/v3'
    }
  },
  'mgm-dining-booking': {
    environmentVariables: {
      DMP_SEVENROOMS_BOOKING_V1_URL: 'https://preprod.devtest.vegas/mgm-web/diningbooking/en/v1'
    }
  },
  'mgm-booking-reservation': {
    environmentVariables: {
      ROOMBOOKING_V2_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/booking/room/v2',
      DBS_API_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/booking/restaurant/v1',
      SHOWBOOKING_V2_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/booking/show/v2',
      RATEPLAN_SEARCH_ENR_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/booking'
    }
  },
  'room-booking': {
    environmentVariables: {
      RBS_API_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/',
      CONTENT_API_BASE_URL: 'https://preprod-content.mgmresorts.com/content-api/v3/en/',
      SERVICE_API_BASE_URL: 'https://preprod-api.mgmresorts.com/v2/',
      ROOMS_MS_API_BASE_URL: 'https://preprod-api.mgmresorts.com/v3/rooms/',
      CES_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/guestservices/ces/',
      RBS_ADDONS_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/booking/room/addons/v1/',
      HOUSEKEEPING_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/guestservices/hks/',
      UPSELL_API_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/guestservices/us/',
      REDIS_CACHE_HOST: 'gql-uw-rc-r.redis.cache.windows.net'
    }
  },
  'room-check-in': {
    environmentVariables: {
      CONTENT_API_BASE_URL: 'https://preprod-content.mgmresorts.com/content-api/v3/en/',
      RBS_API_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/',
      RCS_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/guestservices/rcs/',
      DLS_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/guestservices/dls/api/',
      NS_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/guestservices/ns/api/',
      NMS_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/guestservices/nms/',
      RMQS_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/guestservices/rmqs/',
      DIGITAL_KEY_API_BASE_URL: 'https://preprod-api.mgmresorts.com/v3/',
      CES_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/guestservices/ces/',
      DIGITAL_KEY_API_BASE_URL_AZURE: 'https://mgm-nonprod-preprod.apigee.net/guestservices/dks/',
      REDIS_CACHE_HOST: 'gql-uw-rc-r.redis.cache.windows.net',
      UPSELL_API_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/guestservices/us/',
      ID_API_BASE_URL: 'https://azdeapi-dev.mgmresorts.com/stg/identity/directory/v1/',
      DEEP_LINK_BASE_URL: 'https://aws-origin-test.mgmresorts.com/app?deep_link=',
      DIGITAL_KEY_TRAFFIC_SHARE_AZURE: '100',
      GRS_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/guestservices/grs/'
    }
  },
  'static-content': {
    environmentVariables: {
      CONTENT_API_BASE_URL: 'https://preprod-content.mgmresorts.com/content-api/v3/en/',
      SERVICE_API_BASE_URL: 'https://preprod-api.mgmresorts.com/v2/',
      REDIS_CACHE_HOST: 'gql-uw-rc-r.redis.cache.windows.net',
      RATEPLAN_SEARCH_ENR_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/booking'
    }
  },
  payment: {
    environmentVariables: {
      PAYMENT_METHODS_URL: 'https://mgm-nonprod-preprod.apigee.net/wallet/v1/payment-methods',
      APPLY_BUY_PREFILL_URL: 'https://mgm-nonprod-preprod.apigee.net/wallet/v1/prefill',
      LOYALTY_PROFILE_BASE_URL: 'https://azdeapi-dev.mgmresorts.com/loyalty/stg/v5/core/'
    }
  },
  sre: {
    environmentVariables: {
      AMS_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/sre/ams/api/v1/',
      AMS_BASE_URL_V2: 'https://mgm-nonprod-preprod.apigee.net/sre/ams/api/v2/',
      SGS_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/sre/servicegraph/api/v2/',
      CAS_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/sre/cloudautomation/api/v1',
      HCS_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/sre/healthchecks/api/v1',
      TS_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/sre/ts/api/v2/',
      TS_BASE_URL_V3: 'https://mgm-nonprod-preprod.apigee.net/sre/ts/api/v3/'
    }
  },
  recommendation: {
    environmentVariables: {
      RECOMMENDATION_BASE_URL: 'https://mgm-nonprod-preprod.apigee.net/recommendation-engine/v3'
    }
  },
  loyalty: {
    environmentVariables: {
      CONTENT_API_BASE_URL: 'https://preprod-content.mgmresorts.com/content-api/v3/en/',
      LOYALTY_INFO_BASE_URL: 'https://azdeapi-dev.mgmresorts.com/loyalty/stg/v4/service/',
      LOYALTY_PROFILE_BASE_URL: 'https://azdeapi-dev.mgmresorts.com/loyalty/stg/v5/core/'
    }
  },
  'cs-content': {
    environmentVariables: {
      CS_API_URL: 'https://cdn.contentstack.io/v3/',
      CS_PUBLISHING_ENVIRONMENT: 'pre-production',
      CS_BRANCH_NAME: 'main',
      CS_BRANCH_ALIAS: 'main'
    },
    local: {
      requiresRuntimeSecretLoading: true
    }
  },
  search: {
    environmentVariables: {
      LUCIDWORK_BASE_URL: 'https://mgm-resorts-stg.b.lucidworks.cloud:443/api/apps/MGM/query/',
      LUCIDWORK_SEARCH_COLLECTION: 'MGM',
      LUCIDWORK_BACKFILL_SEARCH_COLLECTION: 'MGM_backfill',
      LUCIDWORK_TYPEAHEAD_COLLECTION: 'MGM_typeahead_QPF_v4',
      MGM_STATIC_CONTENT_URL: '//static.mgmresorts.com'
    }
  }
};
