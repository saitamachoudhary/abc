import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { moveTodo, reorderTodo } from '../Store/todoSlice';
import TodoItem from './TodoItem';

const ItemTypes = {
  TODO: 'todo',
};

const TodoColumn = ({ type }) => {
  const todos = useSelector((state) => state.todos.items.find(item => item.type === type).childrens);
  const dispatch = useDispatch();

  const moveItem = (dragIndex, hoverIndex) => {
    dispatch(reorderTodo({
      type,
      sourceIndex: dragIndex,
      destinationIndex: hoverIndex,
    }));
  };

  const [, ref] = useDrop({
    accept: ItemTypes.TODO,
    drop: (item) => {
      if (item.type !== type) {
        dispatch(moveTodo({
          sourceType: item.type,
          targetType: type,
          todoId: item.id,
        }));
        item.type = type;
      }
    },
  });

  return (
    <div ref={ref} className="border rounded p-4 w-1/3">
      <h2 className="font-bold text-lg mb-4">{type}</h2>
      {
        (todos.length>0)?(
          todos.map((todo, index) => (
            <TodoItem key={todo.id} todo={todo} index={index} type={type} moveItem={moveItem} />
          ))
        )
        :(
          <p>No Todos</p>
        )
      }
    </div>
  );
};

export default TodoColumn;
