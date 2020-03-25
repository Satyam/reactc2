import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  showTeletipo,
  enclavamientosActive,
  showCoords,
  showConfig,
  showEstado as showEstadoAction,
  hideEstado as hideEstadoAction,
} from './actions';

import {
  selShowTeletipo,
  selEnclavamientosActive,
  selShowCoords,
  selShowConfig,
  selShowEstado,
} from './selectors';

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
  const configShown = useSelector(selShowConfig);
  const dispatch = useDispatch();
  const toggleShowConfig = useCallback(
    () => dispatch(showConfig(!configShown)),
    [dispatch, configShown]
  );
  return [configShown, toggleShowConfig];
};

export const useEstado = () => {
  const estado = useSelector(selShowEstado);
  const dispatch = useDispatch();
  const hideEstado = () => dispatch(hideEstadoAction());
  const showEstado = args => dispatch(showEstadoAction(args));
  return { estado, hideEstado, showEstado };
};
