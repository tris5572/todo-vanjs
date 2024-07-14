import van from 'vanjs-core';
import { appState } from '../state/state';

const { div, input } = van.tags;

export function InputView() {
  const text = van.state('');

  const inputDom = input({
    type: 'text',
    value: text,
    id: 'input-field',
    oninput: (e: Event) => (text.val = (<HTMLInputElement>e.target).value),
    // 値確定時にデータに追加し、テキストフィールドを空にする。
    onchange: (e: Event) => {
      appState.val.add((<HTMLInputElement>e.target).value);
      text.val = '';
    },
  });
  return div(inputDom);
}
