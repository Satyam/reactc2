import { N, NE, E, SE, S, SW, W, NW } from 'Store/data';

export const isPlainClick = ev => {
  if (ev.button || ev.shiftKey || ev.altKey || ev.metaKey || ev.ctrlKey)
    return false;
  ev.stopPropagation();
  ev.preventDefault();
  return true;
};

export const buildId = ({ idSector, x, y, dir }) =>
  (dir
    ? [undefined, idSector, x, y, dir].join('_')
    : [undefined, idSector, x, y].join('_')
  ).replace(/\W/g, '_');

export function nextCoords(x, y, dir) {
  switch (dir) {
    case N:
      return [x, y - 1, S];
    case NE:
      return [x + 1, y - 1, SW];
    case E:
      return [x + 1, y, W];
    case SE:
      return [x + 1, y + 1, NW];
    case S:
      return [x, y + 1, N];
    case SW:
      return [x - 1, y + 1, NE];
    case W:
      return [x - 1, y, E];
    case NW:
      return [x - 1, y - 1, SE];
    default:
  }
}
