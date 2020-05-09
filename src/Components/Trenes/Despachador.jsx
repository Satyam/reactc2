import React, { useState } from 'react';
import {
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

import { useLongPress, isPlainClick, holdPropagation } from 'Utils';
import { CENTRO_CELDA } from 'Components/common';
import { CAMBIO } from 'Store/constantes';
import { useAddTren, useBloqueOcupado } from 'Store';

import styles from './styles.module.css';

function MenuTrenes({ celda, dir, cerrar }) {
  const addTren = useAddTren();

  const onClose = (ev) => {
    if (isPlainClick(ev)) {
      cerrar();
    }
  };

  const trenes = [
    {
      descr: 'Normal',
      maxSpeed: 1,
    },
    {
      descr: 'Rápido',
      maxSpeed: 3,
    },
  ];
  const despachar = (ev) => {
    if (isPlainClick(ev)) {
      addTren(celda, dir, trenes[ev.currentTarget.dataset.tipo].maxSpeed);
    }
  };

  return (
    <Popover isOpen target={celda.idCelda} placement="top">
      <PopoverHeader>
        Tipos de trenes
        <Button close className={styles.close} onClick={onClose} />
      </PopoverHeader>
      <PopoverBody>
        <ListGroup>
          {trenes.map((tren, idx) => (
            <ListGroupItem key={idx} data-tipo={idx} onClick={despachar}>
              {tren.descr}
            </ListGroupItem>
          ))}
        </ListGroup>
      </PopoverBody>
    </Popover>
  );
}

function ActualDespachador({ celda, dir }) {
  const addTren = useAddTren();
  const bloqueOcupado = useBloqueOcupado(celda.idBloque);
  const [isOpen, setOpen] = useState(false);
  const cerrar = () => setOpen(false);
  const longPressProps = useLongPress({
    onClick: () => {
      if (celda.idTren) return;
      addTren(celda, dir);
    },
    onLongPress: () => {
      setOpen(true);
    },
  });
  return (
    <g {...holdPropagation}>
      {isOpen && <MenuTrenes celda={celda} dir={dir} cerrar={cerrar} />}
      <circle
        cx={CENTRO_CELDA}
        cy={CENTRO_CELDA}
        r={9}
        className={styles.trenDespachador}
      />
      {!bloqueOcupado && (
        <g className={styles.flechaDespachador} {...longPressProps}>
          <path
            d="M 11,-12 L 29,0 11,12 z"
            transform={`translate(${CENTRO_CELDA},${CENTRO_CELDA})`}
          />
        </g>
      )}
    </g>
  );
}

export default function Despachador({ celda, dir }) {
  return Array.isArray(celda.despachador) &&
    celda.despachador.includes(dir) &&
    !celda.idTren &&
    (celda.tipo !== CAMBIO ||
      celda.punta === dir ||
      celda.ramas[celda.posicion] === dir) ? (
    <ActualDespachador celda={celda} dir={dir} />
  ) : null;
}
