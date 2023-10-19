import { useState } from "react";

export default function App() {
  let [item, setItem] = useState([]);

  function handleAddItems(item) {
    setItem((items) => [...items, item]);
  }
  function handleTaskDone(id) {
    setItem((items) =>
      items.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  }
  function handleDeleteItems(id) {
    setItem((items) => items.filter((item) => item.id !== id));
  }
  function onClear() {
    setItem([]);
  }
  return (
    <div>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <Packinglist
        items={item}
        onDoneTask={handleTaskDone}
        onDeleteItem={handleDeleteItems}
        onClear={onClear}
      />
      <Stats item={item} />
    </div>
  );
}
function Logo() {
  return (
    <div>
      <h1>📃 TO DO LIST</h1>
    </div>
  );
}
function Form({ onAddItems }) {
  let [description, setDescription] = useState("");

  function handleEvent(e) {
    e.preventDefault();

    if (!description) return;

    let newItem = { description, done: false, id: Date.now() };
    onAddItems(newItem);
  }

  return (
    <div className="add-form">
      <h3>Enter your tasks here</h3>
      <form onSubmit={handleEvent}>
        <input
          type="text"
          placeholder="item.."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <button>Add</button>
      </form>
    </div>
  );
}
function Packinglist({ items, onDoneTask, onDeleteItem, onClear }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            obj={item}
            onDeleteItem={onDeleteItem}
            onDoneTask={onDoneTask}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <button onClick={onClear}>Clear Tasks</button>
      </div>
    </div>
  );
}
function Item({ obj, onDoneTask, onDeleteItem, obj1 }) {
  return (
    <li style={obj.done ? { textDecoration: "line-Through" } : {}}>
      <input
        type="checkbox"
        value={obj.done}
        onChange={() => onDoneTask(obj.id)}
      ></input>
      <span></span>
      {obj.description}
      <button onClick={() => onDeleteItem(obj.id)}>❌</button>
    </li>
  );
}

function Stats({ item }) {
  let numTasks = item.length;
  let doneTasks = item.filter((item) => item.done).length;
  let percentage = Math.round((doneTasks / numTasks) * 100);

  if (!numTasks) return <p className="stats">Your task list is empty.</p>;

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "congratulations you are done with your tasks"
          : `you have ${numTasks} tasks on your list, and you already done ${doneTasks} of your tasks`}
      </em>
    </footer>
  );
}
