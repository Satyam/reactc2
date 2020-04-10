import React from 'react';
import { useAlarma, useDelTrenes, useSetEnclavamientos } from 'Store';
import { CAMBIO } from 'Store/data';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import styles from './styles.module.css';
import { isPlainClick } from 'Utils';

export default function Alarma() {
  const [{ idCelda, idTren, msg, time }, clearAlarma] = useAlarma();
  const delTrenes = useDelTrenes();
  const setEnclavamientos = useSetEnclavamientos();

  const onClose = (ev) => {
    if (isPlainClick(ev)) {
      clearAlarma();
      delTrenes();
      setEnclavamientos(idCelda, CAMBIO);
    }
  };

  return (
    !!idCelda && (
      <Popover isOpen={!!idCelda} target={idCelda}>
        <PopoverHeader className={styles.alarma}>
          {idTren}
          <Button close className={styles.close} onClick={onClose} />
        </PopoverHeader>
        <PopoverBody>
          <p>{new Date(time).toLocaleString()}</p>
          {msg}
        </PopoverBody>
      </Popover>
    )
  );
}
