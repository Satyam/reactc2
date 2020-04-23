import React from 'react';
import classNames from 'classnames';
import { Locked, Unlocked, Circle } from 'Components/Icons';
import { LIBRE, PRECAUCION, ALTO } from 'Store/data';
import { isPlainClick } from 'Utils';

import {
  useSetSenal,
  useSemaforoManual,
  useRunAutomatizaciones,
  useRunAutomatizacion,
} from 'Store';

import {
  ButtonGroup,
  Button,
  PopoverBody,
  Container,
  Row,
  Col,
} from 'reactstrap';

import styles from './styles.module.css';

export function EstadoSenal({ senal, estado, onSetEstado }) {
  const onSetAlto = (ev) => isPlainClick(ev) && onSetEstado(senal, ALTO);
  const onSetPrecaucion = (ev) =>
    isPlainClick(ev) && onSetEstado(senal, PRECAUCION);
  const onSetLibre = (ev) => isPlainClick(ev) && onSetEstado(senal, LIBRE);

  return (
    <>
      <ButtonGroup vertical>
        <Button
          size="sm"
          color={estado === ALTO ? 'danger' : 'outline-danger'}
          onClick={onSetAlto}
        >
          <Circle />
        </Button>
        <Button
          size="sm"
          color={estado === PRECAUCION ? 'warning' : 'outline-warning'}
          onClick={onSetPrecaucion}
        >
          <Circle />
        </Button>
        <Button
          size="sm"
          color={estado === LIBRE ? 'success' : 'outline-success'}
          onClick={onSetLibre}
        >
          <Circle />
        </Button>
      </ButtonGroup>
    </>
  );
}

export default function EstadoSemaforo({ semaforo }) {
  const { izq, soloManual, centro, der, idSemaforo } = semaforo;
  const setSenalEstado = useSetSenal();
  const [semaforoIsManual, toggleSemaforoManual] = useSemaforoManual(
    idSemaforo
  );
  const runAutomatizacion = useRunAutomatizacion();
  const runAutomatizaciones = useRunAutomatizaciones();

  const onSetEstado = (senal, estado) => {
    if (semaforoIsManual || soloManual) {
      setSenalEstado(idSemaforo, senal, estado);
    }
    if (soloManual) {
      runAutomatizaciones(idSemaforo);
    }
  };
  const onSetManual = () => {
    toggleSemaforoManual();
    if (semaforoIsManual) runAutomatizacion(idSemaforo);
  };

  return (
    <PopoverBody>
      <Container>
        <div
          className={classNames({
            [styles.disabled]: !soloManual && !semaforoIsManual,
          })}
        >
          <Row>
            <Col>
              <div
                className={classNames(styles.pushDown, {
                  [styles.hidden]: !izq,
                })}
              >
                <EstadoSenal
                  senal="izq"
                  estado={izq}
                  onSetEstado={onSetEstado}
                />
              </div>
            </Col>
            <Col>
              <div
                className={classNames({
                  [styles.hidden]: !centro,
                })}
              >
                <EstadoSenal
                  senal="centro"
                  estado={centro}
                  onSetEstado={onSetEstado}
                />
              </div>
            </Col>
            <Col>
              <div
                className={classNames(styles.semaforo, styles.pushDown, {
                  [styles.hidden]: !der,
                })}
              >
                <EstadoSenal
                  senal="der"
                  estado={der}
                  onSetEstado={onSetEstado}
                />
              </div>
            </Col>
          </Row>
        </div>
        {!soloManual && (
          <Row>
            <Button
              className={styles.manual}
              size="sm"
              color={semaforoIsManual ? 'danger' : 'outline-info'}
              onClick={onSetManual}
            >
              {semaforoIsManual ? <Unlocked /> : <Locked />}
            </Button>
          </Row>
        )}
      </Container>
    </PopoverBody>
  );
}
