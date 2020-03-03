import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux'
import isPlainClick from 'Utils/isPlainClick';

import { setCambio, setCambioManual } from 'Store/actions';

import { Container, Row, Col, Button, ToggleButton } from 'react-bootstrap';

import { TripleIzq, TripleNormal, TripleDer } from 'Components/Icons';

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
  const onSetNormal = ev => isPlainClick(ev) && dispatch(setCambio({ idCelda, posicion: CENTRO }));
  const onSetIzq = ev => isPlainClick(ev) && dispatch(setCambio({ idCelda, posicion: IZQ }));
  const onSetDer = ev => isPlainClick(ev) && dispatch(setCambio({ idCelda, posicion: DER }));
  const onSetManual = manual => dispatch(setCambioManual(idCelda, manual));
  return (
    <Container>
      <Row className={styles.rowSpacing}>
        <Col md={6} className={styles.label}>Triple</Col>
        <Col md={6} className={styles.label}>{coords}</Col>
      </Row>
      <Row className={styles.rowSpacing}>
        <Col md={4}>
          <Button
            size="sm"
            onClick={onSetIzq}
            disabled={posicion === IZQ}
          ><TripleIzq /></Button>
        </Col>
        <Col md={4}>
          <Button
            size="sm"
            onClick={onSetNormal}
            disabled={posicion === CENTRO}
          ><TripleNormal /></Button>
        </Col>
        <Col md={4}>
          <Button
            size="sm"
            onClick={onSetDer}
            disabled={posicion === DER}
          ><TripleDer /></Button>
        </Col>
      </Row>
      <Row className={styles.rowSpacing}>
        <Col md={12}>
          <ToggleButton label="Manual" checked={manual} onChange={onSetManual} >Manual</ToggleButton>
        </Col>
      </Row>
    </Container>
  );
}

EstadoTriple.propTypes = {
  idCelda: PropTypes.string.isRequired,
};

