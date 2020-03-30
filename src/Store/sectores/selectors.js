import { createSelector } from '@reduxjs/toolkit';

export const selSectores = createSelector(
  state => state.sectores,
  sectores =>
    Object.values(sectores)
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
      })
);
export const selSector = (state, idSector) => state.sectores[idSector];
