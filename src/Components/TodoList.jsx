// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { moveTodo, reorderTodo } from "../Store/todoSlice";
// import AddTodoModal from "./AddTodoModal";

// const ItemTypes = {
//   TODO: "todo",
// };

// const TodoItem = ({ todo, index, type, moveItem }) => {
//   const ref = React.useRef(null);
//   // const dispatch = useDispatch();

//   const [, drop] = useDrop({
//     accept: ItemTypes.TODO,
//     hover(item, monitor) {
//       if (!ref.current) {
//         return;
//       }
//       const dragIndex = item.index;
//       const hoverIndex = index;
//       if (dragIndex === hoverIndex) {
//         return;
//       }
//       const hoverBoundingRect = ref.current?.getBoundingClientRect();
//       const hoverMiddleY =
//         (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
//       const clientOffset = monitor.getClientOffset();
//       const hoverClientY = clientOffset.y - hoverBoundingRect.top;
//       if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
//         return;
//       }
//       if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
//         return;
//       }
//       moveItem(dragIndex, hoverIndex);
//       item.index = hoverIndex;
//     },
//   });

//   const [, drag] = useDrag({
//     type: ItemTypes.TODO,
//     item: { id: todo.id, index, type },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   drag(drop(ref));

//   return (
//     <div ref={ref} className="border rounded p-2 mb-2 bg-gray-100">
//       <h3 className="font-bold">{todo.title}</h3>
//       <p>{todo.message}</p>
//     </div>
//   );
// };

// const TodoColumn = ({ type }) => {
//   const todos = useSelector(
//     (state) => state.todos.items.find((item) => item.type === type).childrens
//   );
//   const dispatch = useDispatch();

//   const moveItem = (dragIndex, hoverIndex) => {
//     dispatch(
//       reorderTodo({
//         type,
//         sourceIndex: dragIndex,
//         destinationIndex: hoverIndex,
//       })
//     );
//   };

//   const [, ref] = useDrop({
//     accept: ItemTypes.TODO,
//     drop: (item) => {
//       if (item.type !== type) {
//         dispatch(
//           moveTodo({
//             sourceType: item.type,
//             targetType: type,
//             todoId: item.id,
//           })
//         );
//         item.type = type;
//       }
//     },
//   });

//   return (
//     <div ref={ref} className="border rounded p-4 w-1/3">
//       <h2 className="font-bold text-lg mb-4">{type}</h2>
//       {todos.map((todo, index) => (
//         <TodoItem
//           key={todo.id}
//           todo={todo}
//           index={index}
//           type={type}
//           moveItem={moveItem}
//         />
//       ))}
//     </div>
//   );
// };

// const TodoList = () => {
//   const [isModalOpen, setModalOpen] = useState(false);

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="p-4">
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//           onClick={() => setModalOpen(true)}
//         >
//           Add Todo
//         </button>
//         <div className="flex justify-between mt-4">
//           <TodoColumn type="Todo" />
//           <TodoColumn type="Progress" />
//           <TodoColumn type="Closed" />
//         </div>
//         <AddTodoModal
//           isOpen={isModalOpen}
//           onClose={() => setModalOpen(false)}
//         />
//       </div>
//     </DndProvider>
//   );
// };

// export default TodoList;

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AddTodoModal from "./AddTodoModal";
import TodoColumn from "./TodoColumn";
import { useSelector } from "react-redux";
import AddTodocontainer from "./AddTodocontainer";

const TodoList = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [iscontainerOpen, setcontainerOpen] = useState(false);
  const todoTypes = useSelector((state) => state.todos.items);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setModalOpen(true)}
        >
          Add Todo
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded ml-3" onClick={()=>setcontainerOpen(true)}>
          Add Todo Container
        </button>
        <div className="flex justify-between mt-4">
          {/* <TodoColumn type="Todo" />
          <TodoColumn type="Progress" />
          <TodoColumn type="Closed" /> */}
          {todoTypes.map((ele) => (
            <TodoColumn key={ele.id} type={ele.type} />
          ))}
        </div>
        <AddTodoModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        />
        <AddTodocontainer isOpen={iscontainerOpen} onClose={()=>setcontainerOpen(false)}/>
      </div>
    </DndProvider>
  );
};

export default TodoList;
