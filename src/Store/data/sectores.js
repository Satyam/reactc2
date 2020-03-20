export const CONSTITUCION = 'constitucion';
export const SIMPLE_DESVIO = 'simpleDesvio';
export const CRUCE_DOBLE_CAMBIO = 'cruceDobleCambio';
export const SENALES_ENCADENADAS = 'senalesEncadenadas';

export const sectores = [
  {
    idSector: CONSTITUCION,
    descrCorta: 'Constitución',
    descr: 'Estación Constitución, Ciudad de Buenos Aires, Argentina',
    ancho: 11,
    alto: 7,
  },
  {
    idSector: SIMPLE_DESVIO,
    descrCorta: '1- Desvío Simple',
    descr: 'Una única celda con un cambio y señal',
    ancho: 1,
    alto: 1,
  },
  {
    idSector: CRUCE_DOBLE_CAMBIO,
    descrCorta: '2- Doble cambio de vías',
    descr: 'Vías paralelas con cambios cruzados y señales',
    ancho: 2,
    alto: 2,
  },
  {
    idSector: SENALES_ENCADENADAS,
    descrCorta: '3- Señales encadenadas',
    descr: 'Señal en amarillo cuando la siguiente está en rojo',
    ancho: 4,
    alto: 1,
  },
];
