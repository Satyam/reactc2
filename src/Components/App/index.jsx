import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Teletipo from 'Components/Teletipo';
import Mimico from 'Components/Mimico';
import Menu from 'Components/Menu';

import loading from 'Components/Icons/loading.gif';

import { useShowTeletipo, useSectores } from 'Store';
// import Errors from 'Components/Errors';

// import styles from './styles.module.css';

export default function App({ username = '', sector, photoURL }) {
  const [showTeletipo] = useShowTeletipo();
  const sectores = useSectores();
  if (!sectores.length) {
    return <img alt="loading..." src={loading} />;
  }
  return (
    <Router
      basename={process.env.NODE_ENV === 'production' ? '/CTC' : undefined}
    >
      <Menu />
      <Route path="/sector/:idSector">
        <Mimico idSector="constitucion" />
      </Route>
      {showTeletipo && <Teletipo />}
    </Router>
  );
}
