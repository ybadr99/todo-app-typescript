import './css/style.css';
import TodoList from './model/TodoList';
import TodoItem from './model/TodoItem';
import ListTemplate from './template/ListTemplate';

const initApp = (): void => {
  const todoList = TodoList.instance;
  const template = ListTemplate.instance;

  // Add listener to new entry form submit
  const form = document.getElementById('itemEntryForm') as HTMLFormElement;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Get the new item value validate
    const input = document.getElementById('newItem') as HTMLInputElement;
    const newValue: string = input.value.trim();
    if (!newValue) return;

    // calculate item ID
    const itemId: number = todoList.list.length
      ? +todoList.list[todoList.list.length - 1].id + 1
      : 1;

    // create new item
    const newItem = new TodoItem(itemId.toString(), newValue);
    // Add new item to full list
    todoList.addItem(newItem);
    // Re-render list with new item included
    template.render(todoList);
  });

  // Add listener to "Clear" button
  const clearButton = document.getElementById(
    'clearItemsButton'
  ) as HTMLButtonElement;

  clearButton.addEventListener('click', () => {
    todoList.clearList();
    template.clear();
  });
  // load initial data
  todoList.load();
  // initial render of template
  template.render(todoList);
};

document.addEventListener('DOMContentLoaded', initApp);
