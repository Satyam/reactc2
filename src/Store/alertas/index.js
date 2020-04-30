import { createSlice } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { playRate } from 'Store/options';
import { DANGER } from 'Store/data';

const NAME = 'alertas';
const slice = createSlice({
  name: NAME,
  reducers: {
    doSetAlarma: (state, action) => {
      state.alarma = action.payload;
    },
    clearAlarma: (state) => {
      state.alarma = {};
    },
    setAviso: {
      reducer: (state, action) => {
        state.avisos.unshift(action.payload);
      },
      prepare: (nivel, idCelda, numero, msg) => ({
        payload: {
          nivel,
          idCelda,
          numero,
          msg,
          fecha: Date.now(),
        },
      }),
    },
    clearAviso: (state, action) => {
      const idx = state.avisos.findIndex((av) => av.fecha === action.payload);
      if (idx !== -1) state.avisos.splice(idx, 1);
    },
    clearAvisos: (state) => {
      state.avisos = [];
    },
  },
  initialState: { alarma: {}, avisos: [] },
});

// Reducer
export default slice;

// Actions
export const { clearAlarma, setAviso, clearAviso, clearAvisos } = slice.actions;

export function setAlarma(idCelda, numero, msg) {
  const { setAviso, doSetAlarma } = slice.actions;
  return (dispatch) => {
    dispatch(setAviso(DANGER, idCelda, numero, msg));
    dispatch(doSetAlarma({ idCelda, numero, msg, fecha: Date.now() }));
    dispatch(playRate.action(0));
  };
}

// Selectors
export const selAlarma = (state) => state[NAME].alarma;
export const selAvisos = (state) => state[NAME].avisos;

// Hooks

export const useSetAlarma = () => {
  const dispatch = useDispatch();
  return (...props) => dispatch(setAlarma(...props));
};

export const useAlarma = () => {
  const dispatch = useDispatch();
  return [useSelector(selAlarma), () => dispatch(clearAlarma())];
};

export const useAvisos = () => {
  const dispatch = useDispatch();
  return [
    useSelector(selAvisos),
    () => dispatch(clearAvisos()),
    (fecha) => dispatch(clearAviso(fecha)),
  ];
};

export const useSetAviso = () => {
  const dispatch = useDispatch();
  return (...props) => dispatch(setAviso(...props));
};
