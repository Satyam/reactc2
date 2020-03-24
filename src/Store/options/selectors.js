import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  showTeletipo,
  enclavamientosActive,
  showCoords,
  enableJson,
} from './actions';

export const selShowTeletipo = state => state.options.showTeletipo;
export const selEnclavamientosActive = state =>
  state.options.enclavamientosActive;
export const selShowCoords = state => state.options.showCoords;
export const selShowEstado = state => state.options.showEstado;
export const selJsonEnabled = state => state.options.jsonEnabled;

export const useShowTeletipo = () => {
  const teletipoShown = useSelector(selShowTeletipo);
  const dispatch = useDispatch();
  const toggleTeletipo = useCallback(
    () => dispatch(showTeletipo(!teletipoShown)),
    [dispatch, teletipoShown]
  );
  return [teletipoShown, toggleTeletipo];
};

export const useEnclavamientosActive = () => {
  const elementosActive = useSelector(selEnclavamientosActive);
  const dispatch = useDispatch();
  const togleEnclavamientosActive = useCallback(
    () => dispatch(enclavamientosActive(!elementosActive)),
    [dispatch, elementosActive]
  );
  return [elementosActive, togleEnclavamientosActive];
};

export const useShowCoords = () => {
  const coordsShown = useSelector(selShowCoords);
  const dispatch = useDispatch();
  const togleShowCoords = useCallback(
    () => dispatch(showCoords(!coordsShown)),
    [dispatch, coordsShown]
  );
  return [coordsShown, togleShowCoords];
};

export const useShowConfig = () => {
  const configShown = useSelector(selJsonEnabled);
  const dispatch = useDispatch();
  const toggleShowConfig = useCallback(
    () => dispatch(enableJson(!configShown)),
    [dispatch, configShown]
  );
  return [configShown, toggleShowConfig];
};
