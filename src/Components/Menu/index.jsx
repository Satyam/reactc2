import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch, Link } from 'react-router-dom';
import './styles.module.css';

import {
  showTeletipo as showTeletipoAction,
  enclavamientosActive,
  showCoords as showCoordsAction,
} from 'Store/actions';
import {
  selSectores,
  selSector,
  selShowTeletipo,
  selEnclavamientosActive,
  selShowCoords,
} from 'Store/selectors';
import { useEstado } from 'Components/Estado';
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

  const sectores = useSelector(selSectores);
  const sector = useSelector(
    state => match && selSector(state, match.params.idSector)
  );
  const isEnclavamientoActive = useSelector(selEnclavamientosActive);
  const showTeletipo = useSelector(selShowTeletipo);
  const showCoords = useSelector(selShowCoords);
  const showEstado = useEstado();
  const dispatch = useDispatch();

  const hideEstado = idSector => () => {
    if (sector && sector.idSector !== idSector) showEstado({});
  };
  const toggleOpen = () => setIsOpen(!isOpen);
  const toggleTeletipo = () => dispatch(showTeletipoAction(!showTeletipo));
  const toggleEnclavamientos = () =>
    dispatch(enclavamientosActive(!isEnclavamientoActive));
  const toggleShowCoords = () => dispatch(showCoordsAction(!showCoords));

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
                  active={isEnclavamientoActive}
                >
                  Enclavamientos
                </DropdownItem>
                <DropdownItem onClick={toggleShowCoords} active={showCoords}>
                  Coordenadas
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
