import { setAutomatizaciones } from './actions';
import { selAutomatizacion } from './selectors';
import { useDispatch, useSelector } from 'react-redux';

export const useSetAutomatizaciones = () => {
  const dispatch = useDispatch();
  return (idOrigen, tipo, force) =>
    dispatch(setAutomatizaciones(idOrigen, tipo, force));
};

export const useSelAutomatizacion = (idOrigen) =>
  useSelector((state) => selAutomatizacion(state, idOrigen));
