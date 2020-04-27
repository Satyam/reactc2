import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createAction } from '@reduxjs/toolkit';

export function createToggleOptionAdapter(
  nombre,
  defaultValue = false,
  sliceName = 'options'
) {
  const selector = (state) => state[sliceName][nombre];
  const action = createAction(nombre);
  const reducer = (state, action) => {
    state[nombre] = action.payload;
  };
  const useOption = () => {
    const value = useSelector(selector);
    const dispatch = useDispatch();
    return [
      value,
      useCallback(() => dispatch(action(!value)), [dispatch, value]),
    ];
  };
  return {
    selector,
    action,
    reducer,
    useOption,
    default: defaultValue,
    toString: () => nombre,
  };
}

export function createSetOptionAdapter(
  nombre,
  defaultValue,
  sliceName = 'options'
) {
  const selector = (state) => state[sliceName][nombre];
  const action = createAction(nombre);
  const reducer = (state, action) => {
    state[nombre] = action.payload;
  };
  const useOption = () => {
    const value = useSelector(selector);
    const dispatch = useDispatch();
    return [value, useCallback((v) => dispatch(action(v)), [dispatch])];
  };

  return {
    selector,
    action,
    reducer,
    useOption,
    default: defaultValue,
    toString: () => nombre,
  };
}

export const playRate = createSetOptionAdapter('playRate', 1);

export const currentSector = createSetOptionAdapter('currIdSector');

export const showConfig = createToggleOptionAdapter('showConfig');
export const showCoords = createToggleOptionAdapter('showCoords', true);
export const automatizacionesActive = createToggleOptionAdapter(
  'automatizacionesActive',
  true
);
export const showTeletipo = createToggleOptionAdapter('showTeletipo', true);
