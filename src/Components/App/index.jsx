import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { EstadoProvider } from 'Components/Estado';
import Teletipo from 'Components/Teletipo';
import Mimico from 'Components/Mimico';
import Menu from 'Components/Menu';

import loading from 'Components/Icons/loading.gif';

import { selShowTeletipo, selSectores } from 'Store/selectors';
import { loadData } from 'Store/actions';
// import Errors from 'Components/Errors';

// import styles from './styles.module.css';

export default function App({ username = '', sector, photoURL }) {
  const showTeletipo = useSelector(selShowTeletipo);
  const sectores = useSelector(selSectores);
  const dispatch = useDispatch();
  if (!sectores.length) {
    dispatch(loadData());
    return <img alt="loading..." src={loading} />;
  }
  return (
    <Router
      basename={process.env.NODE_ENV === 'production' ? '/CTC' : undefined}
    >
      {' '}
      <EstadoProvider>
        <Helmet titleTemplate="CTC - %s" />
        <Menu />
        <Route path="/sector/:idSector">
          <Mimico idSector="constitucion" />
        </Route>
        {showTeletipo && <Teletipo />}
      </EstadoProvider>
    </Router>
  );
}
