import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch, Link } from 'react-router-dom';
import './styles.module.css';

import {
  useSectores,
  useSector,
  useShowTeletipo,
  useEnclavamientosActive,
  useShowCoords,
  useShowConfig,
} from 'Store';

import { hideEstado as hideEstadoAction } from 'Store/actions';

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

import { GitHub } from 'Components/Icons';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const match = useRouteMatch('/sector/:idSector');

  const sectores = useSectores();
  const sector = useSector(match && match.params.idSector);
  const [
    enclavamientosActive,
    toggleEnclavamientos,
  ] = useEnclavamientosActive();
  const [showTeletipo, toggleTeletipo] = useShowTeletipo();
  const [showCoords, toggleShowCoords] = useShowCoords();
  const [showConfig, toggleShowConfig] = useShowConfig();
  const dispatch = useDispatch();

  const hideEstado = idSector => () => {
    if (sector && sector.idSector !== idSector) dispatch(hideEstadoAction());
  };
  const toggleOpen = () => setIsOpen(!isOpen);

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
                <DropdownItem tag={Link} to="/adminSectores/">
                  Admin. Sectores
                </DropdownItem>
                <DropdownItem divider />
                {sectores.map(sect => (
                  <DropdownItem
                    tag={Link}
                    to={`/sector/${sect.idSector}`}
                    key={sect.idSector}
                    title={sect.descr}
                    active={sector && sector.idSector === sect.idSector}
                    onClick={hideEstado(sect.idSector)}
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
