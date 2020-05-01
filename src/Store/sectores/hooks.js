import { useSelector, useDispatch } from 'react-redux';
import {
  selSector,
  selSectorLoading,
  selErrorSector,
  selSectores,
  selSectoresLoading,
  selErrorSectores,
} from './selectors';
import { loadSectores, loadSector } from './actions';

export const useSector = (idSector) => {
  const dispatch = useDispatch();
  return {
    loading: useSelector((state) => selSectorLoading(state, idSector)),
    sector: useSelector((state) => selSector(state, idSector)),
    error: useSelector(selErrorSector),
    load: () => dispatch(loadSector(idSector)),
  };
};

export const useSectores = () => {
  const dispatch = useDispatch();
  return {
    loading: useSelector(selSectoresLoading),
    sectores: useSelector(selSectores),
    error: useSelector(selErrorSectores),
    load: () => dispatch(loadSectores()),
  };
};
