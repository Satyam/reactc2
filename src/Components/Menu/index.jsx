import React, { useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { isPlainClick } from 'Utils';
import {
  useSectores,
  useSector,
  useShowTeletipo,
  useEnclavamientosActive,
  useShowCoords,
  useShowConfig,
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

import Animador from 'Components/Animador';
import { GitHub } from 'Components/Icons';

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

  const onClickSector = (ev) => {
    if (idSector !== oldIdSector) {
      hideEstado();
      setOldIdSector(idSector);
      setIsOpen(false);
    }
  };

  const onClickShowEnclavamientos = (ev) => {
    if (isPlainClick(ev)) {
      toggleEnclavamientos();
      setIsOpen(false);
    }
  };

  const onClickShowTeletipo = (ev) => {
    if (isPlainClick(ev)) {
      toggleTeletipo();
      setIsOpen(false);
    }
  };
  const onClickShowCoords = (ev) => {
    if (isPlainClick(ev)) {
      toggleShowCoords();
      setIsOpen(false);
    }
  };
  const onClickShowConfig = (ev) => {
    if (isPlainClick(ev)) {
      toggleShowConfig();
      setIsOpen(false);
    }
  };
  const toggleOpen = () => setIsOpen(!isOpen);
  return (
    <Navbar color="light" light expand="md" fixed="top">
      <NavbarBrand
        color="default"
        href={
          process.env.NODE_ENV === 'production' ? process.env.PUBLIC_URL : '/'
        }
        title="Volver al inicio"
      >
        CTC
      </NavbarBrand>
      <Animador />

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
              {sectores.map((sect) => (
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
              <DropdownItem onClick={onClickShowTeletipo} active={showTeletipo}>
                Teletipo
              </DropdownItem>
              <DropdownItem
                onClick={onClickShowEnclavamientos}
                active={enclavamientosActive}
              >
                Enclavamientos
              </DropdownItem>
              <DropdownItem onClick={onClickShowCoords} active={showCoords}>
                Coordenadas
              </DropdownItem>
              <DropdownItem onClick={onClickShowConfig} active={showConfig}>
                Mostrar Config.
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <Nav navbar>
          <NavItem>
            <NavLink
              href="https://github.com/Satyam/reactc2"
              title="Ver código fuente en GitHub"
              target="_blank"
            >
              <GitHub /> Github
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}
