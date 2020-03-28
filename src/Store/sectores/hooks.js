import { useSelector } from 'react-redux';
import { selSector, selSectores } from './selectors';

export const useSector = idSector =>
  useSelector(state => selSector(state, idSector));

export const useSectores = () => useSelector(selSectores);
