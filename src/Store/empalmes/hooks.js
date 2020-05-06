import { selEmpalme } from './selectors';

import { useSelector } from 'react-redux';

export const useEmpalme = (idPunta) =>
  useSelector((state) => selEmpalme(state, idPunta));
