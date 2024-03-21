import {useState} from "react";

export default function TaskItem({item, changeItem, deleteItem, onDrag}) {
    const [isEditing, setIsEditing] = useState(false)

    function onSubmit(item, newText) {
        changeItem(item, newText)
        setIsEditing(false)
    }

    if (isEditing) {
        return <EditingTaskItem item={item} onSubmit={onSubmit} onDelete={() => setIsEditing(false)} />
    } else {
        return <NormalTaskItem item={item} onDelete={deleteItem} onEdit={() => setIsEditing(true)} onDrag={onDrag}/>
    }
}

function EditingTaskItem({item, onSubmit, onDelete}) {
    const [itemText, setItemText] = useState(item.text)

    return (
        <li className="listItem">
            <input className="itemText" type="text" value={itemText} onChange={e => setItemText(e.target.value)}/>
            <button className="itemButton" onClick={() => onSubmit(item, itemText)}>
                ok
            </button>
            <button className="itemButton delete" onClick={() => onDelete(item)}>
                back
            </button>
        </li>
    );
}

function NormalTaskItem({item, onDelete, onEdit, onDrag}) {
    return (
        <li
            className="listItem"
            draggable={true}
            onDragStart={e => onDrag(e, item)} >

            <label className="itemText">{item.text}</label>
            <button className="itemButton" onClick={() => onEdit(item)}>edit</button>
            <button className="itemButton delete" onClick={() => onDelete(item)}>
                delete
            </button>
        </li>
    );
}