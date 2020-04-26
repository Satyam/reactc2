import {
  selEnclavamientos,
  selEnclavamiento,
  selCondicionesFaltantes,
} from './selectors';
import { useSelector } from 'react-redux';

export const useSelEnclavamientos = () =>
  useSelector((state) => selEnclavamientos(state));

export const useSelEnclavamiento = (idOrigen) =>
  useSelector((state) => selEnclavamiento(state, idOrigen));

export const useCondicionesFaltantes = (idOrigen) =>
  useSelector((state) => selCondicionesFaltantes(state, idOrigen));
