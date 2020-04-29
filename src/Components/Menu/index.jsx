import React, { useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { isPlainClick } from 'Utils';
import {
  useSectores,
  useSector,
  useShowTeletipo,
  useAutomatizacionesActive,
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

import loadingIcon from 'Components/Icons/loading.gif';

function ActualMenu({ sectores }) {
  const [isOpen, setIsOpen] = useState(false);
  const match = useRouteMatch('/sector/:idSector');
  const idSector = match && match.params.idSector;
  const { sector } = useSector(idSector);
  const [
    automatizacionesActive,
    setAutomatizaciones,
  ] = useAutomatizacionesActive();
  const [showTeletipo, setShowTeletipo] = useShowTeletipo();
  const [showCoords, setShowCoords] = useShowCoords();
  const [showConfig, setShowConfig] = useShowConfig();
  const { hideEstado } = useEstado();
  const [oldIdSector, setOldIdSector] = useState();

  const onClickSector = (ev) => {
    if (idSector !== oldIdSector) {
      hideEstado();
      setOldIdSector(idSector);
      setIsOpen(false);
    }
  };

  const onClickShowAutomatizaciones = (ev) => {
    if (isPlainClick(ev)) {
      setAutomatizaciones(!automatizacionesActive);
      setIsOpen(false);
    }
  };

  const onClickShowTeletipo = (ev) => {
    if (isPlainClick(ev)) {
      setShowTeletipo(!showTeletipo);
      setIsOpen(false);
    }
  };
  const onClickShowCoords = (ev) => {
    if (isPlainClick(ev)) {
      setShowCoords(!showCoords);
      setIsOpen(false);
    }
  };
  const onClickShowConfig = (ev) => {
    if (isPlainClick(ev)) {
      setShowConfig(!showConfig);
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
                onClick={onClickShowAutomatizaciones}
                active={automatizacionesActive}
              >
                Automatizaciones
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

export default function Menu() {
  const { sectores, loading, load } = useSectores();
  if (loading !== 'loaded') {
    load();
    return <img alt="loading..." src={loadingIcon} />;
  }
  return <ActualMenu sectores={sectores} />;
}
