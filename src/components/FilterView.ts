import van from 'vanjs-core';
import { appState, Filters } from '../state/state';

const { div, input, label } = van.tags;

/**
 * フィルター描画部
 */
export function FilterView() {
  const filters: Filters[] = ['all', 'active', 'done'];
  const array = [];

  for (const f of filters) {
    array.push(
      div(
        input({
          type: 'radio',
          name: 'filter',
          id: f,
          value: f,
          checked: appState.val.filter() === f,
          onchange: () => appState.val.setFilter(f),
        }),
        label({ for: f }, f.toUpperCase())
      )
    );
  }

  return div({ id: 'filter-box' }, array);
}
