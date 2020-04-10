import { useSelector, useDispatch } from 'react-redux';

import {
  setAlarma,
  setAviso,
  clearAviso,
  clearAvisos,
  clearAlarma,
} from './actions';
import { selAlarma, selAvisos } from './selectors';

export const useSetAlarma = () => {
  const dispatch = useDispatch();
  return (...props) => dispatch(setAlarma(...props));
};

export const useAlarma = () => {
  const dispatch = useDispatch();
  return [useSelector(selAlarma), () => dispatch(clearAlarma())];
};

export const useAvisos = () => {
  const dispatch = useDispatch();
  return [
    useSelector(selAvisos),
    () => dispatch(clearAvisos()),
    (fecha) => dispatch(clearAviso(fecha)),
  ];
};

export const useSetAviso = () => {
  const dispatch = useDispatch();
  return (...props) => dispatch(setAviso(...props));
};
