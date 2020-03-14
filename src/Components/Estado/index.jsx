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

export const EstadoContext = createContext();

function Content({ tipo, ...props }) {
  if (!tipo) return null;
  switch (tipo) {
    case 'cambio':
      return <Cambio {...props} />;
    case 'triple':
      return <Triple {...props} />;
    case 'senal':
      return <Senal {...props} />;
    default:
      return null;
  }
}

export function EstadoProvider({ children }) {
  const [{ show, idCelda, placement, tipo, idSenal }, setProps] = useState({
    show: false,
  });
  const onClose = ev => isPlainClick(ev) && setProps({ show: false });

  // See:  https://github.com/reactstrap/reactstrap/issues/1404#issuecomment-538537763
  const ctx = useCallback(
    props => {
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