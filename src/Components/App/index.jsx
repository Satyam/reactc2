import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Teletipo from 'Components/Teletipo';
import Mimico from 'Components/Mimico';
import Menu from 'Components/Menu';

import { useShowTeletipo } from 'Store';

// import styles from './styles.module.css';

export default function App({ username = '', sector, photoURL }) {
  const [showTeletipo] = useShowTeletipo();

  return (
    <Router
      basename={
        process.env.NODE_ENV === 'production'
          ? process.env.PUBLIC_URL
          : undefined
      }
    >
      <Menu />
      <Route path="/sector/:idSector">
        <Mimico idSector="constitucion" />
      </Route>
      {showTeletipo && <Teletipo />}
    </Router>
  );
}
