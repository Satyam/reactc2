import React from 'react';
import { useSelector, useDispatch } from 'react-redux'

// import isPlainClick from 'Utils/isPlainClick';
// import { closeEstado } from 'Store/actions';

import Cambio from './Cambio';
import Triple from './Triple';
import Senal from './Senal';

export default function Estado() {
  const { tipo, idCelda, idSenal } = useSelector(state => state.estado);
  // const dispatch = useDispatch();

  if (!tipo) return null;
  const Content = { cambio: Cambio, triple: Triple, senal: Senal }[tipo];

  if (!Content) return null;
  // const onClose = ev => isPlainClick(ev) && dispatch(closeEstado());
  return (
    <Content idCelda={idCelda} idSenal={idSenal} />
  );
}
