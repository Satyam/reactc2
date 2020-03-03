import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';


import Teletipo from 'Components/Teletipo';
import Mimico from 'Components/Mimico';
// import Menu from 'Components/Menu';
// import Errors from 'Components/Errors';

import styles from './styles.module.css';

export default function App({ username = '', sector, photoURL }) {
  // const [teletipoOpen, setTeletipoOpen] = useState(false);
  // const [menuOpen, setMenuOpen] = useState(false);

  // const onToggleTeletipoHandler = () => setTeletipoOpen(open => !open);
  // const onToggleMenuHandler = () => setMenuOpen(open => !open);

  // const descr = sector && sector.descr;
  // const title = descr ? `CTC - ${descr}` : 'CTC';
  return (
    <div>
      <Helmet titleTemplate="CTC - %s" />
      <Mimico idSector="constiticion" />
      <Teletipo />
    </div>
  );
}

App.propTypes = {
  sector: PropTypes.shape({
    descr: PropTypes.string,
  }),
  username: PropTypes.string,
  photoURL: PropTypes.string,
};

