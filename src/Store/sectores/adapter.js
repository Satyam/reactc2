import { createEntityAdapter } from '@reduxjs/toolkit';

export default createEntityAdapter({
  selectId: (sector) => sector.idSector,
  sortComparer: (sa, sb) => {
    var descrA = sa.descrCorta.toUpperCase();
    var descrB = sb.descrCorta.toUpperCase();
    if (descrA < descrB) return -1;
    if (descrA > descrB) return 1;
    return 0;
  },
});
