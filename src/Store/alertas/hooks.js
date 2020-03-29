import { useSelector, useDispatch } from 'react-redux';

import { setAlarma } from './actions';
import { selAlarma } from './selectors';

export const useSetAlarma = () => {
  const dispatch = useDispatch();
  return (...props) => dispatch(setAlarma(...props));
};

export const useAlarma = () => useSelector(selAlarma);
