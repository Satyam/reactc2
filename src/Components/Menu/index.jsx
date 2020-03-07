import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch, Link } from 'react-router-dom';

import {
  showTeletipo as showTeletipoAction,
  enclavamientosActive,
} from 'Store/actions';
import {
  selSectores,
  selSector,
  selShowTeletipo,
  selEnclavamientosActive,
} from 'Store/selectors';
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
  NavbarText,
} from 'reactstrap';

import { GitHub } from 'Components/Icons';

export default function MenuComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const match = useRouteMatch('/sector/:idSector');

  const sectores = useSelector(selSectores);
  const sector = useSelector(
    state => match && selSector(state, match.params.idSector)
  );
  const isEnclavamientoActive = useSelector(selEnclavamientosActive);
  const showTeletipo = useSelector(selShowTeletipo);

  const dispatch = useDispatch();

  const toggleOpen = () => setIsOpen(!isOpen);
  const toggleTeletipo = () => dispatch(showTeletipoAction(!showTeletipo));
  const toggleEnclavamientos = () =>
    dispatch(enclavamientosActive(!isEnclavamientoActive));

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand color="default" href="/">
          CTC
        </NavbarBrand>
        {sector && <NavbarText>[{sector.descrCorta}]</NavbarText>}
        <NavbarToggler onClick={toggleOpen} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Sectores
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={Link} to="/adminSectores/">
                  Admin. Sectores
                </DropdownItem>
                <DropdownItem divider />
                {sectores.map(sector => (
                  <DropdownItem
                    tag={Link}
                    to={`/sector/${sector.idSector}`}
                    key={sector.idSector}
                    title={sector.descr}
                    active={match && match.params.idSector === sector.idSector}
                  >
                    {sector.descrCorta}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
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
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink href="https://github.com/Satyam/reactc2">
                <GitHub /> Github
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
