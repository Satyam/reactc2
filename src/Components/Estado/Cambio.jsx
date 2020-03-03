import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types';

import { Container, Row, Col, Button, ToggleButton } from 'react-bootstrap';

import { CambioNormal, CambioDesviado } from 'Components/Icons';
import isPlainClick from 'Utils/isPlainClick';
import { setCambio, setCambioManual } from 'Store/actions';

import styles from './styles.module.css';

const DESVIADO = 'desviado';
const NORMAL = 'normal';

export default function EstadoCambio({ idCelda }) {

  const { coords, posicion, manual } = useSelector(state => state.celdas[idCelda]);
  const dispatch = useDispatch();

  const onSetCambioNormal = ev => isPlainClick(ev) && dispatch(setCambio({ idCelda, posicion: NORMAL }));
  const onSetCambioDesviado = ev => isPlainClick(ev) && dispatch(setCambio({ idCelda, posicion: DESVIADO }));
  const onSetManual = value => dispatch(setCambioManual({ idCelda, value }));

  return (
    <Container>
      <Row className={styles.rowSpacing}>
        <Col md={6} className={styles.label}>Cambio</Col>
        <Col md={6} className={styles.label}>{coords}</Col>
      </Row>
      <Row className={styles.rowSpacing}>
        <Col md={6}>
          <Button
            size="sm"
            onClick={onSetCambioNormal}
            disabled={posicion === NORMAL}
          ><CambioNormal /></Button>
        </Col>
        <Col md={6}>
          <Button
            size="sm"
            onClick={onSetCambioDesviado}
            disabled={posicion === DESVIADO}
          ><CambioDesviado /></Button>
        </Col>
      </Row>
      <Row className={styles.rowSpacing}>
        <Col md={12}>
          <ToggleButton checked={manual} onChange={onSetManual}>Manual</ToggleButton>
        </Col>
      </Row>
    </Container>
  );
}

EstadoCambio.propTypes = {
  idCelda: PropTypes.string.isRequired,
};
