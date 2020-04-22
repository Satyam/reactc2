import React, { useState } from 'react';

import { Table, Button, Label, Input } from 'reactstrap';
import { useAvisos, useShowTeletipo } from 'Store';
import { isPlainClick } from 'Utils';
import { Trash } from 'Components/Icons';
import styles from './styles.module.css';
import { INFO } from 'Store/data';

export default function Teletipo() {
  const [mensajes, clearAvisos, clearAviso] = useAvisos();
  const [, toggleTeletipo] = useShowTeletipo();
  const [info, setInfo] = useState(false);

  const clearAll = (ev) => isPlainClick(ev) && clearAvisos();
  const close = (ev) => isPlainClick(ev) && toggleTeletipo();
  const clear = (fecha) => (ev) => isPlainClick(ev) && clearAviso(fecha);
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
            <tr className={styles[row.nivel]} key={row.fecha}>
              <td>{new Date(row.fecha).toLocaleString()}</td>
              <td>{row.idCelda}</td>
              <td>{row.numero}</td>
              <td colSpan={2}>{row.msg}</td>
              <td>
                <Trash onClick={clear(row.fecha)} />
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  ) : (
    <p className={styles.fixed}>No hay mensajes</p>
  );
}
