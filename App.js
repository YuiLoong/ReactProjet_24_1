import './App.css';
import Header from './component/Header';
import TodoEditor from './component/TodoEditor';
import TodoList from './component/TodoList';
import React, { useRef, useReducer, useCallback, useMemo } from 'react';

export const TodoStateContext = React.createContext();
export const TodoDispatchContext = React.createContext();

const mockTodo = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    createdDate: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "빨래 널기",
    createdDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "노래 연습하기",
    createdDate: new Date().getTime(),
  },
];
function reducer (state, action) {
  switch (action.type) {
    case "CREATE": {
      return [action.newItem, ...state];
    }
    case "UPDATE": {
      return state.map ((it) =>
        it.id === action.targetId
      ? {
        ...it,
        isDone: !it.isDone,
        }
      : it
      );
    }
      case "DELETE": {
        return state.filter((it) => it.id !== action.targetId);
    }
    default:
      return state;
  }
}

function App() {
  const [todo, dispatch] = useReducer(reducer, mockTodo);
  const idRef = useRef(3);

  const onCreate = (content) => {

    // const newItem = {
    //   id: idRef.current,
    //   content,
    //   isDone: false,
    //   createDate: new Date().getTime(),
    // };
    // setTodo([newItem, ...todo]);

    dispatch({
      type: "CREATE",
      newItem: {
        id: idRef.current,
        content,
        isDone: false,
        createdDate: new Date().getTime(),
      },
    });
    idRef.current += 1;
  }
  const onUpdate = useCallback((targetId) => {
    // setTodo(
    //   todo.map((it) => it.id === targetId ? {...it, isDone: !it.isDone } : it)
    // );

    dispatch({
      type: "UPDATE",
      targetId,
    });
  }, []);

  const onDelete = useCallback((targetId) => {
        // setTodo(todo.filter((it)=> it.id!== targetId));
    dispatch({
      type: "DELETE",
      targetId,
    });
  }, []);
 
  const memoizedDispatches = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, []);


  return (
    <div className="App">
      <Header />
      <TodoStateContext.Provider value={todo}>
      <TodoDispatchContext.Provider value={memoizedDispatches}>
      <TodoEditor />
      <TodoList />
      </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;