import { useRef } from 'react';
import './style.scss'

interface Props {
  todo: string,
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void
}

const InputField = ({ todo, setTodo, handleAdd }: Props) => {

  const inputRef = useRef<HTMLInputElement>(null)

  return <>
    <form className="input" onSubmit={(e) => {
      handleAdd(e);
      inputRef.current?.blur()
    }}>
      <input ref={inputRef} type="input" className="input__box" value={todo} onChange={(e) => setTodo(e.target.value)} placeholder="Enter a task" />
      <button type="submit" className="input_submit">Go</button>
    </form>

  </>
}

export default InputField