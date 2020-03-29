import reduce from 'lodash/reduce';

export const toQueryString = params => reduce(params, (result, value, key) => `${result}${result === '' ? '?' : '&'}${key}=${value}`, '')