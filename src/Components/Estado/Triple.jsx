import React from 'react';
import { useDispatch } from 'react-redux';
import isPlainClick from 'Utils/isPlainClick';

import { setCambio, setCambioManual } from 'Store/actions';

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
  const { posicion, manual, idCelda } = celda;
  const dispatch = useDispatch();
  const onSetNormal = ev =>
    isPlainClick(ev) && dispatch(setCambio(idCelda, CENTRO));
  const onSetIzq = ev => isPlainClick(ev) && dispatch(setCambio(idCelda, IZQ));
  const onSetDer = ev => isPlainClick(ev) && dispatch(setCambio(idCelda, DER));
  const onSetManual = ev =>
    isPlainClick(ev) && dispatch(setCambioManual(idCelda, !manual));

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
        color={manual ? 'danger' : 'outline-info'}
        onClick={onSetManual}
      >
        {manual ? <Unlocked /> : <Locked />}
      </Button>
    </PopoverBody>
  );
}
