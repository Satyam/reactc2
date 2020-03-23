import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';

import {
  Button,
  PopoverHeader,
  PopoverBody,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import { selCelda, selSenal, selEnclavamiento } from 'Store/selectors';
import { CAMBIO, TRIPLE } from 'Store/data';

import Cambio from './Cambio';
import Triple from './Triple';
import Senal from './Senal';

import styles from './styles.module.css';

const TAB_SENAL = 'Señal';
const TAB_CELDA = 'Celda';
const TAB_ENCL = 'Encl.';
const TAB_COMANDO = 'Cmd.';

export default function ShowJson({ idCelda, idSenal, onClose }) {
  const celda = useSelector(state => selCelda(state, idCelda));
  const senal = useSelector(state => selSenal(state, idSenal));
  const enclavamiento = useSelector(state =>
    selEnclavamiento(state, senal || celda)
  );

  const activeElement = senal || celda.tipo === CAMBIO || celda.tipo === TRIPLE;
  const [activeTab, setActiveTab] = useState(
    activeElement ? TAB_COMANDO : idSenal ? TAB_SENAL : TAB_CELDA
  );

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <>
      <PopoverHeader>
        {senal ? 'Señal' : 'Celda'} {celda.x} {celda.y} {senal && senal.dir}
        <Button close className={styles.close} onClick={onClose} />
      </PopoverHeader>
      <PopoverBody>
        <Nav pills className={styles.solapas}>
          {activeElement && (
            <NavItem title="Mostrar Comandos">
              <NavLink
                className={classnames(styles.solapa, {
                  active: activeTab === TAB_COMANDO,
                })}
                onClick={() => {
                  toggle(TAB_COMANDO);
                }}
              >
                {TAB_COMANDO}
              </NavLink>
            </NavItem>
          )}
          {senal && (
            <NavItem title="Mostrar COnfiguración Señal">
              <NavLink
                className={classnames(styles.solapa, {
                  active: activeTab === TAB_SENAL,
                })}
                onClick={() => {
                  toggle(TAB_SENAL);
                }}
              >
                {TAB_SENAL}
              </NavLink>
            </NavItem>
          )}
          <NavItem title="Mostrar Configuración Celda">
            <NavLink
              className={classnames(styles.solapa, {
                active: activeTab === TAB_CELDA,
              })}
              onClick={() => {
                toggle(TAB_CELDA);
              }}
            >
              {TAB_CELDA}
            </NavLink>
          </NavItem>
          {enclavamiento && (
            <NavItem title="Mostrar Configuración Enclavamientos">
              <NavLink
                className={classnames(styles.solapa, {
                  active: activeTab === TAB_ENCL,
                })}
                onClick={() => {
                  toggle(TAB_ENCL);
                }}
              >
                {TAB_ENCL}
              </NavLink>
            </NavItem>
          )}{' '}
        </Nav>
        <TabContent activeTab={activeTab}>
          {activeElement && (
            <TabPane tabId={TAB_COMANDO}>
              {senal && <Senal senal={senal} />}
              {!senal && celda.tipo === CAMBIO && <Cambio celda={celda} />}
              {!senal && celda.tipo === TRIPLE && <Triple celda={celda} />}
            </TabPane>
          )}
          {senal && (
            <TabPane tabId={TAB_SENAL}>
              <pre>{JSON.stringify(senal, null, 2)}</pre>
            </TabPane>
          )}
          <TabPane tabId={TAB_CELDA}>
            <pre>{JSON.stringify(celda, null, 2)}</pre>
          </TabPane>
          {enclavamiento && (
            <TabPane tabId={TAB_ENCL}>
              <pre>{JSON.stringify(enclavamiento, null, 2)}</pre>
            </TabPane>
          )}
        </TabContent>
      </PopoverBody>
    </>
  );
}
