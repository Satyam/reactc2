import { useSelector, useDispatch } from 'react-redux';
import { selSector, selSectores, selSectoresLoading } from './selectors';
import { loadSectores } from './actions';
export const useSector = (idSector) => {
  const dispatch = useDispatch();
  return {
    loading: useSelector(selSectoresLoading),
    sector: useSelector((state) => selSector(state, idSector)),
    load: () => dispatch(loadSectores()),
  };
};

export const useSectores = () => {
  const dispatch = useDispatch();
  return {
    loading: useSelector(selSectoresLoading),
    sectores: useSelector(selSectores),
    load: () => dispatch(loadSectores()),
  };
};
