import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Teletipo from 'Components/Teletipo';
import Mimico from 'Components/Mimico';
import Menu from 'Components/Menu';
// import Errors from 'Components/Errors';

// import styles from './styles.module.css';

export default function App({ username = '', sector, photoURL }) {
  const { showTeletipo } = useSelector(state => state.options);
  return (
    <Router>
      <Helmet titleTemplate="CTC - %s" />
      <Menu />
      <Route path="/sector/:idSector">
        <Mimico idSector="constitucion" />
      </Route>
      {showTeletipo && <Teletipo />}
    </Router>
  );
}

App.propTypes = {
  sector: PropTypes.shape({
    descr: PropTypes.string,
  }),
  username: PropTypes.string,
  photoURL: PropTypes.string,
};
