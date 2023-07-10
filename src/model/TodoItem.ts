interface item {
  id: string;
  item: string;
  checked: boolean;
}

export default class TodoItem implements item {
  constructor(
    private _id: string = '',
    private _item: string = '',
    private _checked: boolean = false
  ) {}

  get id() {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get item() {
    return this._item;
  }

  set item(value: string) {
    this._item = value;
  }

  get checked() {
    return this._checked;
  }

  set checked(value: boolean) {
    this._checked = value;
  }
}

