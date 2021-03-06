import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

import {
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import {
  useCelda,
  useSemaforo,
  useShowConfig,
  useEstado,
  useSelAutomatizacion,
  useSelEnclavamiento,
} from 'Store';

import { CAMBIO, PARAGOLPE } from 'Store/constantes';

import EstadoCambio from './Cambio';
import EstadoSemaforo from './Semaforo';
import EstadoParagolpe from './Paragolpe';

import styles from './styles.module.css';
import { isPlainClick, nombreEntity } from 'Utils';

const TAB_SEMAFORO = 'Semaforo';
const TAB_CELDA = 'Celda';
const TAB_AUTOM = 'Autom.';
const TAB_COMANDO = 'Cmd.';
const TAB_ENCL = 'Enclav.';

function ActualEstado({ idCelda, idSemaforo, placement }) {
  const [oldId, setOldId] = useState();
  const celda = useCelda(idCelda);
  const semaforo = useSemaforo(idSemaforo);
  const [showConfig] = useShowConfig();
  const { hideEstado } = useEstado();
  const automatizacion = useSelAutomatizacion(idSemaforo || idCelda);
  const enclavamiento = useSelEnclavamiento(idCelda);

  const [activeTab, setActiveTab] = useState();

  const activeElement =
    semaforo || celda.tipo === CAMBIO || celda.tipo === PARAGOLPE;

  useEffect(() => {
    if (oldId !== idCelda) {
      setActiveTab(
        activeElement ? TAB_COMANDO : idSemaforo ? TAB_SEMAFORO : TAB_CELDA
      );
      setOldId(idCelda);
    }
  }, [oldId, idCelda, activeElement, idSemaforo]);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const onClose = (ev) => isPlainClick(ev) && hideEstado();

  let Command = null;

  if (semaforo) Command = EstadoSemaforo;
  else
    switch (celda.tipo) {
      case CAMBIO:
        Command = EstadoCambio;
        break;
      case PARAGOLPE:
        Command = EstadoParagolpe;
        break;
      default:
        break;
    }

  // See: https://github.com/reactstrap/reactstrap/issues/1404#issuecomment-602011689
  // I am using a patched Popover.

  return (
    (showConfig || activeElement) && (
      <Popover isOpen target={idCelda} placement={placement}>
        <PopoverHeader>
          {semaforo
            ? `Semáforo ${nombreEntity(semaforo)}`
            : `Celda ${nombreEntity(celda)}`}
          <Button close className={styles.close} onClick={onClose} />
        </PopoverHeader>
        <PopoverBody>
          {showConfig ? (
            <>
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
                {semaforo && (
                  <NavItem title="Mostrar Configuración Semaforo">
                    <NavLink
                      className={classnames(styles.solapa, {
                        active: activeTab === TAB_SEMAFORO,
                      })}
                      onClick={() => {
                        toggle(TAB_SEMAFORO);
                      }}
                    >
                      {TAB_SEMAFORO}
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
                {automatizacion && (
                  <NavItem title="Mostrar Configuración Automatización">
                    <NavLink
                      className={classnames(styles.solapa, {
                        active: activeTab === TAB_AUTOM,
                      })}
                      onClick={() => {
                        toggle(TAB_AUTOM);
                      }}
                    >
                      {TAB_AUTOM}
                    </NavLink>
                  </NavItem>
                )}
                {enclavamiento && (
                  <NavItem title="Mostrar Configuración Enclavamiento">
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
                )}
              </Nav>
              <TabContent activeTab={activeTab}>
                {activeElement && (
                  <TabPane tabId={TAB_COMANDO}>
                    <Command celda={celda} semaforo={semaforo} />
                  </TabPane>
                )}
                {semaforo && (
                  <TabPane tabId={TAB_SEMAFORO}>
                    <pre>{JSON.stringify(semaforo, null, 2)}</pre>
                  </TabPane>
                )}
                <TabPane tabId={TAB_CELDA}>
                  <pre>{JSON.stringify(celda, null, 2)}</pre>
                </TabPane>
                {automatizacion && (
                  <TabPane tabId={TAB_AUTOM}>
                    <pre>{JSON.stringify(automatizacion, null, 2)}</pre>
                  </TabPane>
                )}
                {enclavamiento && (
                  <TabPane tabId={TAB_ENCL}>
                    <pre>{JSON.stringify(enclavamiento, null, 2)}</pre>
                  </TabPane>
                )}
              </TabContent>
            </>
          ) : (
            <Command celda={celda} semaforo={semaforo} />
          )}
        </PopoverBody>
      </Popover>
    )
  );
}

export default function Estado() {
  const {
    estado: { show, ...more },
  } = useEstado();
  return show && <ActualEstado {...more} />;
}
