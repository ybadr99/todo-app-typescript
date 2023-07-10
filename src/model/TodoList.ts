import TodoItem from './TodoItem';

interface List {
  list: TodoItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(item: TodoItem): void;
  removeItem(id: string): void;
}

export default class TodoList implements List {
  static instance: TodoList = new TodoList();

  private constructor(private _list: TodoItem[] = []) {}

  get list(): TodoItem[] {
    return this._list;
  }

  load(): void {
    const storedList: string | null = localStorage.getItem('todos');
    if (typeof storedList !== 'string') return;

    const parsedList: {
      _id: string;
      _item: string;
      _checked: boolean;
    }[] = JSON.parse(storedList);

    parsedList.forEach((item) => {
      const newItem = new TodoItem(item._id, item._item, item._checked);
      TodoList.instance.addItem(newItem);
    });
  }

  save(): void {
    localStorage.setItem('todos', JSON.stringify(this._list));
  }

  clearList(): void {
    this._list = [];
    this.save();
  }

  addItem(item: TodoItem): void {
    this._list.push(item);
    this.save();
  }

  removeItem(id: string): void {
    this._list = this._list.filter((item) => item.id !== id);
    this.save();
  }
}
