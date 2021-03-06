import { useState, useEffect, useCallback, useRef, useMemo } from 'react';

/* Usage:

https://stackoverflow.com/questions/48048957/react-long-press-eventRef

function MyComponent (props) {
  const longPressProps = useLongPress({
    onClick: () => void console.log('on click'),
    onLongPress: () => void console.log('long press'),
  });


  return (
      <button {...longPressProps} >
        click me
      </button>  );
};
*/

export function useLongPress({ onClick, onLongPress, ms = 300 } = {}) {
  const timerRef = useRef(false);
  const eventRef = useRef({});

  const callback = useCallback(() => {
    if (typeof onLongPress === 'function') {
      onLongPress(eventRef.current);
    }
    eventRef.current = {};
    timerRef.current = false;
  }, [onLongPress]);

  const start = useCallback(
    (ev) => {
      if (isPlainClick(ev)) {
        ev.persist();
        eventRef.current = ev;
        timerRef.current = setTimeout(callback, ms);
      }
    },
    [callback, ms]
  );

  const stop = useCallback(
    (ev) => {
      if (isPlainClick(ev)) {
        ev.persist();
        eventRef.current = ev;
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          if (typeof onClick === 'function') {
            onClick(ev);
          }
          timerRef.current = false;
          eventRef.current = {};
        }
      }
    },
    [onClick]
  );

  return useMemo(
    () => ({
      onMouseDown: start,
      onMouseUp: stop,
      onMouseLeave: stop,
      onTouchStart: start,
      onTouchEnd: stop,
    }),
    [start, stop]
  );
}

const stopProp = (ev) => ev.stopPropagation();

export const holdPropagation = {
  onMouseDown: stopProp,
  onMouseUp: stopProp,
  onMouseLeave: stopProp,
  onTouchStart: stopProp,
  onTouchEnd: stopProp,
};

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

export function nombreEntity(entity) {
  return (
    entity.nombre ||
    `[${entity.x},${entity.y}]` + (entity.dir ? `-${entity.dir}` : '')
  );
}
