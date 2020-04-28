import createSetOptionAdapter from 'Utils/createSetOptionAdapter';

export const playRate = createSetOptionAdapter('playRate', 1);
export const currentSector = createSetOptionAdapter('currIdSector');
export const showConfig = createSetOptionAdapter('showConfig', false);
export const showCoords = createSetOptionAdapter('showCoords', true);
export const automatizacionesActive = createSetOptionAdapter(
  'automatizacionesActive',
  true
);
export const showTeletipo = createSetOptionAdapter('showTeletipo', true);
