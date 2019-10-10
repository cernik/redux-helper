import { createAction } from 'redux-actions';
/**
 * Creates an async action creator
 *
 * @param  {String} TYPE            the type of the action
 * @param  {Function} executeAsync  the function to be called async
 * @return {Function}                the action creator
 */
export function createAsyncAction(TYPE, executeAsync) {
  const TYPE_FAIL = `${TYPE}_FAIL`;
  const TYPE_SUCCESS = `${TYPE}_SUCCESS`;

  const actionCreators = {
    [TYPE]: createAction(TYPE),
    [TYPE_FAIL]: createAction(TYPE_FAIL),
    [TYPE_SUCCESS]: createAction(TYPE_SUCCESS),
  };
  function create(...args) {
    return async (dispatch, getState) => {
      let result;
      dispatch(actionCreators[TYPE](...args));
      try {
        result = await executeAsync(...args, dispatch, getState);
        // https://codeburst.io/minimal-code-for-redux-async-actions-c47ea85f2141
        // the resolved promise here is to make sure the action fired here comes after firing original action for example:
        // getData => getDataInProgress and not the other way round. hack suggested in redux forums.
        Promise.resolve(1).then(() =>
          dispatch(actionCreators[TYPE_SUCCESS](result))
        );
      } catch (error) {
        const prev = args[0] || {};
        Promise.resolve(1).then(() =>
          dispatch(
            actionCreators[TYPE_FAIL]({
              ...prev,
              errorMessage: error.message,
            })
          )
        );
      }
      return result;
    };
  }
  Object.assign(create, {
    TYPE,
    FAIL: TYPE_FAIL,
    SUCCESS: TYPE_SUCCESS,
  });
  return create;
}
