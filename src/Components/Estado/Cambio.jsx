import React from 'react';

import { ButtonGroup, Button, PopoverBody } from 'reactstrap';

import {
  CambioNormal,
  CambioDesviado,
  Locked,
  Unlocked,
} from 'Components/Icons';

import { isPlainClick } from 'Utils';
import { useCeldaManual, useSetPosicion } from 'Store';

import { NORMAL, DESVIADO } from 'Store/data';
import styles from './styles.module.css';

export default function EstadoCambio({ celda }) {
  const { posicion, idCelda } = celda;
  const setPosicion = useSetPosicion(idCelda);
  const [celdaIsManual, toggleCeldaManual] = useCeldaManual(idCelda);

  const onSetCambioNormal = (ev) => isPlainClick(ev) && setPosicion(NORMAL);
  const onSetCambioDesviado = (ev) => isPlainClick(ev) && setPosicion(DESVIADO);
  const onSetManual = (ev) => isPlainClick(ev) && toggleCeldaManual();

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
