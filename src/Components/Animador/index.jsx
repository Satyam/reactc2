import React, { useEffect, useState } from 'react';
import { useMoveTrenes, usePlayRate } from 'Store';
import { Button, ButtonGroup } from 'reactstrap';
import styles from './styles.module.css';

export default function Animador() {
  const moveTrenes = useMoveTrenes();
  const [playRate, setPlayRate] = usePlayRate();

  const [timer, setTimer] = useState();

  useEffect(() => {
    if (playRate && !timer) {
      setTimer(setInterval(moveTrenes, 1000 / playRate));
    }

    return () => {
      if (timer) {
        clearInterval(timer);
        setTimer(0);
      }
    };
  }, [moveTrenes, timer, playRate]);

  return (
    <ButtonGroup title="Velocidad (ciclos por segundo)" className={styles.rate}>
      <Button
        outline={playRate !== 0}
        color={playRate ? 'secondary' : 'danger'}
        onClick={() => setPlayRate(0)}
      >
        0
      </Button>
      <Button outline={playRate !== 0.5} onClick={() => setPlayRate(0.5)}>
        ½
      </Button>
      <Button outline={playRate !== 1} onClick={() => setPlayRate(1)}>
        1
      </Button>
      <Button outline={playRate !== 2} onClick={() => setPlayRate(2)}>
        2
      </Button>
      <Button outline={playRate !== 5} onClick={() => setPlayRate(5)}>
        5
      </Button>
    </ButtonGroup>
  );
}
