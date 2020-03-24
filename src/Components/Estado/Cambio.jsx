import React from 'react';
import { useDispatch } from 'react-redux';

import { ButtonGroup, Button, PopoverBody } from 'reactstrap';

import {
  CambioNormal,
  CambioDesviado,
  Locked,
  Unlocked,
} from 'Components/Icons';
import { isPlainClick } from 'Utils';
import { setCambio, setCambioManual } from 'Store/actions';
import { NORMAL, DESVIADO } from 'Store/data';
import styles from './styles.module.css';

export default function EstadoCambio({ celda }) {
  const { posicion, manual, idCelda } = celda;
  const dispatch = useDispatch();

  const onSetCambioNormal = ev =>
    isPlainClick(ev) && dispatch(setCambio(idCelda, NORMAL));
  const onSetCambioDesviado = ev =>
    isPlainClick(ev) && dispatch(setCambio(idCelda, DESVIADO));
  const onSetManual = ev =>
    isPlainClick(ev) && dispatch(setCambioManual(idCelda, !manual));
  return (
    <PopoverBody>
      <ButtonGroup className={styles.cambio}>
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
  );
}
