import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  items: [
    { id: nanoid(), type: 'Todo', childrens: [] },
    { id: nanoid(), type: 'Progress', childrens: [] },
    { id: nanoid(), type: 'Closed', childrens: [] },
  ],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodocontainerdiv:(state,action)=>{
      
    }
    ,
    addTodo: (state, action) => {
      const { type, title, message } = action.payload;
      const item = state.items.find(item => item.type === type);
      if (item) {
        item.childrens.push({ id: nanoid(), title, message });
      }
    },
    moveTodo: (state, action) => {
      const { sourceType, targetType, todoId } = action.payload;
      const source = state.items.find(item => item.type === sourceType);
      const target = state.items.find(item => item.type === targetType);
      const todo = source.childrens.find(child => child.id === todoId);

      if (todo) {
        source.childrens = source.childrens.filter(child => child.id !== todoId);
        target.childrens.push(todo);
      }
    },
    reorderTodo: (state, action) => {
      const { type, sourceIndex, destinationIndex } = action.payload;
      const item = state.items.find(item => item.type === type);

      if (item && sourceIndex !== destinationIndex) {
        const temp = item.childrens[sourceIndex];
        item.childrens[sourceIndex] = item.childrens[destinationIndex];
        item.childrens[destinationIndex] = temp;
      }
    },
    deleteTodo:(state,action)=>{
     const {type,id}=action.payload;
     const item=state.items.find(ele=>ele.type===type);
     const todos=item.childrens.filter(item=>item.id!==id);
    if(todos){
      item.childrens=todos;
    }
    },
  },
});

export const { addTodo, moveTodo, reorderTodo,deleteTodo} = todoSlice.actions;
export default todoSlice.reducer;
