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

import { ListaFaltantes } from 'Components/Enclavamientos';

import { isPlainClick } from 'Utils';
import { useCeldaManual, useSetPosicion, useCondicionesFaltantes } from 'Store';

import { NORMAL, DESVIADO, ALTERNATIVA } from 'Store/constantes';
import styles from './styles.module.css';

export default function EstadoCambio({ celda }) {
  const { posicion, idCelda, bloque } = celda;
  const setPosicion = useSetPosicion(idCelda);
  const [celdaIsManual, toggleCeldaManual] = useCeldaManual(idCelda);
  const faltantes = useCondicionesFaltantes(idCelda);

  const onSetCambioNormal = (ev) => isPlainClick(ev) && setPosicion(NORMAL);
  const onSetCambioDesviado = (ev) => isPlainClick(ev) && setPosicion(DESVIADO);
  const onSetCambioAlternativa = (ev) =>
    isPlainClick(ev) && setPosicion(ALTERNATIVA);
  const onSetManual = (ev) => isPlainClick(ev) && toggleCeldaManual();

  const disableCambio = !celdaIsManual && faltantes.length > 0;
  return (
    <PopoverBody>
      {bloque && <p>Bloque: {bloque}</p>}
      {faltantes.length && (
        <div className={styles.faltantes}>
          <h3>Condiciones Faltantes</h3>
          <ListaFaltantes faltantes={faltantes} />
        </div>
      )}
      <ButtonGroup className={styles.cambio}>
        {celda.ramas.length === 2 ? (
          <>
            <Button
              size="sm"
              disabled={disableCambio}
              onClick={onSetCambioNormal}
              color={posicion === NORMAL ? 'primary' : 'outline-secondary'}
            >
              <CambioNormal />
            </Button>
            <Button
              size="sm"
              disabled={disableCambio}
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
              disabled={disableCambio}
              onClick={onSetCambioDesviado}
              color={posicion === DESVIADO ? 'primary' : 'outline-secondary'}
            >
              <TripleIzq />
            </Button>
            <Button
              size="sm"
              disabled={disableCambio}
              onClick={onSetCambioNormal}
              color={posicion === NORMAL ? 'primary' : 'outline-secondary'}
            >
              <TripleNormal />
            </Button>
            <Button
              size="sm"
              disabled={disableCambio}
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
