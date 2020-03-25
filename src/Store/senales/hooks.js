import { useSelector } from 'react-redux';
import { selSenal, selSenales } from './selectors';

export const useSenal = idSenal =>
  useSelector(state => selSenal(state, idSenal));

export const useSenales = celda =>
  useSelector(state => selSenales(state, celda));
