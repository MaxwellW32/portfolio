import { useEffect } from "react";
import { createContext, useState } from "react";

export const ToDoInfoContext = createContext(null);

export const initialToDoState = {
  toDoId: "",
  toDoDateCreated: [],
  toDoTitle: "",
  toDoMessages: [],
  toDoVideos: [],
};

//to do videos has an object with the uniqueId, and videoId
//messaged has an object with the uniqueMesgId, and message
function ToDoContext({ children }) {
  const [allToDos, setAllToDos] = useState([]);
  const [gotDataFromStorage, setGotDataFromStorage] = useState(false);

  //save todos
  useEffect(() => {
    if (gotDataFromStorage) {
      localStorage.removeItem("todos");
      localStorage.setItem("todos", JSON.stringify(allToDos));
      // console.log(`saving new todos, seen as ${JSON.stringify(allToDos)} `);
    }
  }, [allToDos, gotDataFromStorage]);

  //get from storage
  useEffect(() => {
    const todos = localStorage.getItem("todos");
    if (todos) {
      const todosArray = JSON.parse(todos);
      // console.log(`retreiving todos, exists as ${JSON.stringify(todosArray)}`);
      setAllToDos(todosArray);
    }
    setGotDataFromStorage(true);
  }, []);

  function manageAllTodos(instruction, payload) {
    if (instruction === "add") {
      // console.log(`ran here to add ${JSON.stringify(payload)}`);
      setAllToDos((prevTodos) => {
        return [...prevTodos, payload];
      });
    } else if (instruction === "update") {
      // console.log(`ran update payload is ${JSON.stringify(payload)}`);
      setAllToDos((prevTodos) => {
        return prevTodos.map((eachTodo) => {
          if (eachTodo.toDoId == payload.toDoId) {
            //further logic to update

            return { ...payload };
          } else {
            return { ...eachTodo };
          }
        });
      });
    } else if (instruction === "deleteSelectedToDo") {
      setAllToDos((prevTodos) => {
        return prevTodos.filter((eachTodo) => {
          let foundInArray = false;

          payload.forEach((PLToDoId) => {
            if (eachTodo.toDoId === PLToDoId) {
              foundInArray = true;
            }
          });

          return !foundInArray;
        });
      });
    }
  }

  return (
    <ToDoInfoContext.Provider value={[allToDos, manageAllTodos]}>
      {children}
    </ToDoInfoContext.Provider>
  );
}

export default ToDoContext;
