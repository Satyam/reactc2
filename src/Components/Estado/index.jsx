import React, {
  useState,
  useContext,
  createContext,
  useCallback,
  // useMemo,
} from 'react';

import { Popover } from 'reactstrap';
import isPlainClick from 'Utils/isPlainClick';
import sanitize from 'Utils/sanitize';

import Cambio from './Cambio';
import Triple from './Triple';
import Senal from './Senal';
import ShowJson from './ShowJson';

import { CAMBIO, TRIPLE, SENAL } from 'Store/data';
export const EstadoContext = createContext();

function Content({ tipo, showJson, ...props }) {
  if (showJson) {
    return <ShowJson {...props} />;
  } else {
    switch (tipo) {
      case CAMBIO:
        return <Cambio {...props} />;
      case TRIPLE:
        return <Triple {...props} />;
      case SENAL:
        return <Senal {...props} />;
      default:
        return null;
    }
  }
}

export function EstadoProvider({ children }) {
  const [
    { show, idCelda, placement, tipo, idSenal, showJson },
    setProps,
  ] = useState({
    show: false,
  });
  const onClose = ev => isPlainClick(ev) && setProps({ show: false });

  // See:  https://github.com/reactstrap/reactstrap/issues/1404#issuecomment-538537763
  const ctx = useCallback(
    props => {
      if (!props.tipo) {
        setProps({ show: false });
        return;
      }
      const setThem = () =>
        setProps({
          ...props,
          show: true,
        });

      if (show) {
        setProps({});
        setTimeout(() => setThem(), 1);
      } else {
        setThem();
      }
    },
    [setProps, show]
  );
  return (
    <EstadoContext.Provider value={ctx}>
      {children}
      {show && (
        <Popover isOpen={show} target={sanitize(idCelda)} placement={placement}>
          <Content
            {...{
              tipo,
              idCelda,
              idSenal,
              onClose,
              showJson,
            }}
          />
        </Popover>
      )}
    </EstadoContext.Provider>
  );
}

export function useEstado() {
  return useContext(EstadoContext);
}
