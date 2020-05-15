import React from 'react';
import {
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

import { isPlainClick, nombreEntity } from 'Utils';

import { BLOQUE, SEMAFORO } from 'Store/constantes';
import { useCondicionesFaltantes } from 'Store';
import styles from './styles.module.css';

export default function CondicionesFaltantes({ idCelda, setShowFaltantes }) {
  const faltantes = useCondicionesFaltantes(idCelda);

  const onClose = (ev) => {
    if (isPlainClick(ev)) {
      setShowFaltantes(false);
    }
  };

  return faltantes.length ? (
    <Popover isOpen={!!idCelda} target={idCelda}>
      <PopoverHeader>
        Condiciones Faltantes
        <Button close className={styles.close} onClick={onClose} />
      </PopoverHeader>
      <PopoverBody>
        <ListGroup>
          {faltantes.map((falta, idx) => {
            switch (falta.tipo) {
              case BLOQUE:
                return (
                  <ListGroupItem key={idx}>{`Bloque ocupado ${
                    falta.bloque || nombreEntity(falta)
                  }`}</ListGroupItem>
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
  ) : null;
}
