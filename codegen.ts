import { CodegenConfig } from '@graphql-codegen/cli';

const defaultSubgraphPlugins = ['typescript', 'typescript-resolvers'];

const defaultSubgraphConfig: Record<string, unknown> = {
  federation: true,
  useIndexSignature: true,
  noSchemaStitching: true,
  makeResolverTypeCallable: true
};

const config: CodegenConfig = {
  generates: {
    // Common Schema
    './packages/gql-types/src/schema/common-schema/schemaTypes.generated.ts': {
      schema: './packages/gql-core/src/common-schema/schema/stringFormatType.ts',
      plugins: ['typescript'],
      config: { typesPrefix: 'CommonSchema' }
    },

    // Static Content subgraph
    'packages/gql-types/src/schema/static-content/schemaTypes.generated.ts': {
      schema: ['./packages/gql-core/src/common-schema/schema/*.ts', './services/static-content/src/schema/*.ts'],
      plugins: defaultSubgraphPlugins,
      config: {
        ...defaultSubgraphConfig,
        typesPrefix: 'StaticContentSchema',
        defaultMapper: 'Partial<{T}>',
        makeResolverTypeCallable: true,
        mappers: {
          ClubBar: '../../content/index#ClubBar',
          EntertainmentSchedule: '../../content/index#EntertainmentSchedule',
          RoomSegment: '../../content/index#RoomSegment',
          RoomProgram: '../../content/index#RoomProgram',
          ElevatorDirections: '../../content/index#ElevatorDirections',
          Property: '../../content/index#PropertyWithRoomTypeKey',
          Show: '../../content/index#Show',
          ShowEvent: '../../content/index#ShowEvent',
          Restaurant: '../../content/index#Restaurant'
        }
      }
    },

    // Room Check-In subgraph
    'packages/gql-types/src/schema/room-check-in/schemaTypes.generated.ts': {
      schema: ['./packages/gql-core/src/common-schema/schema/*.ts', './services/room-check-in/src/schema/*.ts'],
      plugins: defaultSubgraphPlugins,
      config: {
        ...defaultSubgraphConfig,
        typesPrefix: 'RCSSchema',
        enumValues: {
          SmartQueueStorageType: '../../room-check-in/index#SmartQueueStorageType'
        }
      }
    },

    // Room Booking subgraph
    'packages/gql-types/src/schema/room-booking/schemaTypes.generated.ts': {
      schema: ['./packages/gql-core/src/common-schema/schema/*.ts', './services/room-booking/src/schema/*.ts'],
      plugins: defaultSubgraphPlugins,
      config: {
        ...defaultSubgraphConfig,
        typesPrefix: 'RBSSchema',
        mappers: {
          Property: '../stubs#PropertyStub',
          RoomType: '../stubs#RoomTypeStub',
          ElevatorDirections: '../stubs#ElevatorDirectionsStub',
          BellHopDeskDirections: '../../content/index#BellHopDeskDirections',
          RoomReservation: '../../room-booking/index#ReducedRoomReservation',
          RoomReservationFolio: '../../room-booking/index#RoomReservationFolio',
          RoomReservationSimple: '../../room-booking/index#ReducedRoomReservationSimple',
          RoomReservationBatch: '../../room-booking/index#RoomReservationBatch'
        },
        enumValues: {
          RoomReservationNameSearchOperation: '../../room-booking/index#RoomReservationNameSearchOperation',
          RoomReservationNameMatchType: '../../room-booking/index#RoomReservationNameMatchType',
          RoomReservationAddOnStatus: '../../room-booking/index#RoomReservationAddOnStatus',
          RoomReservationAddOnPurchaseStatus: '../../room-booking/index#RoomReservationAddOnPurchaseStatus',
          HousekeepingReservationStatus: '../../room-booking/index#HousekeepingReservationStatus',
          RoomStatus: '../../room-booking/index#RoomStatus',
          RoomStatusCode: '../../room-booking/index#RoomStatusCode',
          HousekeepingStatus: '../../room-booking/index#HousekeepingStatus',
          HousekeepingStatusCode: '../../room-booking/index#HousekeepingStatusCode',
          AddressType: '../../common/index#AddressType',
          PhoneNumberType: '../../mgm-room-booking/common#PhoneNumberType',
          MarketCodeType: '../../room-booking/index#MarketCodeType'
        }
      }
    },

    // Identity subgraph
    'packages/gql-types/src/schema/identity/schemaTypes.generated.ts': {
      schema: [
        './packages/gql-core/src/common-schema/schema/mutationResponse.ts',
        './packages/gql-core/src/common-schema/schema/profile.ts',
        './services/identity/src/schema.ts'
      ],
      plugins: defaultSubgraphPlugins,
      config: {
        ...defaultSubgraphConfig,
        typesPrefix: 'IdentitySchema'
      }
    },

    // Itinerary subgraph
    'packages/gql-types/src/schema/itinerary/schemaTypes.generated.ts': {
      schema: [
        './packages/gql-core/src/common-schema/schema/*',
        './packages/gql-core/src/common-schema/integratedSchema/showTypes.ts',
        './services/itinerary/src/schema/*.ts'
      ],
      plugins: defaultSubgraphPlugins,
      config: {
        ...defaultSubgraphConfig,
        typesPrefix: 'ItinerarySchema',
        enumValues: {
          ReservationType: '../../itinerary/common#ReservationType',
          ReservationState: '../../itinerary/common#ReservationState',
          AddressType: '../../itinerary/itinerary#AddressType',
          ShowTicketState: '../../itinerary/itinerary#ShowTicketState',
          IdOrConfirmationType: '../../itinerary/itinerary#IdOrConfirmationType',
          State: '../../dining-booking/dining#State',
          HostStatus: '../../dining-booking/dining#HostStatus',
          PhoneType: '../../itinerary/itinerary#ReservationPhoneType',
          TripType: '../../itinerary/trip#TripType',
          ActivityType: '../../itinerary/tripRecommendation#ActivityType',
          OperaState: '../../itinerary/trip#OperaState',
          QueryType: '../../itinerary/trip#QueryType',
          Domain: '../../itinerary/trip#Domain',
          IdentifierType: '../../itinerary/trip#IdentifierType',
          PreferenceType: '../../itinerary/tripPreference#PreferenceType'
        }
      }
    },

    // Cart subgraph
    'packages/gql-types/src/schema/cart/schemaTypes.generated.ts': {
      schema: [
        './packages/gql-core/src/common-schema/schema/*',
        './packages/gql-core/src/common-schema/integratedSchema/showTypes.ts',
        './packages/gql-core/src/common-schema/integratedSchema/mgmBookingReservationSharedTypes.ts',
        './services/cart/src/schema.ts*'
      ],
      plugins: defaultSubgraphPlugins,
      config: {
        ...defaultSubgraphConfig,
        typesPrefix: 'CartSchema',
        enumValues: {
          ProductType: '../../cart/index#ProductType',
          RoomReservationState: '../../mgm-room-booking/roomReservation#RoomReservationState',
          PhoneNumberType: '../../mgm-room-booking/common#PhoneNumberType',
          ProfileAddressType: '../../mgm-room-booking/common#ProfileAddressType',
          RoomComponentPricingApplied: '../../mgm-room-booking/common#RoomComponentPricingApplied',
          AddressType: '../../loyalty-profile/index#AddressType',
          CustomerDominantPlay: '../../mgm-room-booking/roomReservation#CustomerDominantPlay',
          ItemType: '../../mgm-room-booking/common#ItemType',
          ItemStatus: '../../cart/index#ItemStatus',
          ItemOfferType: '../../cart/index#ItemOfferType',
          CheckoutStatus: '../../cart/index#CheckoutStatus',
          CheckoutErrorType: '../../cart/index#CheckoutErrorType',
          OrderStatus: '../../cart/index#OrderStatus',
          CartType: '../../cart/index#CartType',
          ItemsToRemove: '../../cart/index#ItemsToRemove',
          BookingReservationType: '../../mgm-booking-reservation/bookingReservation#BookingReservationType',
          SourceSystemType: '../../mgm-booking-reservation/bookingReservation#SourceSystemType',
          ShareWithType: '../../mgm-room-booking/roomReservation#ShareWithType'
        }
      }
    },

    // Customer subgraph
    'packages/gql-types/src/schema/customer/schemaTypes.generated.ts': {
      schema: [
        './packages/gql-core/src/common-schema/schema/mutationResponse.ts',
        './packages/gql-core/src/common-schema/schema/address.ts',
        './packages/gql-core/src/common-schema/schema/phoneNumber.ts',
        './packages/gql-core/src/common-schema/schema/stringFormatType.ts',
        './packages/gql-core/src/common-schema/schema/profile.ts',
        './services/customer/src/schema/*'
      ],
      plugins: defaultSubgraphPlugins,
      config: {
        ...defaultSubgraphConfig,
        typesPrefix: 'CustomerSchema',
        enumValues: {
          AddressType: '../../loyalty-profile/index#AddressType',
          EmailType: '../../loyalty-profile/index#EmailType',
          PhoneType: '../../loyalty-profile/index#PhoneType',
          MLifeTier: '../../loyalty-profile/index#MLifeTier',
          TierException: '../../loyalty-profile/index#TierException',
          IdType: '../../profile-core/index#IdType'
        }
      }
    },

    // MGM Room Booking subgraph
    'packages/gql-types/src/schema/mgm-room-booking/schemaTypes.generated.ts': {
      schema: [
        './packages/gql-core/src/common-schema/schema/mutationResponse.ts',
        './packages/gql-core/src/common-schema/schema/mgmRoomBookingSharedTypes.ts',
        './packages/gql-core/src/common-schema/schema/descriptions.ts',
        './packages/gql-core/src/common-schema/schema/images.ts',
        './packages/gql-core/src/common-schema/schema/socialSharing.ts',
        './packages/gql-core/src/common-schema/schema/location.ts',
        './packages/gql-core/src/common-schema/schema/direction.ts',
        './services/mgm-room-booking/src/schema.ts'
      ],
      plugins: defaultSubgraphPlugins,
      config: {
        ...defaultSubgraphConfig,
        typesPrefix: 'MGMRoomBookingSchema',
        enumValues: {
          AvailabilityStatus: '../../mgm-room-booking/roomAvailabilityCalendar#AvailabilityStatus',
          OfferType: '../../mgm-room-booking/customerRoomOffers#OfferType',
          CustomerRoomOfferType: '../../mgm-room-booking/customerRoomOffers#CustomerRoomOfferType',
          RoomReservationState: '../../mgm-room-booking/roomReservation#RoomReservationState',
          PhoneNumberType: '../../mgm-room-booking/common#PhoneNumberType',
          ProfileAddressType: '../../mgm-room-booking/common#ProfileAddressType',
          ItemType: '../../mgm-room-booking/common#ItemType',
          RoomComponentPricingApplied: '../../mgm-room-booking/common#RoomComponentPricingApplied',
          ShareWithType: '../../mgm-room-booking/roomReservation#ShareWithType',
          CustomerDominantPlay: '../../mgm-room-booking/roomReservation#CustomerDominantPlay',
          MyVegasRewardType: '../../mgm-room-booking/validateMyVegasRedemptionCode#MyVegasRewardType',
          PricingMode: '../../mgm-room-booking/common#PricingMode',
          ShoppingFlow: '../../mgm-room-booking/roomAvailabilityTrip#ShoppingFlow'
        }
      }
    },

    // MGM Show Booking subgraph
    'packages/gql-types/src/schema/mgm-show-booking/schemaTypes.generated.ts': {
      schema: './services/mgm-show-booking/src/schema.ts',
      plugins: defaultSubgraphPlugins,
      config: {
        ...defaultSubgraphConfig,
        typesPrefix: 'MGMShowBookingSchema'
      }
    },

    // MGM Dining Booking subgraph
    'packages/gql-types/src/schema/mgm-dining-booking/schemaTypes.generated.ts': {
      schema: './services/mgm-dining-booking/src/schema.ts',
      plugins: defaultSubgraphPlugins,
      config: {
        ...defaultSubgraphConfig,
        typesPrefix: 'MGMDiningBookingSchema'
      }
    },

    // MGM Booking Reservation subgraph
    'packages/gql-types/src/schema/mgm-booking-reservation/schemaTypes.generated.ts': {
      schema: [
        './packages/gql-core/src/common-schema/schema/mutationResponse.ts',
        './packages/gql-core/src/common-schema/schema/mgmRoomBookingSharedTypes.ts',
        './packages/gql-core/src/common-schema/integratedSchema/mgmBookingReservationSharedTypes.ts',
        './services/mgm-booking-reservation/src/schema.ts'
      ],
      plugins: defaultSubgraphPlugins,
      config: {
        ...defaultSubgraphConfig,
        typesPrefix: 'MGMBookingReservationSchema',
        enumValues: {
          BookingReservationType: '../../mgm-booking-reservation/bookingReservation#BookingReservationType',
          SourceSystemType: '../../mgm-booking-reservation/bookingReservation#SourceSystemType',
          ShareWithType: '../../mgm-room-booking/roomReservation#ShareWithType'
        }
      }
    },

    // Payment Methods Storage subgraph
    'packages/gql-types/src/schema/payment/schemaTypes.generated.ts': {
      schema: [
        './packages/gql-core/src/common-schema/schema/mutationResponse.ts',
        './services/payment/src/schema/paymentmethods-schema.ts'
      ],
      plugins: defaultSubgraphPlugins,
      config: {
        ...defaultSubgraphConfig,
        typesPrefix: 'PaymentSchema'
      }
    },

    // Customer Insight (CDP) subgraph
    'packages/gql-types/src/schema/customer-insight/schemaTypes.generated.ts': {
      schema: ['./packages/gql-core/src/common-schema/schema/*.ts', './services/customer-insight/src/schema.ts'],
      plugins: defaultSubgraphPlugins,
      config: {
        ...defaultSubgraphConfig,
        typesPrefix: 'CustomerInsightSchema',
        enumValues: {
          DirectionType: '../../customer-insight/index#DirectionType'
        }
      }
    },

    // Product Information Management subgraph
    'packages/gql-types/src/schema/product-information-management/schemaTypes.generated.ts': {
      schema: './services/product-information-management/src/schema.ts',
      plugins: defaultSubgraphPlugins,
      config: {
        ...defaultSubgraphConfig,
        typesPrefix: 'ProductInformationManagementSchema'
      }
    },

    // SRE subgraph
    'packages/gql-types/src/schema/sre/schemaTypes.generated.ts': {
      schema: ['./packages/gql-core/src/common-schema/schema/*.ts', './services/sre/src/schema/*.ts'],
      plugins: defaultSubgraphPlugins,
      config: {
        ...defaultSubgraphConfig,
        typesPrefix: 'SreSchema'
      }
    },

    // Recommendation subgraph
    'packages/gql-types/src/schema/recommendation/schemaTypes.generated.ts': {
      schema: './services/recommendation/src/schema.ts',
      plugins: defaultSubgraphPlugins,
      config: {
        ...defaultSubgraphConfig,
        typesPrefix: 'RecommendationSchema',
        enumValues: {
          Day: '../../recommendation/index#Day'
        }
      }
    },

    // Loyalty subgraph
    'packages/gql-types/src/schema/loyalty/schemaTypes.generated.ts': {
      schema: ['./packages/gql-core/src/common-schema/schema/*.ts', './services/loyalty/src/schema/*.ts'],
      plugins: defaultSubgraphPlugins,
      config: {
        ...defaultSubgraphConfig,
        typesPrefix: 'LoyaltySchema'
      }
    },

    // Contentstack subgraph
    'packages/gql-types/src/schema/cs-content/schemaTypes.generated.ts': {
      schema: './services/cs-content/src/schema/*.ts',
      plugins: defaultSubgraphPlugins,
      config: {
        ...defaultSubgraphConfig,
        typesPrefix: 'CsContentSchema'
      }
    },

    // Search subgraph
    'packages/gql-types/src/schema/search/schemaTypes.generated.ts': {
      schema: './services/search/src/schema.ts',
      plugins: defaultSubgraphPlugins,
      config: {
        ...defaultSubgraphConfig,
        typesPrefix: 'SearchSchema',
        enumValues: {
          SearchContentType: '../../search/index#SearchContentType'
        }
      }
    }
  },
  hooks: {
    afterAllFileWrite: 'prettier --write'
  }
};

export default config;
