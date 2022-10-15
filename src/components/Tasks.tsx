import React, { useContext } from "react";

import { Todo } from "../App";
import { Context } from "./ThemeContext";

interface Props {
  todo: Todo;
  handleComplete: (id: number) => void;
  handleRemove: (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    id: number
  ) => void;
  handleEdit: (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    id: number
  ) => void;
}

const Tasks = ({ todo, handleComplete, handleRemove, handleEdit }: Props) => {
  const { theme } = useContext(Context);

  return (
    <li
      style={{
        color:
          theme.label === "light" ? "rgb(43, 71, 71)" : "rgb(255, 255, 255)",
        backgroundColor:
          theme.label === "light" ? "rgb(255, 255, 255)" : "rgb(43, 71, 71)",
      }}
      key={todo.id}
      className={`el ${todo.isCompleted ? "completed" : ""} `}
    >
      {todo.title}
      <div>
        <span
          className="trash"
          onClick={() => {
            handleComplete(todo.id);
          }}
        >
          <i className="fas fa-check"></i>{" "}
        </span>
        <span
          className="trash"
          onClick={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
            handleRemove(event, todo.id);
          }}
        >
          <i className="fa fa-trash"></i>
        </span>
        <span
          className="edit"
          onClick={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
            handleEdit(event, todo.id);
          }}
        >
          <i className="fa fa-pen"></i>
        </span>
      </div>
    </li>
  );
};

export default Tasks;
