import van from 'vanjs-core';

export type Item = {
  title: string;
  done: boolean;
  key: string;
};

/**
 * アプリ全体の状態を管理するクラス。
 *
 * export されている `appState` により使用する。
 *
 * 状態変更系のメソッドは、変更後の AppState オブジェクトを返す。
 * 変更を反映するためには呼出し側で `appState.val = appState.val.change~~(value)` のようにする必要がある。
 */
class AppState {
  #items: Item[] = [];

  constructor() {}

  // オブジェクトを複製する
  clone(props?: { items?: Item[] }): AppState {
    const app = new AppState();
    // app.#items = this.#items;

    // if (props){
    //   if (props.items){
    //     app.#items = props.items;
    //   }
    // }
    app.#items = props?.items ?? this.#items;

    return app;
  }

  /**
   * アイテムを追加する
   * @param title 追加するアイテムのタイトル
   */
  add(title: string): AppState {
    const app = this.clone();
    app.#items = [
      ...this.#items,
      { title, done: false, key: `${Date.now()}-${this.#items.length}` },
    ];
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

  /**
   * 各TODOアイテムの完了状態を変更する。
   * @param key アイテムのキー
   * @param done 変更する完了状態
   * @returns アプリケーションステート
   */
  changeDone(key: string, done: boolean): AppState {
    const target = this.#items.find((v) => v.key === key);

    if (target) {
      target.done = done;
      const newArray = [];
      for (const v of this.#items) {
        if (v === target) {
          newArray.push({ ...v, done });
        } else {
          newArray.push(v);
        }
      }
      return this.clone({ items: newArray });
    } else {
      return this;
    }
  }

  lastTitle(): string {
    if (this.#items.length === 0) {
      return 'null';
    }
    return this.#items[this.#items.length - 1].title;
  }
}

export const appState = van.state(new AppState());
