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

import Content from './Content';

export const EstadoContext = createContext();

export function EstadoProvider({ children }) {
  const [{ show, idCelda, placement, tipo, idSenal }, setProps] = useState({
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
