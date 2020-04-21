import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  showTeletipo,
  automatizacionesActive,
  showCoords,
  showConfig,
  showEstado as showEstadoAction,
  hideEstado as hideEstadoAction,
  setPlayRate,
  setCurrentSector,
} from './actions';

import {
  selShowTeletipo,
  selAutomatizacionesActive,
  selShowCoords,
  selShowConfig,
  selShowEstado,
  selPlayRate,
  selCurrentSector,
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

export const useAutomatizacionesActive = () => {
  const elementosActive = useSelector(selAutomatizacionesActive);
  const dispatch = useDispatch();
  const togleAutomatizacionesActive = useCallback(
    () => dispatch(automatizacionesActive(!elementosActive)),
    [dispatch, elementosActive]
  );
  return [elementosActive, togleAutomatizacionesActive];
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
  const showEstado = (args) => dispatch(showEstadoAction(args));
  return { estado, hideEstado, showEstado };
};

export const usePlayRate = () => {
  const playRate = useSelector(selPlayRate);
  const dispatch = useDispatch();
  return [
    playRate,
    useCallback((rate) => dispatch(setPlayRate(rate)), [dispatch]),
  ];
};

export const useCurrentSector = () => {
  const currentIdSector = useSelector(selCurrentSector);
  const dispatch = useDispatch();
  return [currentIdSector, (idSector) => dispatch(setCurrentSector(idSector))];
};
