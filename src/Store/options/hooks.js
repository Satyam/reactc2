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

export const usePlayRate = playRate.useState;

export const useCurrentSector = currentSector.useState;

export const useShowConfig = showConfig.useState;
export const useShowCoords = showCoords.useState;
export const useAutomatizacionesActive = automatizacionesActive.useState;
export const useShowTeletipo = showTeletipo.useState;
