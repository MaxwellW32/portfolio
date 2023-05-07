import { useEffect } from "react";
import { createContext, useState } from "react";

export interface todoInterface {
  toDoId: string,
  toDoDateCreated: [string, string],
  toDoTitle: string,
  toDoMessages: {
    uniqueMsgId: string,
    msgText: string
  }[],
  toDoVideos: {
    uniqueId: string,
    vidUrl: string
  }[],
}

export const initialToDoState : todoInterface = {
  toDoId: "",
  toDoDateCreated: ["",""],
  toDoTitle: "",
  toDoMessages: [],
  toDoVideos: [],
};

interface ToDoContextValue {
  todos: todoInterface[];
  manageTodos: (instruction: string, payload: any) => void;
}

export const ToDoInfoContext = createContext<ToDoContextValue>({
  todos: [],
  manageTodos: () => {},
});











interface MyComponentProps {
  children: React.ReactNode,
};

//this is a function
const ToDoContext: React.FC<MyComponentProps> = ({ children }) => {

  const [allToDos, setAllToDos] = useState<todoInterface[]>([]);
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


  function manageAllTodos(instruction:string, payload:any) {
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

          payload.forEach((PLToDoId:string) => {
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
    <ToDoInfoContext.Provider value={{todos: allToDos, manageTodos: manageAllTodos}}>
      {children}
    </ToDoInfoContext.Provider>
  );
}

export default ToDoContext;
