import React from 'react';
import { useAlarma, useDelTrenes, useSetAutomatizaciones } from 'Store';
import { CAMBIO } from 'Store/data';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import styles from './styles.module.css';
import { isPlainClick } from 'Utils';

export default function Alarma() {
  const [{ idCelda, numero, msg, fecha }, clearAlarma] = useAlarma();
  const delTrenes = useDelTrenes();
  const setAutomatizaciones = useSetAutomatizaciones();

  const onClose = (ev) => {
    if (isPlainClick(ev)) {
      clearAlarma();
      delTrenes();
      setAutomatizaciones(idCelda, CAMBIO);
    }
  };

  return (
    !!idCelda && (
      <Popover isOpen={!!idCelda} target={idCelda}>
        <PopoverHeader className={styles.alarma}>
          Tren {numero}
          <Button close className={styles.close} onClick={onClose} />
        </PopoverHeader>
        <PopoverBody>
          <p>{new Date(fecha).toLocaleString()}</p>
          {msg}
        </PopoverBody>
      </Popover>
    )
  );
}
