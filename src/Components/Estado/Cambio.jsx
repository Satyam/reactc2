import React from 'react';

import { ButtonGroup, Button, PopoverBody } from 'reactstrap';

import {
  CambioNormal,
  CambioDesviado,
  TripleIzq,
  TripleNormal,
  TripleDer,
  Locked,
  Unlocked,
} from 'Components/Icons';

import { isPlainClick } from 'Utils';
import { useCeldaManual, useSetPosicion } from 'Store';

import { NORMAL, DESVIADO, ALTERNATIVA } from 'Store/constantes';
import styles from './styles.module.css';

export default function EstadoCambio({ celda }) {
  const { posicion, idCelda } = celda;
  const setPosicion = useSetPosicion(idCelda);
  const [celdaIsManual, toggleCeldaManual] = useCeldaManual(idCelda);

  const onSetCambioNormal = (ev) => isPlainClick(ev) && setPosicion(NORMAL);
  const onSetCambioDesviado = (ev) => isPlainClick(ev) && setPosicion(DESVIADO);
  const onSetCambioAlternativa = (ev) =>
    isPlainClick(ev) && setPosicion(ALTERNATIVA);
  const onSetManual = (ev) => isPlainClick(ev) && toggleCeldaManual();

  return (
    <PopoverBody>
      <ButtonGroup className={styles.cambio}>
        {celda.ramas.length === 2 ? (
          <>
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
          </>
        ) : (
          <>
            {' '}
            <Button
              size="sm"
              onClick={onSetCambioDesviado}
              color={posicion === DESVIADO ? 'primary' : 'outline-secondary'}
            >
              <TripleIzq />
            </Button>
            <Button
              size="sm"
              onClick={onSetCambioNormal}
              color={posicion === NORMAL ? 'primary' : 'outline-secondary'}
            >
              <TripleNormal />
            </Button>
            <Button
              size="sm"
              onClick={onSetCambioAlternativa}
              color={posicion === ALTERNATIVA ? 'primary' : 'outline-secondary'}
            >
              <TripleDer />
            </Button>
          </>
        )}
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
