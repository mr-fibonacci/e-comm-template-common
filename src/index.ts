// NEED TO IMPORT AUGMENTED TYPES
import './types/augmented-types';

// CUSTOM TYPES
export * from './types/custom-types';

// ERRORS
export * from './errors/bad-request-error';
export * from './errors/custom-error';
export * from './errors/not-authorized-error';
export * from './errors/request-body-error';
export * from './errors/resource-not-found-error';

// MIDDLEWARES
export * from './middlewares/handle-errors';
export * from './middlewares/require-auth';
export * from './middlewares/owns-resource';
export * from './middlewares/url-not-found';
export * from './middlewares/validate-request-body';

// EVENTS & EVENT-RELATED INTERFACES
export * from './nats/nats-client';
export * from './nats/services';
export * from './nats/subjects';
export * from './nats/base-classes/base-event';
export * from './nats/base-classes/base-listener';
export * from './nats/base-classes/base-publisher';
export * from './nats/events/order-created-event';
export * from './nats/events/order-updated-event';
export * from './nats/events/order-deleted-event';
export * from './nats/events/product-created-event';
export * from './nats/events/product-updated-event';
export * from './nats/events/product-deleted-event';
export * from './nats/events/items-reserved-event';

// TESTING UTILS ETC
export * from './test/test-utils';

// RESOURCE STATUSES
export * from './nats/order-status';
export * from './nats/product-status';
