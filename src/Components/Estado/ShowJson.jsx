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

import styles from './styles.module.css';

const SENAL = 'senal';
const CELDA = 'celda';
const ENCLAVAMIENTO = 'enclavamiento';

export default function ShowJson({ idCelda, idSenal, onClose }) {
  const celda = useSelector(state => selCelda(state, idCelda));
  const senal = useSelector(state => selSenal(state, idSenal));
  const enclavamiento = useSelector(state =>
    selEnclavamiento(state, senal || celda)
  );
  const [activeTab, setActiveTab] = useState(idSenal ? SENAL : CELDA);

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
        <Nav pills>
          {senal && (
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === SENAL })}
                onClick={() => {
                  toggle(SENAL);
                }}
              >
                Señal
              </NavLink>
            </NavItem>
          )}
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === CELDA })}
              onClick={() => {
                toggle(CELDA);
              }}
            >
              Celda
            </NavLink>
          </NavItem>
          {enclavamiento && (
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === ENCLAVAMIENTO })}
                onClick={() => {
                  toggle(ENCLAVAMIENTO);
                }}
              >
                Encl.
              </NavLink>
            </NavItem>
          )}{' '}
        </Nav>
        <TabContent activeTab={activeTab}>
          {senal && (
            <TabPane tabId={SENAL}>
              <pre>{JSON.stringify(senal, null, 2)}</pre>
            </TabPane>
          )}
          <TabPane tabId={CELDA}>
            <pre>{JSON.stringify(celda, null, 2)}</pre>
          </TabPane>
          {enclavamiento && (
            <TabPane tabId={ENCLAVAMIENTO}>
              <pre>{JSON.stringify(enclavamiento, null, 2)}</pre>
            </TabPane>
          )}
        </TabContent>
      </PopoverBody>
    </>
  );
}
