import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ButtonGroup, Button, PopoverHeader, PopoverBody } from 'reactstrap';

import {
  CambioNormal,
  CambioDesviado,
  Locked,
  Unlocked,
} from 'Components/Icons';
import isPlainClick from 'Utils/isPlainClick';
import { setCambio, setCambioManual } from 'Store/actions';

import styles from './styles.module.css';

const DESVIADO = 'desviado';
const NORMAL = 'normal';

export default function EstadoCambio({ idCelda, onClose }) {
  const { coords, posicion, manual } = useSelector(
    state => state.celdas[idCelda]
  );
  const dispatch = useDispatch();

  const onSetCambioNormal = ev =>
    isPlainClick(ev) && dispatch(setCambio(idCelda, NORMAL));
  const onSetCambioDesviado = ev =>
    isPlainClick(ev) && dispatch(setCambio(idCelda, DESVIADO));
  const onSetManual = ev =>
    isPlainClick(ev) && dispatch(setCambioManual(idCelda, !manual));
  return (
    <>
      <PopoverHeader>
        Cambio {coords}
        <Button close className={styles.close} onClick={onClose} />
      </PopoverHeader>
      <PopoverBody>
        <ButtonGroup>
          <Button
            size="sm"
            onClick={onSetCambioNormal}
            color={posicion === NORMAL ? 'primary' : 'outline-secondary'}
          >
            <CambioNormal />
          </Button>
          <Button
            size="sm"
            onClick={onSetCambioDesviado}
            color={posicion === DESVIADO ? 'primary' : 'outline-secondary'}
          >
            <CambioDesviado />
          </Button>
        </ButtonGroup>
        <Button
          className={styles.manual}
          size="sm"
          color={manual ? 'danger' : 'outline-info'}
          onClick={onSetManual}
        >
          {manual ? <Unlocked /> : <Locked />}
        </Button>
      </PopoverBody>
    </>
  );
}
