import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux'
import isPlainClick from 'Utils/isPlainClick';

import { setCambio, setCambioManual } from 'Store/actions';

import { Button, ButtonGroup } from 'react-bootstrap';

import { TripleIzq, TripleNormal, TripleDer, Locked, Unlocked } from 'Components/Icons';

import styles from './styles.module.css';

export const IZQ = 'izq';
export const CENTRO = 'centro';
export const DER = 'der';

export default function EstadoTriple({ idCelda }) {
  const {
    coords,
    posicion,
    manual,
  } = useSelector(state => state.celdas[idCelda]);
  const dispatch = useDispatch();
  const onSetNormal = ev => isPlainClick(ev) && dispatch(setCambio(idCelda, CENTRO));
  const onSetIzq = ev => isPlainClick(ev) && dispatch(setCambio(idCelda, IZQ));
  const onSetDer = ev => isPlainClick(ev) && dispatch(setCambio(idCelda, DER));
  const onSetManual = ev => isPlainClick(ev) && dispatch(setCambioManual(idCelda, !manual));

  return (
    <>
      <div className={styles.label}>{`Triple ${coords}`}</div>
      <ButtonGroup>
        <Button
          size="sm"
          onClick={onSetIzq}
          variant={posicion === IZQ ? 'primary' : 'outline-secondary'}
        ><TripleIzq /></Button>
        <Button
          size="sm"
          onClick={onSetNormal}
          variant={posicion === CENTRO ? 'primary' : 'outline-secondary'}
        ><TripleNormal /></Button>
        <Button
          size="sm"
          onClick={onSetDer}
          variant={posicion === DER ? 'primary' : 'outline-secondary'}
        ><TripleDer /></Button>
      </ButtonGroup>
      <Button
        className={styles.manual}
        size="sm"
        variant={manual ? 'danger' : 'outline-info'}
        onClick={onSetManual}
      >
        {manual ? <Unlocked /> : <Locked />}
      </Button>
    </>
  );
}

EstadoTriple.propTypes = {
  idCelda: PropTypes.string.isRequired,
};

