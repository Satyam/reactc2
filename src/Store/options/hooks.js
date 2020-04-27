import { useSelector, useDispatch } from 'react-redux';

import {
  showEstado as showEstadoAction,
  hideEstado as hideEstadoAction,
} from './actions';

import { selShowEstado } from './selectors';
import {
  playRate,
  currentSector,
  showConfig,
  showCoords,
  automatizacionesActive,
  showTeletipo,
} from './';

export const useEstado = () => {
  const estado = useSelector(selShowEstado);
  const dispatch = useDispatch();
  const hideEstado = () => dispatch(hideEstadoAction());
  const showEstado = (args) => dispatch(showEstadoAction(args));
  return { estado, hideEstado, showEstado };
};

export const usePlayRate = playRate.useOption;

export const useCurrentSector = currentSector.useOption;

export const useShowConfig = showConfig.useOption;
export const useShowCoords = showCoords.useOption;
export const useAutomatizacionesActive = automatizacionesActive.useOption;
export const useShowTeletipo = showTeletipo.useOption;
