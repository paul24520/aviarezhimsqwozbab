export const TOGGLE_ALL = 'TOGGLE_ALL';
export const TOGGLE_FILTER = 'TOGGLE_FILTER';

export const toggleAll = () => ({
  type: TOGGLE_ALL,
});

export const toggleFilter = (filterId) => ({
  type: TOGGLE_FILTER,
  payload: { filterId: Number(filterId) }
});

