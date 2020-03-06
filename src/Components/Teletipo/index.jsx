import React from 'react';

import { Table } from 'reactstrap';

import styles from './styles.module.css';

const colores = ['normal', 'warning', 'danger'];

export default function Teletipo({ mensajes }) {
  return mensajes ? (
    <Table selectable={false}>
      <thead>
        <th>Fecha</th>
        <th>Sector</th>
        <th>Celda</th>
        <th>Mensaje</th>
      </thead>
      <tbody>
        {mensajes.map(row => (
          <tr className={styles[colores[row.nivel]]} key={row.fecha.getTime()}>
            <td>{row.fecha.toLocaleString()}</td>
            <td>{row.sector}</td>
            <td>{row.coords}</td>
            <td>{row.msg}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  ) : (
    <p>No hay mensajes</p>
  );
}
