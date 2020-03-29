import { useSelector, useDispatch } from 'react-redux';
import { selTrenes, selTren } from './selectors';
import { addTren, setTren, delTren, delTrenes } from './actions';

export const useSelTrenes = () => useSelector(state => selTrenes(state));

export const useTren = idTren => {
  const tren = useSelector(state => selTren(state, idTren));
  const dispatch = useDispatch();
  return [
    tren,
    args =>
      dispatch(
        setTren({
          ...tren,
          ...args,
        })
      ),
  ];
};

export const useAddTren = celda => {
  const dispatch = useDispatch();
  return (dir, maxSpeed = 1) => dispatch(addTren(celda, dir, maxSpeed));
};

export const useDelTren = () => {
  const dispatch = useDispatch();
  return tren => dispatch(delTren(tren));
};

export const useDelTrenes = () => {
  const dispatch = useDispatch();
  return () => dispatch(delTrenes());
};
