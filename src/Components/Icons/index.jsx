import React from 'react';
import styles from './styles.module.css';

export function CambioNormal() {
  return (
    <svg viewBox="0 0 32 32" className={styles.svg}>
      <path d="M 16 16 L 32 0" className={styles.alt} />
      <path d="M 16 0 V 16 32" className={styles.main} />
    </svg>
  );
}
export function CambioDesviado() {
  return (
    <svg viewBox="0 0 32 32" className={styles.svg}>
      <path d="M 16 0 V 16 16" className={styles.alt} />
      <path d="M 16 32 V 16 16 L 32 0" className={styles.main} />
    </svg>
  );
}

export function TripleIzq() {
  return (
    <svg viewBox="0 0 32 32" className={styles.svg}>
      <path d="M 16 16 V 16 0" className={styles.alt} />
      <path d="M 16 16 L 32 0" className={styles.alt} />
      <path d="M 16 32 V 16 16 L 0 0" className={styles.main} />
    </svg>
  );
}

export function TripleNormal() {
  return (
    <svg viewBox="0 0 32 32" className={styles.svg}>
      <path d="M 16 16 L 32 0" className={styles.alt} />
      <path d="M 16 16 L 0 0" className={styles.alt} />
      <path d="M 16 32 V 16 0" className={styles.main} />
    </svg>
  );
}

export function TripleDer() {
  return (
    <svg viewBox="0 0 32 32" className={styles.svg}>
      <path d="M 16 16 V 16 0" className={styles.alt} />
      <path d="M 16 16 L 0 0" className={styles.alt} />
      <path d="M 16 32 V 16 16 L 32 0" className={styles.main} />
    </svg>
  );
}

export { FaLock as Locked, FaLockOpen as Unlocked } from 'react-icons/fa';
export { GiPlainCircle as Circle } from 'react-icons/gi';
export { GoMarkGithub as GitHub } from 'react-icons/go';
export { MdTrain as Train } from 'react-icons/md';
export { GoPlay as Play } from 'react-icons/go';
export { GoTrashcan as Trash } from 'react-icons/go';
