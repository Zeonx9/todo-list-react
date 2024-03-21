import {useState} from "react";

function AddItemForm({setTodos, itemStates}) {

    const [itemText, setItem] = useState("")

    const [itemType, setType] = useState("todo")

    function handleSubmit(e) {
        e.preventDefault()

        setTodos(currentTodos => {
            return [...currentTodos, {text: itemText, type: itemType, id: crypto.randomUUID()}]
        })

        setItem("")
    }

    return (
        <form className="addFrom" onSubmit={handleSubmit}>
            <div>
                <h2>Add new task to list</h2>
            </div>
            <input
                type="text"
                id="itemText"
                value={itemText}
                onChange={e => setItem(e.target.value)}
            />
            <select
                onChange={e => setType(e.target.value)}>
                {itemStates.map(state => {
                    return <option>{state}</option>
                })}
            </select>
            <button>Add</button>
        </form>
    );
}

export default AddItemForm;