import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createAction } from '@reduxjs/toolkit';

export default function createSetOptionAdapter(
  name,
  defaultValue,
  options = {}
) {
  const { sliceName = 'options' } = options;

  const selector = (state) => state[sliceName][name];
  const action = createAction(name);
  const reducer = (state, action) => {
    state[name] = action.payload;
  };
  const useState = () => {
    const dispatch = useDispatch();
    return [
      useSelector(selector),
      useCallback((value) => dispatch(action(value)), [dispatch]),
    ];
  };

  return {
    selector,
    action,
    reducer,
    useState,
    default: defaultValue,
    toString: () => name,
  };
}
