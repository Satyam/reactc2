import adapter from './adapter';

const selectors = adapter.getSelectors((state) => state.empalmes);

export const selEmpalmes = selectors.selectAll;
export const selEmpalme = selectors.selectById;
