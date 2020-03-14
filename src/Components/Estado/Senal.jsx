import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Locked, Unlocked, Circle } from 'Components/Icons';

import isPlainClick from 'Utils/isPlainClick';

import { setLuzEstado, setLuzManual } from 'Store/actions';
import { selSenal } from 'Store/senales/selectors';

import { ButtonGroup, Button, PopoverHeader, PopoverBody } from 'reactstrap';

import styles from './styles.module.css';

export function EstadoLuz({ luz, manual, estado, onSetManual, onSetEstado }) {
  const onSetAlto = ev => isPlainClick(ev) && onSetEstado(luz, 'rojo');
  const onSetPrecaucion = ev =>
    isPlainClick(ev) && onSetEstado(luz, 'precaucion');
  const onSetLibre = ev => isPlainClick(ev) && onSetEstado(luz, 'verde');
  const onSetLuzManual = ev => isPlainClick(ev) && onSetManual(luz, !manual);

  return (
    <>
      <ButtonGroup vertical>
        <Button
          size="sm"
          color={estado === 'rojo' ? 'danger' : 'outline-danger'}
          onClick={onSetAlto}
        >
          <Circle />
        </Button>
        <Button
          size="sm"
          color={estado === 'amarillo' ? 'warning' : 'outline-warning'}
          onClick={onSetPrecaucion}
        >
          <Circle />
        </Button>
        <Button
          size="sm"
          color={estado === 'verde' ? 'success' : 'outline-success'}
          onClick={onSetLibre}
        >
          <Circle />
        </Button>
      </ButtonGroup>
      <Button
        className={styles.manual}
        size="sm"
        color={manual ? 'danger' : 'outline-info'}
        onClick={onSetLuzManual}
      >
        {manual ? <Unlocked /> : <Locked />}
      </Button>
    </>
  );
}

export default function EstadoSenal({ idSenal, onClose }) {
  const { dir, izq, primaria, der } = useSelector(state =>
    selSenal(state, idSenal)
  );

  const dispatch = useDispatch();
  const onSetEstado = (luz, estado) =>
    dispatch(setLuzEstado(idSenal, luz, estado));
  const onSetManual = (luz, manual) =>
    dispatch(setLuzManual(idSenal, luz, manual));

  return (
    <>
      <PopoverHeader>
        Señal {idSenal.split(':')[1]} - {dir}
        <Button close className={styles.close} onClick={onClose} />
      </PopoverHeader>
      <PopoverBody>
        <div
          className={classNames(styles.senal, styles.pushDown, {
            [styles.hidden]: !izq,
          })}
        >
          <EstadoLuz
            luz="izq"
            manual={izq && izq.manual}
            estado={izq && izq.estado}
            onSetManual={onSetManual}
            onSetEstado={onSetEstado}
          />
        </div>
        <div
          className={classNames(styles.senal, { [styles.hidden]: !primaria })}
        >
          <EstadoLuz
            luz="primaria"
            manual={primaria && primaria.manual}
            estado={primaria && primaria.estado}
            onSetManual={onSetManual}
            onSetEstado={onSetEstado}
          />
        </div>
        <div
          className={classNames(styles.senal, styles.pushDown, {
            [styles.hidden]: !der,
          })}
        >
          <EstadoLuz
            luz="der"
            manual={der && der.manual}
            estado={der && der.estado}
            onSetManual={onSetManual}
            onSetEstado={onSetEstado}
          />
        </div>
      </PopoverBody>
    </>
  );
}