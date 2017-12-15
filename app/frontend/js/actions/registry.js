import { STORE_INJECT } from '../store/registry/middleware.js';

export function injectReducers(reducers) {
  return { [STORE_INJECT]: { reducers } };
}
