import { setContext, getContext } from 'svelte';
import type { CandidateTable } from './schema';

class RowState {
  #activeRow = $state<CandidateTable | null>(null);
  open = $state(false);
  delete = $state(false);

  setActiveRow(row: CandidateTable | null) {
    this.#activeRow = row;
  }

  getActiveRow() {
    return this.#activeRow;
  }
}

const CRS_KEY = Symbol('candidateRowState');

export const initCandidateRowState = () => {
  return setContext(CRS_KEY, new RowState());
};

export const useCandidateRowState = () => {
  return getContext<ReturnType<typeof initCandidateRowState>>(CRS_KEY);
};
