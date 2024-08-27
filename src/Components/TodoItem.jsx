import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { deleteTodo, editTodo } from "../Store/todoSlice";
import { useDispatch,useSelector} from "react-redux";

const ItemTypes = {
  TODO: "todo",
};

const TodoItem = ({ todo, index, type, moveItem }) => {
  const [editMode, seteditMode] = useState(false);
  const[title,settitle]=useState(todo.title);
  const[message,setmessage]=useState(todo.message);
  const ref = useRef(null);
  const dispatch = useDispatch();
  const handleEditMode = () => {
    seteditMode(true);
  };

  const handleSave=()=>{
    dispatch(editTodo({Type:type,_id:todo._id,title:title,message:message}))
    seteditMode(false);
  }

  const [, drop] = useDrop({
    accept: ItemTypes.TODO,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [, drag] = useDrag({
    type: ItemTypes.TODO,
    item: { id: todo._id, index, type },
  });

  drag(drop(ref));

  return (
    <div ref={ref} className="border rounded p-2 mb-2 bg-gray-100">
      {editMode ? (
        <div className="flex flex-col items-center gap-1">
          <div>
            <input value={title} onChange={(e)=>settitle(e.target.value)} type="text" placeholder="Title" className="w-full px-2 py-1 rounded border" />
            <input value={message} onChange={(e)=>setmessage(e.target.value)} type="text" placeholder="Message" className="w-full px-2 py-1 rounded border" />
          </div>
           <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={handleSave}>Save</button>
        </div>
      ): (
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold">{todo.title}</h3>
            <p>{todo.message}</p>
          </div>
          <div className="flex gap-2">
            <CiEdit onClick={handleEditMode} />
            <MdDelete
              onClick={() => {
                dispatch(deleteTodo({ type: type, id: todo._id }));
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
