import React from 'react';

import { Button, PopoverBody } from 'reactstrap';

import { Rebota } from 'Components/Icons';

import { isPlainClick } from 'Utils';

import { useToggleRebota } from 'Store';

import styles from './styles.module.css';

export default function EstadoParagolpe({ celda }) {
  const { idCelda, rebota } = celda;
  const toggleRebota = useToggleRebota(idCelda);

  const onClick = (ev) => isPlainClick(ev) && toggleRebota();

  return (
    <PopoverBody>
      <Button
        onClick={onClick}
        size="sm"
        color={rebota ? 'primary' : 'outline-secondary'}
        className={styles.manual}
      >
        <Rebota />
        {rebota ? ' Rebota' : ' No rebota'}
      </Button>
    </PopoverBody>
  );
}
