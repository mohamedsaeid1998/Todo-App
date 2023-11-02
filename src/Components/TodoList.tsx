import { Todo } from '@/Lib/Types';
import React from 'react'
import './style.scss'
import { SingleTodo } from '.';
import { Droppable } from 'react-beautiful-dnd';

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  CompletedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({ todos, setTodos, CompletedTodos, setCompletedTodos }: Props) => {
  return <>
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragActive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {todos?.map((todo, index) =><ul key={todo.id}>
                <SingleTodo {...{index,todos,todo,setTodos}} />
              </ul>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`todos  ${snapshot.isDraggingOver ? "dragComplete" : "remove"
              }`}
          >
            <span className="todos__heading">Completed Tasks</span>
            {CompletedTodos?.map((todo, index) => <ul key={todo.id} >
              <SingleTodo {...{index,todo} }  todos={CompletedTodos} setTodos={setCompletedTodos}/>
            </ul>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

    </div>
  </>
}

export default TodoList