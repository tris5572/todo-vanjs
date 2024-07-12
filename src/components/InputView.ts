import van from 'vanjs-core';
import { appState } from '../state/state';

const { div, input } = van.tags;

export function InputView() {
  const text = van.state('');

  const inputDom = input({
    type: 'text',
    size: 40,
    value: text,
    id: 'input-field',
    oninput: (e) => (text.val = e.target.value),
    // 値確定時にデータに追加し、テキストフィールドを空にする。
    onchange: (e) => {
      appState.val = appState.val.add(e.target.value);
      text.val = '';
    },
  });
  return div(inputDom);
}
