import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Locked, Unlocked, Circle } from 'Components/Icons';
import { VERDE, AMARILLO, ROJO, SENAL } from 'Store/data';
import isPlainClick from 'Utils/isPlainClick';

import { setLuzEstado, setSenalManual, setEnclavamientos } from 'Store/actions';
import { selSenal } from 'Store/senales/selectors';

import { ButtonGroup, Button, PopoverHeader, PopoverBody } from 'reactstrap';

import styles from './styles.module.css';

export function EstadoLuz({ luz, estado, onSetEstado }) {
  const onSetAlto = ev => isPlainClick(ev) && onSetEstado(luz, ROJO);
  const onSetPrecaucion = ev => isPlainClick(ev) && onSetEstado(luz, AMARILLO);
  const onSetLibre = ev => isPlainClick(ev) && onSetEstado(luz, VERDE);

  return (
    <>
      <ButtonGroup vertical>
        <Button
          size="sm"
          color={estado === ROJO ? 'danger' : 'outline-danger'}
          onClick={onSetAlto}
        >
          <Circle />
        </Button>
        <Button
          size="sm"
          color={estado === AMARILLO ? 'warning' : 'outline-warning'}
          onClick={onSetPrecaucion}
        >
          <Circle />
        </Button>
        <Button
          size="sm"
          color={estado === VERDE ? 'success' : 'outline-success'}
          onClick={onSetLibre}
        >
          <Circle />
        </Button>
      </ButtonGroup>
    </>
  );
}

export default function EstadoSenal({ idSenal, onClose }) {
  const { dir, izq, manual, soloManual, primaria, der } = useSelector(state =>
    selSenal(state, idSenal)
  );

  const dispatch = useDispatch();
  const onSetEstado = async (luz, estado) => {
    if (manual || soloManual) {
      await dispatch(setLuzEstado(idSenal, luz, estado));
    }
    if (soloManual) {
      await dispatch(setEnclavamientos(idSenal, SENAL, true));
    }
  };
  const onSetManual = async () => {
    await dispatch(setSenalManual(idSenal, !manual));
    debugger;
    if (manual) await dispatch(setEnclavamientos(idSenal, SENAL, true));
  };

  return (
    <>
      <PopoverHeader>
        Señal {idSenal.split(':')[1]} - {dir}
        <Button close className={styles.close} onClick={onClose} />
      </PopoverHeader>
      <PopoverBody>
        <div
          className={classNames(styles.senales, {
            [styles.disabled]: !soloManual && !manual,
          })}
        >
          <div
            className={classNames(styles.senal, styles.pushDown, {
              [styles.hidden]: !izq,
            })}
          >
            <EstadoLuz luz="izq" estado={izq} onSetEstado={onSetEstado} />
          </div>
          <div
            className={classNames(styles.senal, {
              [styles.hidden]: !primaria,
            })}
          >
            <EstadoLuz
              luz="primaria"
              estado={primaria}
              onSetEstado={onSetEstado}
            />
          </div>
          <div
            className={classNames(styles.senal, styles.pushDown, {
              [styles.hidden]: !der,
            })}
          >
            <EstadoLuz luz="der" estado={der} onSetEstado={onSetEstado} />
          </div>
        </div>
        {!soloManual && (
          <Button
            className={styles.manual}
            size="sm"
            color={manual ? 'danger' : 'outline-info'}
            onClick={onSetManual}
          >
            {manual ? <Unlocked /> : <Locked />}
          </Button>
        )}
      </PopoverBody>
    </>
  );
}
