import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types';
import classNames from 'classnames';

import isPlainClick from 'Utils/isPlainClick';
import { setLuzEstado, setLuzManual } from 'Store/actions';

import { Container, Row, Col, ToggleButton, Button } from 'react-bootstrap';

import styles from './styles.module.css';

export function EstadoLuz({
  luz,
  manual,
  estado,
  onSetManual,
  onSetEstado,
}) {

  const onSetAlto = ev => isPlainClick(ev) && onSetEstado({ luz, estado: 'alto' });
  const onSetPrecaucion = ev => isPlainClick(ev) && onSetEstado({ luz, estado: 'precaucion' });
  const onSetLibre = ev => isPlainClick(ev) && onSetEstado({ luz, estado: 'libre' });

  return (
    <div className={classNames({ [styles.pushDown]: luz !== 'primaria' })}>
      <Button
        size="sm"
        disabled={estado === 'alto'}
        className={classNames(styles.alto, styles.centered)}
        onClick={onSetAlto}
      >o</Button>
      <Button
        size="sm"
        disabled={estado === 'precaucion'}
        className={classNames(styles.precaucion, styles.centered)}
        onClick={onSetPrecaucion}
      >o</Button>
      <Button
        size="sm"
        disabled={estado === 'libre'}
        className={classNames(styles.libre, styles.centered)}
        onClick={onSetLibre}
      >o</Button>
      <ToggleButton checked={manual} onChange={onSetManual} >Manual</ToggleButton>
    </div>
  );
}

EstadoLuz.propTypes = {
  luz: PropTypes.string,
  manual: PropTypes.bool,
  estado: PropTypes.string,
  onSetManual: PropTypes.func,
  onSetEstado: PropTypes.func,
};


export default function EstadoSenal({ idSenal }) {
  const {
    coords,
    dir,
    izq,
    primaria,
    der,
  } = useSelector(state => state.senales[idSenal]);

  const dispatch = useDispatch();
  const onSetEstado = (luz, estado) => dispatch(setLuzEstado(idSenal, luz, estado));
  const onSetManual = (luz, manual) => dispatch(setLuzManual(idSenal, luz, manual));

  return (
    <Container>
      <Row className={styles.rowSpacing}>
        <Col md={4} className={styles.label}>Señal</Col>
        <Col md={4}>{coords}</Col>
        <Col md={4}>{dir}</Col>
      </Row>
      <Row className={styles.rowSpacing}>
        <Col md={4}>
          {izq
            ? <EstadoLuz
              luz="izq"
              manual={izq.manual}
              estado={izq.estado}
              onSetManual={onSetManual}
              onSetEstado={onSetEstado}
            />
            : <div className={styles.noSenal} />}
        </Col>
        <Col md={4}>
          {primaria
            ? <EstadoLuz
              luz="primaria"
              manual={primaria.manual}
              estado={primaria.estado}
              onSetManual={onSetManual}
              onSetEstado={onSetEstado}
            />
            : <div className={styles.noSenal} />}
        </Col>
        <Col md={4}>
          {der
            ? <EstadoLuz
              luz="der"
              manual={der.manual}
              estado={der.estado}
              onSetManual={onSetManual}
              onSetEstado={onSetEstado}
            />
            : <div className={styles.noSenal} />}
        </Col>
      </Row>
    </Container>
  );
}

EstadoSenal.propTypes = {
  idSenal: PropTypes.string,
};

