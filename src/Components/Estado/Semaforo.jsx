import React from 'react';
import classNames from 'classnames';
import { Locked, Circle, Automatic, Hand } from 'Components/Icons';
import {
  LIBRE,
  PRECAUCION,
  ALTO,
  MANIOBRA,
  AUTOMATICO,
  BLOQUEADO,
} from 'Store/constantes';
import { isPlainClick } from 'Utils';

import {
  useSetAspectoSenal,
  useModoSemaforo,
  useRunAutomatizaciones,
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

export function EstadoSenal({ senal, aspecto, onSetAspecto }) {
  const onSetAlto = (ev) => isPlainClick(ev) && onSetAspecto(senal, ALTO);
  const onSetPrecaucion = (ev) =>
    isPlainClick(ev) && onSetAspecto(senal, PRECAUCION);
  const onSetLibre = (ev) => isPlainClick(ev) && onSetAspecto(senal, LIBRE);

  return (
    <>
      <ButtonGroup vertical>
        <Button
          size="sm"
          color={aspecto === ALTO ? 'danger' : 'outline-danger'}
          onClick={onSetAlto}
        >
          <Circle />
        </Button>
        <Button
          size="sm"
          color={aspecto === PRECAUCION ? 'warning' : 'outline-warning'}
          onClick={onSetPrecaucion}
        >
          <Circle />
        </Button>
        <Button
          size="sm"
          color={aspecto === LIBRE ? 'success' : 'outline-success'}
          onClick={onSetLibre}
        >
          <Circle />
        </Button>
      </ButtonGroup>
    </>
  );
}

export default function EstadoSemaforo({ semaforo }) {
  const { izq, soloManiobra, centro, der, idSemaforo } = semaforo;
  const setAspectoSenal = useSetAspectoSenal();
  const [modoSemaforo, setModoSemaforo] = useModoSemaforo(idSemaforo);
  const runAutomatizaciones = useRunAutomatizaciones();

  const onSetAspecto = (senal, aspecto) => {
    if (modoSemaforo === MANIOBRA || soloManiobra) {
      setAspectoSenal(idSemaforo, senal, aspecto);
    }
    if (soloManiobra) {
      runAutomatizaciones(idSemaforo);
    }
  };

  const onSetModo = (ev) => {
    if (isPlainClick(ev)) {
      setModoSemaforo(parseInt(ev.currentTarget.dataset.modo, 10));
    }
  };

  return (
    <PopoverBody>
      <Container>
        <div
          className={classNames({
            [styles.disabled]: !soloManiobra && !modoSemaforo,
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
                  aspecto={izq}
                  onSetAspecto={onSetAspecto}
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
                  aspecto={centro}
                  onSetAspecto={onSetAspecto}
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
                  aspecto={der}
                  onSetAspecto={onSetAspecto}
                />
              </div>
            </Col>
          </Row>
        </div>
        {!soloManiobra && (
          <Row>
            <ButtonGroup vertical className={styles.manual}>
              <Button
                size="sm"
                color={modoSemaforo === AUTOMATICO ? 'info' : 'outline-info'}
                onClick={onSetModo}
                data-modo={AUTOMATICO}
              >
                <Automatic />
                &nbsp;Automático
              </Button>
              <Button
                size="sm"
                color={
                  modoSemaforo === BLOQUEADO ? 'danger' : 'outline-secondary'
                }
                onClick={onSetModo}
                data-modo={BLOQUEADO}
              >
                <Locked />
                &nbsp;Bloqueado
              </Button>
              <Button
                size="sm"
                color={
                  modoSemaforo === MANIOBRA ? 'danger' : 'outline-secondary'
                }
                onClick={onSetModo}
                data-modo={MANIOBRA}
              >
                <Hand />
                &nbsp;Maniobra
              </Button>
            </ButtonGroup>
          </Row>
        )}
      </Container>
    </PopoverBody>
  );
}
