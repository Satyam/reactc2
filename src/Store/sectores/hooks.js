import { useSelector, useDispatch } from 'react-redux';
import { loadData } from 'Store/actions';
import { selSector, selSectores } from './selectors';

export const useSector = idSector =>
  useSelector(state => selSector(state, idSector));

export const useSectores = () => {
  const sectores = useSelector(selSectores);
  const dispatch = useDispatch();
  if (!sectores.length) dispatch(loadData());
  return sectores;
};
