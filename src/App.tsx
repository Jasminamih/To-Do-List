import React, { useContext, useState } from "react";
import "./App.css";
import Tasks from "./components/Tasks";
import { Context } from "./components/ThemeContext";
import ReactSwitch from "react-switch";

export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}

const App: React.FC = () => {
  const [todosList, setTodosList] = useState<Todo[]>([]);

  const [inputValue, setInputValue] = useState<string>("");
  const [editingItem, setEditingItem] = useState<Todo>();
  const { updateTheme } = useContext(Context);
  const { theme } = useContext(Context);

  const handleComplete = (id: number) => {
    const newList = todosList.map((todo) => {
      if (todo.id === id) {
        return {
          id: todo.id,
          title: todo.title,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });

    setTodosList(newList);
  };

  const handleRemove = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    id: number
  ) => {
    event.stopPropagation();
    const newList = todosList.filter((todo) => todo.id !== id);
    alert("Are you sure you want to delete this task");

    setTodosList(newList);
  };

  const onClick = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.stopPropagation();

    if (inputValue !== "") {
      setTodosList([
        { id: new Date().valueOf(), title: inputValue, isCompleted: false },
        ...todosList,
      ]);
    }
    setInputValue("");
  };

  const handleEdit = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    id: number
  ) => {
    event.stopPropagation();
    const obj = todosList.find((todo) => todo.id === id);
    if (obj) {
      setEditingItem(obj);
      setInputValue(obj.title);
    }
  };

  const handleAdd = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // if you are not editing - add new item
    if (event.key === "Enter" && inputValue !== "") {
      // sum kliknal na enter, dodaj todo vo lista
      if (editingItem) {
        // edit item here
        const newList = todosList.map((todo) => {
          if (todo.id === editingItem.id) {
            return {
              // id: 1,
              id: todo.id,
              title: inputValue,
              isCompleted: todo.isCompleted,
            };
          }
          return todo;
        });
        setTodosList(newList);
        setEditingItem(undefined);
      } else {
        setTodosList([
          { id: new Date().valueOf(), title: inputValue, isCompleted: false },
          ...todosList,
        ]);
      }
      setInputValue("");
    }
  };

  return (
    <div
      style={{
        color:
          theme.label === "light" ? "rgb(43, 71, 71)" : "rgb(255, 255, 255)",
        backgroundColor:
          theme.label === "light" ? "rgb(255, 255, 255)" : "rgb(43, 71, 71)",
      }}
    >
      <div id="container">
        <div
          className="header"
          style={{
            color:
              theme.label === "dark" ? "rgb(43, 71, 71)" : "rgb(255, 255, 255)",
            backgroundColor:
              theme.label === "dark" ? "rgb(255, 255, 255)" : "rgb(43, 71, 71)",
          }}
        >
          <h1>To-Do List</h1>
          {
            <ReactSwitch
              onChange={() => updateTheme()}
              checked={theme.label === "light"}
              className="switch"
            />
          }
        </div>
        <div className="add">
          <input
            style={{
              color:
                theme.label === "light"
                  ? "rgb(43, 71, 71)"
                  : "rgb(255, 255, 255)",
              backgroundColor:
                theme.label === "light"
                  ? "rgb(255, 255, 255)"
                  : "rgb(43, 71, 71)",
            }}
            type="text"
            placeholder="Add New Todo"
            id="nekoeId"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setInputValue(event.target.value);
            }}
            onKeyUp={handleAdd}
            value={inputValue}
          />
          <button
            onClick={onClick}
            style={{
              color:
                theme.label === "dark"
                  ? "rgb(43, 71, 71)"
                  : "rgb(255, 255, 255)",
              backgroundColor:
                theme.label === "dark"
                  ? "rgb(255, 255, 255)"
                  : "rgb(43, 71, 71)",
            }}
          >
            Add
          </button>
        </div>
        <ul>
          {todosList.map((todo) => {
            return (
              <Tasks
                key={todo.id}
                todo={todo}
                handleComplete={handleComplete}
                handleEdit={handleEdit}
                handleRemove={handleRemove}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default App;
