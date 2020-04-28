import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createAction } from '@reduxjs/toolkit';
import { createReducer } from '@reduxjs/toolkit';

export default function createOptionsAdapter(slice, values) {
  const keys = Object.keys(values);
  const selectors = (state, name) => state[slice][name];
  const actions = keys.reduce(
    (acs, name) => ({
      ...acs,
      [name]: createAction(name),
    }),
    {}
  );
  const defaults = values;
  const reducers = keys.reduce(
    (rds, name) => ({
      ...rds,
      [name]: (state, action) => {
        state[name] = action.payload;
      },
    }),
    {}
  );
  const useState = keys.reduce(
    (s, name) => () => {
      const dispatch = useDispatch();
      return {
        ...s,
        [name]: [
          useSelector(selectors[name]),
          useCallback((value) => dispatch(actions[name](value)), [dispatch]),
        ],
      };
    },
    {}
  );
  return {
    selectors,
    actions,
    defaults,
    reducers,
    useState,
  };
}

// Usage examples
const options = createOptionsAdapter('options', {
  showCoords: true,
  showConfig: false,
});

export const reducer = createReducer(options.defaults, options.reducers);

export const useShowCoords = options.showCoords.useState();

export function doWhatever() {
  return async (dispatch, getState) => {
    if (!options.selector.showCoords(getState())) return;

    // and elsewhere
    dispatch(options.actions.showCoords(true));
  };
}
