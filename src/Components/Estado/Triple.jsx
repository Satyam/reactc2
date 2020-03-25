import React from 'react';
import { isPlainClick } from 'Utils';

import { useSetCambio, useCeldaManual } from 'Store';
import { Button, ButtonGroup, PopoverBody } from 'reactstrap';

import {
  TripleIzq,
  TripleNormal,
  TripleDer,
  Locked,
  Unlocked,
} from 'Components/Icons';

import styles from './styles.module.css';

import { IZQ, CENTRO, DER } from 'Store/data';

export default function EstadoTriple({ celda }) {
  const { posicion, idCelda } = celda;
  const setCambio = useSetCambio();
  const [celdaIsManual, toggleCeldaManual] = useCeldaManual(idCelda);
  const onSetNormal = ev => isPlainClick(ev) && setCambio(idCelda, CENTRO);
  const onSetIzq = ev => isPlainClick(ev) && setCambio(idCelda, IZQ);
  const onSetDer = ev => isPlainClick(ev) && setCambio(idCelda, DER);
  const onSetManual = ev => isPlainClick(ev) && toggleCeldaManual();

  return (
    <PopoverBody>
      <ButtonGroup>
        <Button
          size="sm"
          onClick={onSetIzq}
          color={posicion === IZQ ? 'primary' : 'outline-secondary'}
        >
          <TripleIzq />
        </Button>
        <Button
          size="sm"
          onClick={onSetNormal}
          color={posicion === CENTRO ? 'primary' : 'outline-secondary'}
        >
          <TripleNormal />
        </Button>
        <Button
          size="sm"
          onClick={onSetDer}
          color={posicion === DER ? 'primary' : 'outline-secondary'}
        >
          <TripleDer />
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
