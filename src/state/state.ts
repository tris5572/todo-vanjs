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
 * 状態変更系のメソッドは、`appState.val = this.clone(...)` のようにして、
 * `appState` を新オブジェクトで更新して画面表示に反映させる。
 */
class AppState {
  #items: Item[] = [];

  constructor() {}

  // オブジェクトを複製する
  clone(props?: { items?: Item[] }): AppState {
    const app = new AppState();
    app.#items = props?.items ?? this.#items;

    return app;
  }

  /**
   * アイテムを追加する
   * @param title 追加するアイテムのタイトル
   */
  add(title: string) {
    const app = this.clone();
    app.#items = [
      ...this.#items,
      { title, done: false, key: `${Date.now()}-${this.#items.length}` },
    ];
    appState.val = app;
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
  changeDone(key: string, done: boolean) {
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
      appState.val = this.clone({ items: newArray });
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
