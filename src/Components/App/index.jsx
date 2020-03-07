import React from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Teletipo from 'Components/Teletipo';
import Mimico from 'Components/Mimico';
import Menu from 'Components/Menu';

import { selShowTeletipo } from 'Store/selectors';
// import Errors from 'Components/Errors';

// import styles from './styles.module.css';

export default function App({ username = '', sector, photoURL }) {
  const showTeletipo = useSelector(selShowTeletipo);
  return (
    <Router
      basename={process.env.NODE_ENV === 'production' ? '/CTC' : undefined}
    >
      <Helmet titleTemplate="CTC - %s" />
      <Menu />
      <Route path="/sector/:idSector">
        <Mimico idSector="constitucion" />
      </Route>
      {showTeletipo && <Teletipo />}
    </Router>
  );
}
