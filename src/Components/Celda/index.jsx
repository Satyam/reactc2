import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import {
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

import { buildId, useLongPress, isPlainClick, nombreEntity } from 'Utils';

import {
  useCelda,
  useShowCoords,
  useEstado,
  useBloque,
  useSetPosicion,
  useToggleRebota,
  useCondicionesFaltantes,
} from 'Store';
import Semaforo from 'Components/Semaforo';
import { CAMBIO, PARAGOLPE, BLOQUE, SEMAFORO } from 'Store/data';

import { ANCHO_CELDA, DIR } from 'Components/common';
import styles from './styles.module.css';

import Linea from './Linea';
import Cambio from './Cambio';
import Paragolpe from './Paragolpe';
import Cruce from './Cruce';
import { Despachador, Tren } from 'Components/Trenes';

function CondicionesFaltantes({ idCelda, faltantes, setShowFaltantes }) {
  const onClose = (ev) => {
    if (isPlainClick(ev)) {
      setShowFaltantes(false);
    }
  };

  return (
    <Popover isOpen={!!idCelda} target={idCelda}>
      <PopoverHeader className={styles.alarma}>
        Condiciones Faltantes
        <Button close className={styles.close} onClick={onClose} />
      </PopoverHeader>
      <PopoverBody>
        <ListGroup>
          {faltantes.map((falta, idx) => {
            switch (falta.tipo) {
              case BLOQUE:
                return (
                  <ListGroupItem
                    key={idx}
                  >{`Bloque ocupado ${falta.bloque}`}</ListGroupItem>
                );
              case SEMAFORO:
                return (
                  <ListGroupItem key={idx}>{`Semáforo libre: ${nombreEntity(
                    falta
                  )}`}</ListGroupItem>
                );
              default:
                break;
            }
            return '????';
          })}
        </ListGroup>
      </PopoverBody>
    </Popover>
  );
}

export function ActualCelda({
  celda,
  cellsAcross,
  cellWidth,
  padLeft,
  padTop,
}) {
  const idCelda = celda.idCelda;
  const setPosicion = useSetPosicion(idCelda);
  const toggleRebota = useToggleRebota(idCelda);
  const bloque = useBloque(celda.idBloque);
  const [showCoords] = useShowCoords();
  const { showEstado } = useEstado();
  const condicionesFaltantes = useCondicionesFaltantes(idCelda);
  const [showFaltantes, setShowFaltantes] = useState();
  const longPressProps = useLongPress({
    onClick: (ev) => {
      switch (celda.tipo) {
        case CAMBIO:
          if (condicionesFaltantes.length) {
            setShowFaltantes(true);
          } else {
            setPosicion((celda.posicion + 1) % celda.ramas.length);
          }
          break;
        case PARAGOLPE:
          toggleRebota();
          break;
        default:
          break;
      }
    },
    onLongPress: (ev) => {
      showEstado({
        tipo: celda.tipo,
        idCelda,
        placement,
      });
    },
  });

  useEffect(() => {
    if (showFaltantes && !condicionesFaltantes.length) {
      setShowFaltantes(false);
    }
  }, [showFaltantes, condicionesFaltantes.length]);

  if (!cellWidth || !celda) return null;
  const placement = celda.x > cellsAcross / 2 ? 'left' : 'right';

  const coords = showCoords ? `[${celda.x},${celda.y}]` : '';
  const title = [];
  if (celda.nombre) {
    title.push(`Celda: ${celda.nombre}`);
  }
  title.push(`Coordenadas: [${celda.x},${celda.y}]`);

  if (bloque) {
    title.push(`Bloque: ${bloque.nombre}`);
  }
  if (celda.idTren) {
    title.push(`Con tren ${celda.idTren}`);
  }

  const Renderer = {
    linea: Linea,
    cambio: Cambio,
    paragolpe: Paragolpe,
    cruce: Cruce,
  }[celda.tipo];
  return (
    <>
      <div
        id={idCelda}
        className={classNames(styles.rect, {
          [styles.manual]: celda.manual,
        })}
        style={{
          left: padLeft + celda.x * cellWidth,
          top: celda.y * cellWidth + padTop,
          width: cellWidth,
          height: cellWidth,
        }}
        title={title.join('\n')}
        {...longPressProps}
      >
        <svg
          viewBox={`0 0 ${ANCHO_CELDA} ${ANCHO_CELDA}`}
          width={cellWidth}
          height={cellWidth}
          className={styles.svg}
        >
          <text x="0" y="95" className={styles.text}>
            {coords}
          </text>
          {celda.nombre && (
            <text textAnchor="end" x={95} y={95} className={styles.text}>
              {celda.nombre}
            </text>
          )}
          <Renderer idCelda={idCelda} />
          {DIR.map((dir) => (
            <Semaforo
              key={dir}
              idSemaforo={buildId({
                ...celda,
                dir,
              })}
              placement={placement}
            />
          ))}
          {Array.isArray(celda.despachador) && <Despachador celda={celda} />}
          {celda.idTren ? <Tren celda={celda} /> : null}
        </svg>
      </div>
      {showFaltantes && (
        <CondicionesFaltantes
          idCelda={idCelda}
          faltantes={condicionesFaltantes}
          setShowFaltantes={setShowFaltantes}
        />
      )}
    </>
  );
}

export default function Celda({ idCelda, ...rest }) {
  const celda = useCelda(idCelda);
  if (celda) {
    return <ActualCelda celda={celda} {...rest} />;
  }
  return null;
}

Celda.whyDidYouRender = false;
