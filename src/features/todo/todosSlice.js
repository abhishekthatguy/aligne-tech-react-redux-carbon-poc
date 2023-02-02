import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/todos',
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
    return response.data;
  },
);

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.splice(0, 0, action.payload);
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
    },
  },
  extraReducers: {
    [fetchTodos.pending]: (state) => {
      state.loading = true;
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    [fetchTodos.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});
export const { addTodo, deleteTodo } = todosSlice.actions;

export default todosSlice.reducer;
