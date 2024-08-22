import { createSlice, nanoid,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchTodos=createAsyncThunk('todos/fetchTodos',async()=>{
    const response=await axios.get('/api/todos');
    return response.data;
})

// export const postTodos=createAsyncThunk('/todos/postTodos',async(todo)=>{
//    const response=await axios.post('/api/todos',todo);
//    return response.data;
// })

export const addContainer=createAsyncThunk('addcontainer/todos',async(todos)=>{
  console.log(todos)
  const response=await axios.post('/api/todos',todos);
  return response.data;
})

export const addTodo=createAsyncThunk('todos/addTodos',async(todos)=>{
  const response=await axios.post('/api/todos/subTodos',todos)
  return response.data;
})

const initialState = {
  // items: [
  //   { id: nanoid(), type: "Todo", childrens: [] },
  //   { id: nanoid(), type: "Progress", childrens: [] },
  //   { id: nanoid(), type: "Closed", childrens: [] },
  // ],
  items: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // addTodocontainerdiv: (state, action) => {
    //   const { type } = action.payload;
    //   state.items.push({ id: nanoid(), type: type, childrens: [] });
    // },
    // addTodo: (state, action) => {
    //   const { type, title, message } = action.payload;
    //   const item = state.items.find((item) => item.type === type);
    //   if (item) {
    //     item.childrens.push({ id: nanoid(), title, message });
    //   }
    // },
    moveTodo: (state, action) => {
      const { sourceType, targetType, todoId } = action.payload;
      const source = state.items.find((item) => item.type === sourceType);
      const target = state.items.find((item) => item.type === targetType);
      const todo = source.childrens.find((child) => child.id === todoId);

      if (todo) {
        source.childrens = source.childrens.filter(
          (child) => child.id !== todoId
        );
        target.childrens.push(todo);
      }
    },
    reorderTodo: (state, action) => {
      const { type, sourceIndex, destinationIndex } = action.payload;
      const item = state.items.find((item) => item.type === type);

      if (item && sourceIndex !== destinationIndex) {
        const temp = item.childrens[sourceIndex];
        item.childrens[sourceIndex] = item.childrens[destinationIndex];
        item.childrens[destinationIndex] = temp;
      }
    },
    deleteTodo: (state, action) => {
      const { type, id } = action.payload;
      const item = state.items.find((ele) => ele.type === type);
      const todos = item.childrens.filter((item) => item.id !== id);
      if (todos) {
        item.childrens = todos;
      }
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchTodos.fulfilled,(state,action)=>{
     state.items=action.payload;
    })
    .addCase(addContainer.fulfilled,(state,action)=>{
      state.items.push(action.payload);
    })
    .addCase(addTodo.fulfilled,(state,action)=>{
      const{addTodo,type}=action.payload;
      const findcontainer=state.items.find((item)=>item.Type===type);
      findcontainer.SubTodos.push(addTodo);
    })
  }
});

export const {
  // addTodo,
  moveTodo,
  reorderTodo,
  deleteTodo,
  addTodocontainerdiv,
} = todoSlice.actions;
export default todoSlice.reducer;
