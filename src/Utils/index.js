import { useState, useEffect, useCallback, useRef } from 'react';

export function useLongPress({
  onClick = () => {},
  onLongPress = () => {},
  ms = 300,
} = {}) {
  const [startLongPress, setStartLongPress] = useState(false);
  const timer = useRef(false);

  const callback = useCallback(() => {
    onLongPress();
    timer.current = false;
  }, [onLongPress]);

  useEffect(() => {
    if (startLongPress) {
      timer.current = setTimeout(callback, ms);
    } else {
      if (timer.current) onClick();
      timer.current = false;
    }
    return () => {
      clearTimeout(timer.current);
    };
  }, [onClick, onLongPress, ms, startLongPress, callback]);

  const start = useCallback(() => {
    setStartLongPress(true);
  }, []);
  const stop = useCallback(() => {
    setStartLongPress(false);
  }, []);

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
  };
}

/* Usage:

https://stackoverflow.com/questions/48048957/react-long-press-event

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
