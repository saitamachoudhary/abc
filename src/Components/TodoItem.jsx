import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { MdDelete } from "react-icons/md";
import { deleteTodo } from "../Store/todoSlice";
import { useDispatch, useSelector } from "react-redux";

const ItemTypes = {
  TODO: "todo",
};

const TodoItem = ({ todo, index, type, moveItem }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();

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
    <div
      ref={ref}
      className="border rounded p-2 mb-2 bg-gray-100"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold">{todo.title}</h3>
          <p>{todo.message}</p>
        </div>
        <MdDelete
          onClick={() => {
            dispatch(deleteTodo({ type: type, id: todo._id }));
          }}
        />
      </div>
    </div>
  );
};

export default TodoItem;
