import TodoList from '../model/TodoList';

interface DOMList {
  ul: HTMLUListElement;
  clear(): void;
  render(todoList: TodoList): void;
}

export default class ListTemplate implements DOMList {
  ul: HTMLUListElement;

  static instance: ListTemplate = new ListTemplate();

  private constructor() {
    this.ul = document.getElementById('listItems') as HTMLUListElement;
  }

  clear(): void {
    this.ul.innerHTML = '';
  }

  render(todoList: TodoList): void {
    //clear
    this.clear();

    todoList.list.forEach((item) => {
      const li = document.createElement('li') as HTMLLIElement;
      li.className = 'item';

      const check = document.createElement('input') as HTMLInputElement;
      check.type = 'checkbox';
      check.id = item.id;
      check.checked = item.checked;
      li.append(check);

      check.addEventListener('change', () => {
        item.checked = !item.checked;
        todoList.save();
      });

      const label = document.createElement('label') as HTMLLabelElement;
      label.htmlFor = item.id;
      label.textContent = item.item;
      li.append(label);

      const button = document.createElement('button') as HTMLButtonElement;
      button.className = 'button';
      li.append(button);

      button.addEventListener('click', () => {
        todoList.removeItem(item.id);
        this.render(todoList);
      });

      this.ul.append(li);
    });
  }
}
