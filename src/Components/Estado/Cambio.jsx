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
import { setCambio } from 'Store/actions';
import { useCeldaManual } from 'Store/selectors';

import { NORMAL, DESVIADO } from 'Store/data';
import styles from './styles.module.css';

export default function EstadoCambio({ celda }) {
  const { posicion, idCelda } = celda;
  const dispatch = useDispatch();

  const onSetCambioNormal = ev =>
    isPlainClick(ev) && dispatch(setCambio(idCelda, NORMAL));
  const onSetCambioDesviado = ev =>
    isPlainClick(ev) && dispatch(setCambio(idCelda, DESVIADO));
  const [celdaIsManual, toggleCeldaManual] = useCeldaManual(idCelda);
  const onSetManual = ev => isPlainClick(ev) && toggleCeldaManual();
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
        color={celdaIsManual ? 'danger' : 'outline-info'}
        onClick={onSetManual}
      >
        {celdaIsManual ? <Unlocked /> : <Locked />}
      </Button>
    </PopoverBody>
  );
}
