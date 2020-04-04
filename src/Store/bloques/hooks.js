import { useSelector, useDispatch } from 'react-redux';
import { selBloque, selBloqueOcupado } from './selectors';
import { setBloqueOcupado } from './actions';

export const useBloque = (idBloque) =>
  useSelector((state) => selBloque(state, idBloque));

export const useBloqueOcupado = (idBloque) =>
  useSelector((state) => selBloqueOcupado(state, idBloque));

export const useSetBloqueOcupado = () => {
  const dispatch = useDispatch();
  return (idBloque, idTren) => dispatch(setBloqueOcupado(idBloque, idTren));
};
