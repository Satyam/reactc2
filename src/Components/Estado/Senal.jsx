import React from 'react';
import classNames from 'classnames';
import { Locked, Unlocked, Circle } from 'Components/Icons';
import { VERDE, AMARILLO, ROJO, SENAL } from 'Store/data';
import { isPlainClick } from 'Utils';

import { useSetLuz, useSenalManual, useSetEnclavamientos } from 'Store';

import {
  ButtonGroup,
  Button,
  PopoverBody,
  Container,
  Row,
  Col,
} from 'reactstrap';

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

export default function EstadoSenal({ senal }) {
  const { izq, soloManual, centro, der, idSenal } = senal;
  const setLuzEstado = useSetLuz(idSenal);
  const [senalIsManual, toggleSenalManual] = useSenalManual(idSenal);
  const setEnclavamientos = useSetEnclavamientos(idSenal, SENAL);

  const onSetEstado = async (luz, estado) => {
    if (senalIsManual || soloManual) {
      await setLuzEstado(luz, estado);
    }
    if (soloManual) {
      await setEnclavamientos(true);
    }
  };
  const onSetManual = async () => {
    await toggleSenalManual();
    if (senalIsManual) await setEnclavamientos(true);
  };

  return (
    <PopoverBody>
      <Container>
        <div
          className={classNames({
            [styles.disabled]: !soloManual && !senalIsManual,
          })}
        >
          <Row>
            <Col>
              <div
                className={classNames(styles.pushDown, {
                  [styles.hidden]: !izq,
                })}
              >
                <EstadoLuz luz="izq" estado={izq} onSetEstado={onSetEstado} />
              </div>
            </Col>
            <Col>
              <div
                className={classNames({
                  [styles.hidden]: !centro,
                })}
              >
                <EstadoLuz
                  luz="centro"
                  estado={centro}
                  onSetEstado={onSetEstado}
                />
              </div>
            </Col>
            <Col>
              <div
                className={classNames(styles.senal, styles.pushDown, {
                  [styles.hidden]: !der,
                })}
              >
                <EstadoLuz luz="der" estado={der} onSetEstado={onSetEstado} />
              </div>
            </Col>
          </Row>
        </div>
        {!soloManual && (
          <Row>
            <Button
              className={styles.manual}
              size="sm"
              color={senalIsManual ? 'danger' : 'outline-info'}
              onClick={onSetManual}
            >
              {senalIsManual ? <Unlocked /> : <Locked />}
            </Button>
          </Row>
        )}
      </Container>
    </PopoverBody>
  );
}
