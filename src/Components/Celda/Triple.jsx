import { tripleShape } from 'Components/shapes';
import Cambio from './Cambio';

export default function Triple(...args) {
  return Cambio(...args);
}

Triple.propTypes = {
  celda: tripleShape,
};
