import van from 'vanjs-core';
import { appState, Item } from '../state/state';

const { div, input, label } = van.tags;

export function ListView() {
  // return div(() => div(appState.val.items().map((v) => div(v.title))));
  return div(() => ItemList(appState.val.items()));
}

/**
 * TODOアイテムの一覧を生成
 */
function ItemList(items: Item[]) {
  const list = [];
  for (const v of items) {
    list.push(
      div(
        { class: () => `todo-item ${v.done ? 'done' : 'active'}` },
        input({
          type: 'checkbox',
          checked: () => v.done,
          id: v.key,
          onchange: () => (appState.val = appState.val.changeDone(v.key, !v.done)),
        }),
        label({ for: v.key }, v.title)
      )
    );
  }
  return div(list);
}
