import { useSelector, useDispatch } from 'react-redux';
import { selTrenes, selTren } from './selectors';
import { addTren, moveTrenes, delTren, delTrenes } from './actions';

export const useSelTrenes = () => useSelector((state) => selTrenes(state));

export const useMoveTrenes = () => {
  const dispatch = useDispatch();
  return () => dispatch(moveTrenes());
};
export const useTren = (idTren) =>
  useSelector((state) => selTren(state, idTren));

export const useAddTren = (celda) => {
  const dispatch = useDispatch();
  return (dir, maxSpeed = 1) => dispatch(addTren(celda, dir, maxSpeed));
};

export const useDelTren = () => {
  const dispatch = useDispatch();
  return (tren) => dispatch(delTren(tren));
};

export const useDelTrenes = () => {
  const dispatch = useDispatch();
  return () => dispatch(delTrenes());
};
