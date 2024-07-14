import van from 'vanjs-core';
import { appState, Item } from '../state/state';

const { div, input, label } = van.tags;

export function ListView() {
  return (() => ItemList(appState.val.items()))();
}

/**
 * TODOアイテムの一覧を生成
 */
function ItemList(items: Item[]) {
  const list = [];
  for (const v of items) {
    const state = v.done ? 'done' : 'active';
    if (appState.val.filter() === 'all' || appState.val.filter() === state) {
      list.push(
        div(
          { class: () => `todo-item ${v.done ? 'done' : 'active'}` },
          input({
            type: 'checkbox',
            checked: () => v.done,
            id: v.key,
            onchange: () => appState.val.changeDone(v.key, !v.done),
          }),
          label({ for: v.key }, v.title)
        )
      );
    }
  }
  return div({ id: 'todo-list-view' }, list);
}
