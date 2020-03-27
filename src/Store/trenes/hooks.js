import { useSelector, useDispatch } from 'react-redux';
import { selTrenes, selTren } from './selectors';
import { addTren, setTren, delTren } from './actions';

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

export const useAddTren = (celda, dir) => {
  const dispatch = useDispatch();
  return maxSpeed => dispatch(addTren(celda, dir, maxSpeed));
};

export const useDelTren = () => {
  const dispatch = useDispatch();
  return idTren => dispatch(delTren(idTren));
};
