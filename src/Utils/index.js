import { useState, useEffect } from 'react';

export const isPlainClick = (ev) => {
  if (ev.button || ev.shiftKey || ev.altKey || ev.metaKey || ev.ctrlKey)
    return false;
  ev.stopPropagation();
  ev.preventDefault();
  return true;
};

// Ids should be valid DOM id attributes.
// Ids starting with a digit are prefixed with an underscore
export const buildId = ({ idSector, x, y, dir }) =>
  (dir ? [idSector, x, y, dir].join('_') : [idSector, x, y].join('_'))
    .replace(/\W/g, '_')
    .replace(/(^\d)/, '_$1');

export const buildIdBloque = (idSector, bloque) =>
  `${idSector}__${bloque}`.replace(/\W/g, '_').replace(/(^\d)/, '_$1');

export function useResize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () =>
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return size;
}
