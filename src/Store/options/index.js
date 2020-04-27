import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createAction } from '@reduxjs/toolkit';

export function createSetOptionAdapter(nombre, defaultValue, options = {}) {
  const { sliceName = 'options', toggle = false } = options;

  const selector = (state) => state[sliceName][nombre];
  const action = createAction(nombre);
  const reducer = (state, action) => {
    state[nombre] = action.payload;
  };
  const useState = () => {
    const value = useSelector(selector);
    const dispatch = useDispatch();
    return [
      value,
      useCallback((v) => dispatch(action(toggle ? !value : v)), [
        dispatch,
        value,
      ]),
    ];
  };

  return {
    selector,
    action,
    reducer,
    useState,
    default: defaultValue,
    toString: () => nombre,
  };
}

export const playRate = createSetOptionAdapter('playRate', 1);

export const currentSector = createSetOptionAdapter('currIdSector');

export const showConfig = createSetOptionAdapter('showConfig', false, {
  toggle: true,
});
export const showCoords = createSetOptionAdapter('showCoords', true, {
  toggle: true,
});
export const automatizacionesActive = createSetOptionAdapter(
  'automatizacionesActive',
  true,
  { toggle: true }
);
export const showTeletipo = createSetOptionAdapter('showTeletipo', true, {
  toggle: true,
});
