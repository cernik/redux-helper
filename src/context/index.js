import actions, { registerActions } from './actionRegistry';
import actionTypes, { registerActionTypes } from './actionTypeRegistry';

export { actions, actionTypes };

export const context = {
  actions,
  actionTypes,
  registerActions,
  registerActionTypes,
};
