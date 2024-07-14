import van from 'vanjs-core';
import './style.css';
import { InputView } from './components/InputView';
import { ListView } from './components/ListView';
import { FilterView } from './components/FilterView';

const { div } = van.tags;

function Main() {
  return div(
    { id: 'app-wrapper' },
    div(
      { id: 'wrapper' },
      InputView(),
      () => FilterView(),
      () => ListView()
    )
  );
}

van.add(document.body, Main());
