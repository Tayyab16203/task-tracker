import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';


const App = () => {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(false)

  const saveToLS  = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  useEffect(()=>{
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem('todos'))
      setTodos(todos)
    }
  }, [])

  const handleFinished = () =>{
    setShowFinished(!showFinished)
    saveToLS()
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo);
    let newTodos = todos.filter(item=>{
      return item.id !== id;
    })
    setTodos(newTodos);
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item=>{
      return item.id !== id;
    })
    setTodos(newTodos);
    saveToLS()
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS()
  }

  const handleChange = (e) =>{
    setTodo(e.target.value)
  }

  const handleAdd = () =>{
    setTodos([...todos,{id: uuidv4(),todo, isCompleted: false}])
    setTodo('')
    saveToLS()
  }
  
  return (
    <>
    <Navbar/>    
    <div className="md:container mx-auto md:my-5 p-5 bg-black md:rounded-xl min-h-[100vh] md:min-h-[80vh] md:w-1/2 font-sans">
      <h1 className="text-center text-3xl font-bold mb-5 text-white">Task Tracker Application</h1>
      {/* input task */}
      <div className="flex gap-2">
        <input onChange={handleChange} value={todo} type="text" id="input_task" className="w-full py-1 px-3 rounded-lg" placeholder="Enter a task"/>
        {/* task save button */}
        <button onClick={handleAdd} disabled={todo.length<=3} className="text-white bg-blue-900 hover:bg-green-600 disabled:bg-red-600 transition-all rounded-lg px-3 py-1 font-bold">Save</button>
      </div>
      {/* show Finished checkbox */}
      <div className="flex gap-2 mt-5">
        <input onChange={handleFinished} checked={showFinished} type="checkbox" id="show"/>
        <label htmlFor="show" className="text-white font-semibold">Show Finished</label>
      </div>
      <h2 className="text-blue-900 text-2xl font-bold text-center">Your Task</h2>
      <div className="h-[1px] bg-blue-900 md:w-[80%] mx-auto my-2"></div>
      {todos.map(item=>{
        return (
          (showFinished || !item.isCompleted) &&
          <div key={item.id} className="todos">
            <div className="todo flex justify-between items-center mt-5 md:w-[80%] mx-auto">
              {/* Task checkbox and text */}
              <div className="flex gap-3">
                <input name={item.id} type="checkbox" onChange={handleCheckbox} checked={item.isCompleted}/>
                <div className={item.isCompleted ? "line-through text-green-600" : "text-white"}>{item.todo}</div>
              </div>
              {/* buttons edit and delete */}
              <div className="flex gap-2">
                <button onClick={(e)=>{handleEdit(e, item.id)}} className="bg-white p-2 rounded-full hover:bg-blue-600  transition-all text-center"><FaEdit/></button>
                <button onClick={(e)=>{handleDelete(e, item.id)}} className="bg-white p-2 rounded-full hover:bg-red-600 transition-all  text-center"><AiFillDelete/></button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
    </>
  )
}

export default App
