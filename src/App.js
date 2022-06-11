import logo from './logo.svg';
import './App.css';
import { DataStore } from '@aws-amplify/datastore';
import { Todo } from './models';

function App() {
  async function deleteItem() {
    const modelToDelete = await DataStore.query(
      Todo, "b2ee1664-d7df-4108-be43-b74c5442cde3"
    );
    DataStore.delete(modelToDelete);
  }
  async function update() {
    const original = await DataStore.query(
      Todo, "b2ee1664-d7df-4108-be43-b74c5442cde3"
    );

    await DataStore.save(
      Todo.copyOf(original, item => {
        item.name = 'title ' + Date.now().toString();
      }));
  }
  async function showTodos() {
    const models = await DataStore.query(Todo);
    console.log(models);
  }
  async function addTodo() {
    await DataStore.save(
      new Todo({
        "name": "Lorem ipsum dolor sit amet",
        "description": "Lorem ipsum dolor sit amet"
      })
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={addTodo}>Add</button>
        <button onClick={showTodos}>Show Todos</button>
        <button onClick={update}>Update</button>
        <button onClick={deleteItem}>Delete</button>
      </header>
    </div>
  );
}

export default App;
