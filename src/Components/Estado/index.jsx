import React, { useState } from 'react';
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
  useSenal,
  useShowConfig,
  useEstado,
  useSelEnclavamiento,
} from 'Store';

import { CAMBIO, TRIPLE } from 'Store/data';

import EstadoCambio from './Cambio';
import EstadoTriple from './Triple';
import EstadoSenal from './Senal';

import styles from './styles.module.css';
import { isPlainClick } from 'Utils';

const TAB_SENAL = 'Señal';
const TAB_CELDA = 'Celda';
const TAB_ENCL = 'Encl.';
const TAB_COMANDO = 'Cmd.';

export default function Estado() {
  const {
    estado: { show, ...more },
  } = useEstado();
  // Had to break it in two because selectors don't work with invalid ids
  // so, if no show, no Popover.
  // I can't call useSelector conditionally so I render the component conditionally
  return show && <EstadoPopover {...more} />;
}

function EstadoPopover({ idCelda, idSenal, placement }) {
  const [oldId, setOldId] = useState();
  const celda = useCelda(idCelda);
  const senal = useSenal(idSenal);
  const [showConfig] = useShowConfig();
  const { hideEstado } = useEstado();
  const enclavamiento = useSelEnclavamiento(senal || celda);

  const [activeTab, setActiveTab] = useState();

  const activeElement = senal || celda.tipo === CAMBIO || celda.tipo === TRIPLE;

  if (oldId !== idCelda) {
    setActiveTab(activeElement ? TAB_COMANDO : idSenal ? TAB_SENAL : TAB_CELDA);
    setOldId(idCelda);
  }

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const onClose = ev => isPlainClick(ev) && hideEstado();

  const Command = () => (
    <>
      {senal && <EstadoSenal senal={senal} />}
      {!senal && celda.tipo === CAMBIO && <EstadoCambio celda={celda} />}
      {!senal && celda.tipo === TRIPLE && <EstadoTriple celda={celda} />}
    </>
  );
  // See: https://github.com/reactstrap/reactstrap/issues/1404#issuecomment-602011689
  // I am using a patched Popover.
  return (
    <Popover
      isOpen={!!(showConfig || activeElement)}
      target={idCelda}
      placement={placement}
    >
      <PopoverHeader>
        {senal ? 'Señal' : 'Celda'} {celda.x} {celda.y} {senal && senal.dir}
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
                  <Command />
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
          </>
        ) : (
          <Command />
        )}
      </PopoverBody>
    </Popover>
  );
}
