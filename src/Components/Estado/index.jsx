import React, {
  useState,
  useContext,
  createContext,
  // useCallback,
  // useMemo,
} from 'react';

import { Popover } from 'reactstrap';
import isPlainClick from 'Utils/isPlainClick';

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
  const [props, setProps] = useState({ show: false });
  const onClose = ev => isPlainClick(ev) && setProps({ show: false });

  const ctx = props => {
    setProps({
      ...props,
      show: true,
      onClose,
    });
  };
  const sanitize = id => id.replace(/\W/g, '_');
  return (
    <EstadoContext.Provider value={ctx}>
      {children}
      {props.show && (
        <Popover
          isOpen={props.show}
          target={sanitize(props.idCelda)}
          placement={props.placement}
        >
          <Content
            tipo={props.tipo}
            idCelda={props.idCelda}
            idSenal={props.idSenal}
            onClose={onClose}
          />
        </Popover>
      )}
    </EstadoContext.Provider>
  );
}

export function useEstado() {
  return useContext(EstadoContext);
}
