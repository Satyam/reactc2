import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FaLock, FaLockOpen } from 'react-icons/fa';
import { GiPlainCircle } from 'react-icons/gi';

import isPlainClick from 'Utils/isPlainClick';
import { setLuzEstado, setLuzManual } from 'Store/actions';
import { ButtonGroup, Button } from 'react-bootstrap';

import styles from './styles.module.css';

export function EstadoLuz({
  luz,
  manual,
  estado,
  onSetManual,
  onSetEstado,
}) {

  const onSetAlto = ev => isPlainClick(ev) && onSetEstado(luz, 'alto');
  const onSetPrecaucion = ev => isPlainClick(ev) && onSetEstado(luz, 'precaucion');
  const onSetLibre = ev => isPlainClick(ev) && onSetEstado(luz, 'libre');
  const onSetLuzManual = ev => isPlainClick(ev) && onSetManual(luz, !manual)

  return (
    <>
      <ButtonGroup vertical>
        <Button
          size="sm"
          variant={estado === 'alto' ? 'danger' : 'outline-danger'}
          onClick={onSetAlto}
        ><GiPlainCircle /></Button>
        <Button
          size="sm"
          variant={estado === 'precaucion' ? 'warning' : 'outline-warning'}
          onClick={onSetPrecaucion}
        ><GiPlainCircle /></Button>
        <Button
          size="sm"
          variant={estado === 'libre' ? 'success' : 'outline-success'}
          onClick={onSetLibre}
        ><GiPlainCircle /></Button>
      </ButtonGroup>
      <Button
        className={styles.manual}
        size="sm"
        variant={manual ? 'danger' : 'outline-info'}
        onClick={onSetLuzManual}
      >
        {manual ? <FaLockOpen /> : <FaLock />}
      </Button>
    </>
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
    dir,
    izq,
    primaria,
    der,
  } = useSelector(state => state.senales[idSenal]);

  const dispatch = useDispatch();
  const onSetEstado = (luz, estado) => dispatch(setLuzEstado(idSenal, luz, estado));
  const onSetManual = (luz, manual) => dispatch(setLuzManual(idSenal, luz, manual));

  return (
    <>
      <div className={styles.label}>{`Señal ${idSenal.split(':')[1]} - ${dir}`}</div>
      <div className={styles.senales}>
        <div className={classNames(styles.senal, styles.pushDown, { [styles.hidden]: !izq })}>
          <EstadoLuz
            luz="izq"
            manual={izq && izq.manual}
            estado={izq && izq.estado}
            onSetManual={onSetManual}
            onSetEstado={onSetEstado}
          />
        </div>
        <div className={classNames(styles.senal, { [styles.hidden]: !primaria })}>
          <EstadoLuz
            luz="primaria"
            manual={primaria && primaria.manual}
            estado={primaria && primaria.estado}
            onSetManual={onSetManual}
            onSetEstado={onSetEstado}
          />
        </div>
        <div className={classNames(styles.senal, styles.pushDown, { [styles.hidden]: !der })}>
          <EstadoLuz
            luz="der"
            manual={der && der.manual}
            estado={der && der.estado}
            onSetManual={onSetManual}
            onSetEstado={onSetEstado}
          />
        </div>
      </div>
    </>
  );
}

EstadoSenal.propTypes = {
  idSenal: PropTypes.string,
};

