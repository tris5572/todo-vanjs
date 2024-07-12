import van from 'vanjs-core';

export type Item = {
  title: string;
  done: boolean;
};

/**
 * アプリ全体の状態を管理するクラス。
 *
 * export されている `appState` により使用する。
 */
class AppState {
  #items: Item[] = [];

  constructor() {}

  // オブジェクトを複製する
  clone(): AppState {
    const app = new AppState();
    app.#items = this.#items;

    return app;
  }

  /**
   * アイテムを追加する
   * @param title 追加するアイテムのタイトル
   */
  add(title: string): AppState {
    const app = this.clone();
    app.#items = [...this.#items, { title, done: false }];
    return app;
    // this.#items.push({ title, done: false });
    // this.#items = [...this.#items, { title, done: false }];
    // return new AppState(this.#items);
  }

  /**
   * 全アイテムを返す
   */
  items(): Item[] {
    return this.#items;
  }

  lastTitle(): string {
    if (this.#items.length === 0) {
      return 'null';
    }
    return this.#items[this.#items.length - 1].title;
  }
}

export const appState = van.state(new AppState());
