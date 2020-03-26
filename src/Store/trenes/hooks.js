import { useSelector, useDispatch } from 'react-redux';
import { selTrenes, selTren } from './selectors';
import { addTren, setTren, delTren } from './actions';

export const useSelTrenes = () => useSelector(state => selTrenes(state));
export const useTren = idTren => {
  const tren = useSelector(selTren(idTren));
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

export const useAddTren = () => {
  const dispatch = useDispatch();
  return props => dispatch(addTren(props));
};

export const useDelTren = () => {
  const dispatch = useDispatch();
  return idTren => dispatch(delTren(idTren));
};
