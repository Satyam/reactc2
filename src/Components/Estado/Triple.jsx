import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import isPlainClick from 'Utils/isPlainClick';

import { setCambio, setCambioManual } from 'Store/actions';

import { Button, ButtonGroup, PopoverHeader, PopoverBody } from 'reactstrap';

import {
  TripleIzq,
  TripleNormal,
  TripleDer,
  Locked,
  Unlocked,
} from 'Components/Icons';

import styles from './styles.module.css';

export const IZQ = 'izq';
export const CENTRO = 'centro';
export const DER = 'der';

export default function EstadoTriple({ idCelda, onClose }) {
  const { coords, posicion, manual } = useSelector(
    state => state.celdas[idCelda]
  );
  const dispatch = useDispatch();
  const onSetNormal = ev =>
    isPlainClick(ev) && dispatch(setCambio(idCelda, CENTRO));
  const onSetIzq = ev => isPlainClick(ev) && dispatch(setCambio(idCelda, IZQ));
  const onSetDer = ev => isPlainClick(ev) && dispatch(setCambio(idCelda, DER));
  const onSetManual = ev =>
    isPlainClick(ev) && dispatch(setCambioManual(idCelda, !manual));

  return (
    <>
      <PopoverHeader>
        Triple {coords}
        <Button close className={styles.close} onClick={onClose} />
      </PopoverHeader>
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
    </>
  );
}
