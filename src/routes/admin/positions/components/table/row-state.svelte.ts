import { setContext, getContext } from 'svelte';
import type { PositionTable } from './schema';

class RowState {
  #activeRow = $state<PositionTable | null>(null);
  open = $state(false);
  delete = $state(false);

  setActiveRow(row: PositionTable | null) {
    this.#activeRow = row;
  }

  getActiveRow() {
    return this.#activeRow;
  }
}

const PRS_KEY = Symbol('positionRowState');

export const initPositionRowState = () => {
  return setContext(PRS_KEY, new RowState());
};

export const usePositionRowState = () => {
  return getContext<ReturnType<typeof initPositionRowState>>(PRS_KEY);
};
