import constantCase from 'to-constant-case';

export const createActionNames = (namespace, action) => {
  const TYPE = constantCase(action);
  return {
    [TYPE]: `${namespace}/${TYPE}`,
    [`${TYPE}_SUCCESS`]: `${namespace}/${TYPE}_SUCCESS`,
    [`${TYPE}_FAIL`]: `${namespace}/${TYPE}_FAIL`,
  };
};

export const createActionTypes = (namespace = 'root') => (actions = ['load']) =>
  actions.reduce(
    (acc, action) => ({ ...acc, ...createActionNames(namespace, action) }),
    {}
  );

export const mapActionsToTypes = actions =>
  Object.keys(actions).reduce(
    (acc, reducerName) => ({
      ...acc,
      [reducerName]: createActionTypes(reducerName)(
        Object.keys(actions[reducerName])
      ),
    }),
    {}
  );
/*
mapActionToTypes = ({})=>({})
get
{
  repos: {
    load: ()=>{},
    loadMore: ()=>{},
  }
}

returns
{
  repos: {
    LOAD: 'repos/LOAD',
    LOAD_SUCCESS: 'repos/LOAD_SUCCESS',
    LOAD_FAIL: 'repos/LOAD_FAIL',
    LOAD_MORE: 'repos/LOAD_MORE',
    LOAD_MORE_SUCCESS: 'repos/LOAD_MORE_SUCCESS',
    LOAD_MORE_FAIL: 'repos/LOAD_MORE_FAIL',
  }
}
*/
