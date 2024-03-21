import TaskItem from "./TaskItem";

function TaskList({items, onDelete, onChange, label, onDrag, changeCurrentLabel}) {
    function onDrop(event) {
        event.preventDefault()
        changeCurrentLabel(label)
        event.target.classList.remove("selected")
    }

    function onDragEnd(event) {
        event.target.classList.remove("selected")
    }

    function onDragOver(event) {
        event.preventDefault()
        if (event.target.classList.contains("selectable"))
            event.target.classList.add("selected")
    }
    return (
        <div>
            <h2
                className="selectable"
                onDragOver={event => onDragOver(event)}
                onDragLeave={event => onDragEnd(event)}
                onDrop={event => onDrop(event)}>
                {label}
            </h2>
            <ul className="list">
                {items.filter(item => {
                    return item.type === label
                }).map(item => {
                    return <TaskItem item={item} changeItem={onChange} deleteItem={onDelete} onDrag={onDrag}/>
                })}
            </ul>
        </div>
    )
}

export default TaskList