import { createSelector } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { loadData } from 'Store/actions';

export const selSectores = createSelector(
  state =>
    Object.values(state.sectores)
      .map(({ idSector, descr, descrCorta }) => ({
        idSector,
        descr,
        descrCorta,
      }))
      .sort((sa, sb) => {
        var descrA = sa.descrCorta.toUpperCase();
        var descrB = sb.descrCorta.toUpperCase();
        if (descrA < descrB) return -1;
        if (descrA > descrB) return 1;
        return 0;
      }),
  sectores => sectores
);
export const selSector = (state, idSector) => state.sectores[idSector];

export const useSector = idSector =>
  useSelector(state => selSector(state, idSector));

export const useSectores = () => {
  const sectores = useSelector(selSectores);
  const dispatch = useDispatch();
  if (!sectores.length) dispatch(loadData());
  return sectores;
};
