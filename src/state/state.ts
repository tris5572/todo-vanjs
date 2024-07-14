import van from 'vanjs-core';

export type Item = {
  title: string;
  done: boolean;
  key: string;
};

/**
 * フィルターの種別
 */
export type Filters = 'all' | 'active' | 'done';

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
  #filter: Filters = 'all';

  constructor() {}

  // オブジェクトを複製する
  clone(props?: { items?: Item[]; filter?: Filters }): AppState {
    const app = new AppState();
    app.#items = props?.items ?? this.#items;
    app.#filter = props?.filter ?? this.#filter;

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

  filter(): Filters {
    return this.#filter;
  }

  /**
   * 各TODOアイテムの完了状態を変更する。
   * @param key アイテムのキー
   * @param done 変更する完了状態
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

  /**
   * フィルターを設定する
   */
  setFilter(filter: Filters) {
    appState.val = this.clone({ filter });
  }
}

export const appState = van.state(new AppState());
