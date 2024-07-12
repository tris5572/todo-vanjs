import van from 'vanjs-core';
import { Counter } from './Counter';
import './style.css';
import { InputView } from './components/InputView';

const { div } = van.tags;

function Main() {
  return div({ id: 'app-wrapper' }, InputView(), Counter());
}

van.add(document.body, Main());
