import '../style/App.css';
import {useEffect, useState} from "react";
import TaskList from "./TaskList";
import AddItemForm from "./AddItemForm";

function App() {

    const [currentItem, setCurrentItem] = useState(null)

    const [todos, setTodos] = useState(() => {
        const value = localStorage.getItem("ITEMS")
        if (value == null)
            return []
        else
            return JSON.parse(value)
    })

    useEffect(() => {
        localStorage.setItem("ITEMS", JSON.stringify(todos))
    }, [todos]);

    const itemStates = ["todo", "in progress", "done"]

    function changeItem(oldItem, newItem) {
        setTodos(current => {
            return current.map(cur => {
                if (cur.id === oldItem.id)
                    return newItem
                else
                    return cur
            })
        })
    }

    function changeItemText(item, newText) {
        changeItem(item, {...item, text: newText})
    }

    function changeCurrentItemLabel(newType) {
        changeItem(currentItem, {...currentItem, type: newType})
    }

    function deleteItem(item) {
        setTodos(current => {
            return current.filter(old => old.id !== item.id)
        })
    }

    function onDragStart(event, item) {
        setCurrentItem(item)
    }

    return (
        <div className="App">
            <AddItemForm setTodos={setTodos} itemStates={itemStates}/>

            <div className="listContainer">
                {itemStates.map(state => {
                    return <TaskList items={todos} onDelete={deleteItem} onChange={changeItemText} label={state} onDrag={onDragStart} changeCurrentLabel={changeCurrentItemLabel}/>
                })}
            </div>
        </div>
    );
}

export default App;
