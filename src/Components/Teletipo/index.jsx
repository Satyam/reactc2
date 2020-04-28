import React, { useState } from 'react';

import { Table, Button, Label, Input } from 'reactstrap';
import { useAvisos, useShowTeletipo, useCelda } from 'Store';
import { isPlainClick, nombreEntity } from 'Utils';
import { Trash } from 'Components/Icons';
import styles from './styles.module.css';
import { INFO } from 'Store/data';

function Item({ nivel, fecha, idCelda, numero, msg, clearAviso }) {
  const celda = useCelda(idCelda);
  const clear = (ev) => isPlainClick(ev) && clearAviso(fecha);
  return (
    <tr className={styles[nivel]}>
      <td>{new Date(fecha).toLocaleString()}</td>
      <td>{nombreEntity(celda)}</td>
      <td>{numero}</td>
      <td colSpan={2}>{msg}</td>
      <td>
        <Trash onClick={clear} />
      </td>
    </tr>
  );
}

export default function Teletipo() {
  const [mensajes, clearAvisos, clearAviso] = useAvisos();
  const [showTeletipo, setShowTeletipo] = useShowTeletipo();
  const [info, setInfo] = useState(false);

  const clearAll = (ev) => isPlainClick(ev) && clearAvisos();
  const close = (ev) => isPlainClick(ev) && setShowTeletipo(!showTeletipo);
  const toggleInfo = (ev) => setInfo((i) => !i);

  return mensajes.length ? (
    <Table className={styles.fixed} size="sm">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Celda</th>
          <th>Tren</th>
          <th>Mensaje</th>
          <th>
            <Label>
              <Input type="checkbox" checked={info} onChange={toggleInfo} />
              &nbsp;Ver Info
            </Label>
          </th>
          <th className={styles.buttons}>
            <Button
              className={styles.close}
              title="Borrar todas las notificaciones"
              onClick={clearAll}
              size="sm"
            >
              <Trash />
            </Button>
            <Button close onClick={close} title="Cerrar Teletipo" size="sm" />
          </th>
        </tr>
      </thead>
      <tbody>
        {mensajes
          .filter((row) => (info ? true : row.nivel !== INFO))
          .map((row) => (
            <Item {...row} key={row.fecha} clearAviso={clearAviso} />
          ))}
      </tbody>
    </Table>
  ) : (
    <Table className={styles.fixed} size="sm">
      <thead>
        <tr>
          <th>No hay mensajes</th>
        </tr>
      </thead>
    </Table>
  );
}
