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
