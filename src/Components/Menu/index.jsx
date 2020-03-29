import React, { useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import styles from './styles.module.css';

import {
  useSectores,
  useSector,
  useShowTeletipo,
  useEnclavamientosActive,
  useShowCoords,
  useShowConfig,
  usePlay,
  useEstado,
} from 'Store';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import { GitHub, Play } from 'Components/Icons';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const match = useRouteMatch('/sector/:idSector');
  const idSector = match && match.params.idSector;
  const sectores = useSectores();
  const sector = useSector(idSector);
  const [
    enclavamientosActive,
    toggleEnclavamientos,
  ] = useEnclavamientosActive();
  const [showTeletipo, toggleTeletipo] = useShowTeletipo();
  const [showCoords, toggleShowCoords] = useShowCoords();
  const [showConfig, toggleShowConfig] = useShowConfig();
  const { hideEstado } = useEstado();
  const [oldIdSector, setOldIdSector] = useState();
  const [play, setPlay] = usePlay();

  const onClickSector = () => {
    if (idSector !== oldIdSector) {
      hideEstado();
      setOldIdSector(idSector);
    }
  };
  const toggleOpen = () => setIsOpen(!isOpen);
  const togglePlay = () => setPlay(!play);
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand
          color="default"
          href={process.env.NODE_ENV === 'production' ? '/CTC' : '/'}
          title="Volver al inicio"
        >
          CTC
        </NavbarBrand>

        <NavbarToggler onClick={toggleOpen} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle
                nav
                caret
                title={sector ? sector.descr : 'Seleccione sector a visualizar'}
              >
                {sector ? sector.descrCorta : 'Sectores'}
              </DropdownToggle>
              <DropdownMenu>
                {sectores.map(sect => (
                  <DropdownItem
                    tag={Link}
                    to={`/sector/${sect.idSector}`}
                    key={sect.idSector}
                    title={sect.descr}
                    active={idSector === sect.idSector}
                    onClick={onClickSector}
                  >
                    {sect.descrCorta}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret title="Opciones de visualización">
                Opciones
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={toggleTeletipo} active={showTeletipo}>
                  Teletipo
                </DropdownItem>
                <DropdownItem
                  onClick={toggleEnclavamientos}
                  active={enclavamientosActive}
                >
                  Enclavamientos
                </DropdownItem>
                <DropdownItem onClick={toggleShowCoords} active={showCoords}>
                  Coordenadas
                </DropdownItem>
                <DropdownItem onClick={toggleShowConfig} active={showConfig}>
                  Mostrar Config.
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink
                className={play ? styles.pressed : styles.raised}
                onClick={togglePlay}
              >
                <Play />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="https://github.com/Satyam/reactc2"
                title="Ver código fuente en GitHub"
              >
                <GitHub /> Github
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
