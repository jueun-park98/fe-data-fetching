import { Action } from '../action/Actions';

export const dispatcher = {
  _callbacks: [] as ((action: Action) => void)[],

  register(callback: (action: Action) => void) {
    this._callbacks.push(callback);
    return this._callbacks.length - 1;
  },

  dispatch(action: Action) {
    this._callbacks.forEach(callback => callback(action));
  }
};