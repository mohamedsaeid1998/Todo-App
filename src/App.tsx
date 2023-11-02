import React, { useState } from 'react'
import { InputField, TodoList } from '@/Components'
import { Todo } from '@/Lib/Types'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState<Todo[]>([])
  const [CompletedTodos, setCompletedTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }])
      setTodo("")
    }
  }


  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = CompletedTodos;
    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };

  return <>
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField {...{ todo, setTodo, handleAdd }} />
        <TodoList {...{ todos, setTodos, CompletedTodos, setCompletedTodos }} />
      </div>
    </DragDropContext>
  </>

}

export default App
