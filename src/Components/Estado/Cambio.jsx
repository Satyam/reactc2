import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { ButtonGroup, Button } from 'react-bootstrap';

import { CambioNormal, CambioDesviado, Locked, Unlocked } from 'Components/Icons';
import isPlainClick from 'Utils/isPlainClick';
import { setCambio, setCambioManual } from 'Store/actions';

import styles from './styles.module.css';

const DESVIADO = 'desviado';
const NORMAL = 'normal';

export default function EstadoCambio({ idCelda }) {

  const { coords, posicion, manual } = useSelector(state => state.celdas[idCelda]);
  const dispatch = useDispatch();

  const onSetCambioNormal = ev => isPlainClick(ev) && dispatch(setCambio(idCelda, NORMAL));
  const onSetCambioDesviado = ev => isPlainClick(ev) && dispatch(setCambio(idCelda, DESVIADO));
  const onSetManual = ev => isPlainClick(ev) && dispatch(setCambioManual(idCelda, !manual));

  return (
    <>
      <div className={styles.label}>{`Cambio ${coords}`}</div>
      <ButtonGroup>
        <Button
          size="sm"
          onClick={onSetCambioNormal}
          variant={posicion === NORMAL ? 'primary' : 'outline-secondary'}
        ><CambioNormal /></Button>
        <Button
          size="sm"
          onClick={onSetCambioDesviado}
          variant={posicion === DESVIADO ? 'primary' : 'outline-secondary'}
        ><CambioDesviado /></Button>
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

EstadoCambio.propTypes = {
  idCelda: PropTypes.string.isRequired,
};
