/**
 * Ensure all inactive connections are terminated by the ALB, by setting this a few seconds higher than the ALB idle timeout
 */
export const SERVER_ALIVE_TIMEOUT = 65 * 1000;

/**
 * Ensure the headersTimeout is set higher than the keepAliveTimeout due to this nodejs regression bug
 * @see https://github.com/nodejs/node/issues/27363
 */
export const HEADER_TIMEOUT = 65 * 1000;

export const JSON_LIMIT = '2mb';
