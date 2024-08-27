import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchTodos=createAsyncThunk('todos/fetchTodos',async()=>{
    const response=await axios.get('/api/todos');
    return response.data;
})

export const addContainer=createAsyncThunk('addcontainer/todos',async(todos)=>{
  const response=await axios.post('/api/todos',todos);
  return response.data;
})

export const addTodo=createAsyncThunk('todos/addTodos',async(todos)=>{
  const response=await axios.post('/api/todos/subTodos',todos)
  return response.data;
})

export const moveTodo=createAsyncThunk('todos/moveTodos',async(todos)=>{
  const response=await axios.put('/api/todos/moveTodos',todos);
   return response.data;
})

export const reorderTodo=createAsyncThunk('todos/reorderTodos',async(todos)=>{
  const response=await axios.put('/api/todos/reorderTodos',todos);
  return response.data;
})

export const deleteTodo=createAsyncThunk('todos/deleteTodos',async(todos)=>{
  const response=await axios.delete('/api/todos/deleteTodos',{data:todos});
  return response.data;
})

export const editTodo=createAsyncThunk('todos/editTodos',async(todos)=>{
  const response=await axios.put('/api/todos/editTodos',todos);
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
    // moveTodo: (state, action) => {
    //   const { sourceType, targetType, todoId } = action.payload;
    //   const source = state.items.find((item) => item.type === sourceType);
    //   const target = state.items.find((item) => item.type === targetType);
    //   const todo = source.childrens.find((child) => child.id === todoId);

    //   if (todo) {
    //     source.childrens = source.childrens.filter(
    //       (child) => child.id !== todoId
    //     );
    //     target.childrens.push(todo);
    //   }
    // },
    // reorderTodo: (state, action) => {
    //   const { type, sourceIndex, destinationIndex } = action.payload;
    //   const item = state.items.find((item) => item.type === type);

    //   if (item && sourceIndex !== destinationIndex) {
    //     const temp = item.childrens[sourceIndex];
    //     item.childrens[sourceIndex] = item.childrens[destinationIndex];
    //     item.childrens[destinationIndex] = temp;
    //   }
    // },
    // deleteTodo: (state, action) => {
    //   const { type, id } = action.payload;
    //   const item = state.items.find((ele) => ele.type === type);
    //   const todos = item.childrens.filter((item) => item.id !== id);
    //   if (todos) {
    //     item.childrens = todos;
    //   }
    // },
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchTodos.fulfilled,(state,action)=>{
     state.items=action.payload;
    })
    .addCase(addContainer.fulfilled,(state,action)=>{
      state.items.push(action.payload);
    })
    .addCase(addTodo.fulfilled,(state,action)=>{
      const{Type,SubTodos}=action.payload;
      const findcontainer=state.items.find((item)=>item.Type===Type);
      findcontainer.SubTodos=SubTodos;
    })
    .addCase(moveTodo.fulfilled,(state,action)=>{
      const{sourceType, targetType, todoId}=action.payload;
      const source = state.items.find((item) => item.Type === sourceType);
      const target = state.items.find((item) => item.Type === targetType);
      const todo=source.SubTodos.find((item)=>item._id===todoId);
      if(todo){
        source.SubTodos=source.SubTodos.filter((child)=>child._id!==todoId);
      }
      target.SubTodos.push(todo);
    })
    .addCase(reorderTodo.fulfilled,(state,action)=>{
      const{Type,SubTodos}=action.payload;
      const item=state.items.find((ele)=>ele.Type===Type);
      item.SubTodos=SubTodos;
    })
    .addCase(deleteTodo.fulfilled,(state,action)=>{
      const{Type,subtodo_id}=action.payload;
      console.log(Type,subtodo_id);
      const item=state.items.find(ele=>ele.Type===Type);
      const todo=item.SubTodos.filter(ele=>ele._id!==subtodo_id);
      if(todo){
        item.SubTodos=todo;
      }
    })
    .addCase(editTodo.fulfilled,(state,action)=>{
      const{Type,updateTodo}=action.payload;
      const item=state.items.find(ele=>ele.Type===Type);
      const index=item.SubTodos.findIndex(ele=>ele._id===updateTodo._id);
      item.SubTodos[index]=updateTodo;
    })
  }
});

// export const {
//   addTodo,
//   moveTodo,
//   reorderTodo,
//   deleteTodo,
//   addTodocontainerdiv,
// } = todoSlice.actions;
export default todoSlice.reducer;
