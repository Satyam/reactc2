import { runAutomatizaciones, runAutomatizacion } from './actions';
import { selAutomatizacion } from './selectors';
import { useDispatch, useSelector } from 'react-redux';

export const useRunAutomatizaciones = () => {
  const dispatch = useDispatch();
  return (idOrigen) => dispatch(runAutomatizaciones(idOrigen));
};

export const useRunAutomatizacion = () => {
  const dispatch = useDispatch();
  return (idOrigen) => dispatch(runAutomatizacion(idOrigen));
};

export const useSelAutomatizacion = (idOrigen) =>
  useSelector((state) => selAutomatizacion(state, idOrigen));
