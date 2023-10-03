import { GraphQLConfiguration } from '../scripts/src/configs/core/models';
import { roomReservationUpsellMessages } from './data/roomReservationUpsellMessages';
import { statusTextChecklist } from './data/statusTextChecklist';
import { ssmParametersToFetch } from './data/ssmParametersToFetch';
import { contentMappings } from './data/propertySiteMappings';

/**
 * Common configs used accross all environments.
 * An environment specific configuration with the same name as a common config will take priority over the common config.
 */
export const commonConfigs: GraphQLConfiguration = {
  ci: {
    aws: {
      awsAccountId: '705869507755', // non-prod account id
      awsTaskRoleArn: 'mobileapptask-role',
      awsLambdaExecutionRole: 'LambdaExecutionServiceRole',
      'us-east-2': {
        awsAPIGatewayUrl: '', // Only supported for dev for now
        awsApplicationLoadBalancer: '' // Only supported for dev for now
      }
    },

    enabledServices: 'all',
    apolloStudioGraphName: 'mgmresorts-graph-xipe9l',
    apolloStudioDeploymentEnabled: true,
    apigee: {
      organization: 'mgm-nonprod',
      graphqlApiProxyName: 'graphql'
    }
  },
  all: {
    environmentVariables: {
      LOG_LEVEL: 'DEBUG',
      ENABLE_DEBUG: 'true',
      SERVICE_LIFE_STAGE: 'Production',
      DATASOURCE_CACHE_MAX_SIZE: '125',
      SUBGRAPH_FETCH_TIMEOUT_IN_MS: '10000',
      GATEWAY_FETCH_TIMEOUT_IN_MS: '10000',
      SSM_PARAMETERS_TO_FETCH: ssmParametersToFetch.common
    },
    local: {
      requiresRuntimeSecretLoading: true
    }
  },
  gateway: {
    environmentVariables: {
      APOLLO_GRAPH_ID: 'mgmresorts-graph-xipe9l',
      DISABLE_APOLLO_STUDIO: 'false',
      RESPONSE_FILTERED_CLIENTS:
        'vendor_sevenrooms,vendor_betmgm,vendor_rhytmos,vendor_avaya,vendor_nuance,mgm_rtc_service',
      KEEP_ALIVE_TIMEOUT_IN_MS: '31000',
      HEADERS_TIMEOUT_IN_MS: '32000'
    },
    local: {
      CORS_ALLOWED_ORIGINS: [
        'https://checkin.mgmresorts.com',
        'https://dev-checkin.mgmresorts.com',
        'https://qa-checkin.mgmresorts.com',
        'https://preprod-checkin.mgmresorts.com',
        'http://localhost:3000',
        'http://localhost:3001',
        'https://uat-checkin.mgmresorts.com',
        'https://studio.apollographql.com',
        // Gen 3:
        'https://web-ordermgmnt-dev.azureedge.net',
        'https://web-cart-dev.azureedge.net',
        'https://web-cart-uat.azureedge.net',
        'https://web-cart-preview.azureedge.net',
        'https://web-cart.azureedge.net',
        'https://dev.devtest.vegas',
        'https://uat.devtest.vegas',
        'https://qa4.devtest.vegas',
        'https://preprod.devtest.vegas',
        // guest services ui:
        'https://guestservicesuiuwsad.z22.web.core.windows.net',
        'https://guestservicesuiuwsaq.z22.web.core.windows.net',
        'https://guestservicesuiuwsag.z22.web.core.windows.net',
        // SRE Service Graph UI:
        'https://sre-sg-uw-wa-d.azurewebsites.net',
        'https://sre-sg-uw-wa-r.azurewebsites.net',
        'https://sre-sg-uw-wa-p.azurewebsites.net',
        // Temporary origin for POC testing and demos
        'https://webmicrofepoc.z22.web.core.windows.net',
        // Search Tool
        'https://searchtool-uw-as-q.azurewebsites.net',
        'https://searchtool-uw-as-r.azurewebsites.net',
        'https://azdeapi-dev.mgmresorts.com'
      ]
    }
  },
  customer: {
    environmentVariables: {
      /** Needed until profile service can figure out how to stop the timeouts. */
      REST_DATASOURCE_DEFAULT_NUMBER_OF_RETRIES: '1',
      REST_DATASOURCE_DISABLE_TIMEOUT_RULES: 'true',
      REST_DATASOURCE_DISABLE_RETRY_RULES: 'true',
      REDIS_CACHE_CONNECT_TIMEOUT_IN_MS: '1000',
      REDIS_CACHE_RECONNECT_WAIT_IN_MS: '50',
      REDIS_CACHE_ENABLE_TLS: 'true',
      REDIS_CACHE_PORT: '6380',
      ENABLE_REDIS: 'true'
    }
  },
  itinerary: {
    environmentVariables: {
      REDIS_CACHE_CONNECT_TIMEOUT_IN_MS: '1000',
      REDIS_CACHE_RECONNECT_WAIT_IN_MS: '50',
      REDIS_CACHE_ENABLE_TLS: 'true',
      REDIS_CACHE_PORT: '6380',
      ENABLE_REDIS: 'true'
    }
  },
  'room-booking': {
    environmentVariables: {
      /**
       * RBS team said that opera in non-prod can be slow and suggested 15 seconds over the default 12
       * Production value will override with default 12 seconds
       */
      REST_DATASOURCE_DEFAULT_TIMEOUT_IN_MS: '15000',
      REDIS_CACHE_CONNECT_TIMEOUT_IN_MS: '1000',
      REDIS_CACHE_RECONNECT_WAIT_IN_MS: '50',
      REDIS_CACHE_ENABLE_TLS: 'true',
      REDIS_CACHE_PORT: '6380',
      ENABLE_REDIS: 'true'
    },
    local: {
      ROOM_RESERVATION_CHECKLIST_STATUS: statusTextChecklist,
      ROOM_RESERVATION_UPSELL_MESSAGES: roomReservationUpsellMessages
    }
  },
  'room-check-in': {
    local: {
      LINEBUSTER_APP_LINK_MESSAGE: 'Ready to complete your check-in? Just tap the link below: ',
      RBS_PROFILE_SEARCH_CHUNK_LIMIT: 50
    },
    environmentVariables: {
      REDIS_CACHE_CONNECT_TIMEOUT_IN_MS: '1000',
      REDIS_CACHE_RECONNECT_WAIT_IN_MS: '50',
      REDIS_CACHE_ENABLE_TLS: 'true',
      REDIS_CACHE_PORT: '6380',
      ENABLE_REDIS: 'true'
    }
  },
  'static-content': {
    environmentVariables: {
      REDIS_CACHE_CONNECT_TIMEOUT_IN_MS: '1000',
      REDIS_CACHE_RECONNECT_WAIT_IN_MS: '50',
      REDIS_CACHE_ENABLE_TLS: 'true',
      REDIS_CACHE_PORT: '6380',
      ENABLE_REDIS: 'true'
    }
  },
  'product-information-management': {
    environmentVariables: {
      SERVICE_LIFE_STAGE: 'Development',
      REST_DATASOURCE_DISABLE_TIMEOUT_RULES: 'true',
      REST_DATASOURCE_DEFAULT_TIMEOUT_IN_MS: '27000'
    }
  },
  'mgm-room-booking': {
    environmentVariables: {
      SERVICE_LIFE_STAGE: 'Development',
      REST_DATASOURCE_DISABLE_TIMEOUT_RULES: 'true',
      REST_DATASOURCE_DEFAULT_TIMEOUT_IN_MS: '27000',
      MOVABLE_INK_CLIENT_ID: 'movableink',
      GENERIC_CONTENT_TYPE: 'generic',
      REDIS_CACHE_CONNECT_TIMEOUT_IN_MS: '1000',
      REDIS_CACHE_RECONNECT_WAIT_IN_MS: '50',
      REDIS_CACHE_ENABLE_TLS: 'true',
      REDIS_CACHE_PORT: '6380',
      ENABLE_REDIS: 'true',
      REST_DATASOURCE_DEFAULT_NUMBER_OF_RETRIES: '1',
      CHECKIN_RESTRICTIONS: '2022-12-28,2022-12-31',
      CHECKOUT_RESTRICTIONS: '2022-12-31',
      STAY_DATE_RESTRICTIONS_ENABLED: 'true',
      /** PROPERTY_KEY_ID_MAP is to retrieve the propertyId for RoomResorts API based on the propertyKey. */
      PROPERTY_KEY_ID_MAP:
        '{PRO-001:a689885f-cba2-48e8-b8e0-1dff096b8835,PRO-003:66964e2b-2550-4476-84c3-1a4c0c5c067f,PRO-004:dc00e77f-d6bb-4dd7-a8ea-dc33ee9675ad,PRO-005:4a65a92a-962b-433e-841c-37e18dc5d68d,PRO-006:44e610ab-c209-4232-8bb4-51f7b9b13a75,PRO-008:13b178b0-8beb-43d5-af25-1738b7267e63,PRO-009:e0f70eb3-7e27-4c33-8bcd-f30bf3b1103a,PRO-010:2159252c-60d3-47db-bbae-b1db6bb15072,PRO-011:607c07e7-3e31-4e4c-a4e1-f55dca66fea2,PRO-012:f8d6a944-7816-412f-a39a-9a63aad26833,PRO-014:b35733d1-e027-4311-a350-965e535fb90a,PRO-016:e2704b04-d515-45b0-8afd-4fa1424ff0a8,PRO-017:6c5cff3f-f01a-4f9b-87ab-8395ae8108db,PRO-018:2ea36c26-3c6a-4627-944e-f100b9a1b904,PRO-019:1f3ed672-3f8f-44d8-9215-81da3c845d83,PRO-020:8bf670c2-3e89-412b-9372-6c87a215e442,PRO-021:b52d1e32-d9f7-4626-8c3e-e9e5de926595,PRO-022:bee81f88-286d-43dd-91b5-3917d9d62a68,PRO-023:557bbf23-8d75-4e1c-9d1f-1dc0835f9b18,PRO-024:0990fdce-7fc8-41b1-b8b6-9a25dce3db55,PRO-025:a0be1590-65c2-4e4d-b208-94ea5cac658f,PRO-026:160cdf9b-ccdc-40ce-b0ac-1a58b69dcf4f,PRO-027:773000cc-468a-4d86-a38f-7ae78ecfa6aa,PRO-028:40b61feb-750a-45df-ae68-e23e6272b16b,PRO-029:00ccdea6-7d78-410b-b0f0-5983bdf44cc2,PRO-030:e0ef39b2-5eea-43ff-a734-b10217571eaa}'
    }
  },
  'mgm-booking-reservation': {
    environmentVariables: {
      SERVICE_LIFE_STAGE: 'Development',
      REST_DATASOURCE_DEFAULT_TIMEOUT_IN_MS: '27000',
      REST_DATASOURCE_DEFAULT_NUMBER_OF_RETRIES: '1'
    }
  },
  'mgm-show-booking': {
    environmentVariables: {
      SERVICE_LIFE_STAGE: 'Development',
      REST_DATASOURCE_DEFAULT_TIMEOUT_IN_MS: '27000'
    }
  },
  'mgm-dining-booking': {
    environmentVariables: {
      SERVICE_LIFE_STAGE: 'Development',
      REST_DATASOURCE_DEFAULT_TIMEOUT_IN_MS: '27000'
    }
  },
  recommendation: {
    environmentVariables: {
      RECOMMENDATION_BASE_URL: 'https://mgm-nonprod-dev.apigee.net/recommendation-engine/v3'
    }
  },
  loyalty: {
    local: {
      requiresRuntimeSecretLoading: false
    },
    environmentVariables: {
      MILITARY_VETERAN_PROGRAM_INTEREST_CODES:
        '1400 1401 1402 1403 1404 1405 1406 1407 1408 1409 1410 1411 1412 1413 1414 1715 1716 1721'
    }
  },
  payment: {
    environmentVariables: {
      LOYALTY_CC_MEMBER_INDICATOR: '1357'
    }
  },
  'cs-content': {
    environmentVariables: {
      CS_API_URL: 'https://cdn.contentstack.io/v3/'
    },
    local: {
      requiresRuntimeSecretLoading: true
    }
  },
  search: {
    environmentVariables: {
      MGM_MULTIPROPERTY_SITE: 'mlife|mgmresorts',
      GEN3_BOOKING_URL: '/redirect/bookaroom'
    },
    local: {
      contentMappings,
      requiresRuntimeSecretLoading: true
    }
  }
};
