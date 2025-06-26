import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { db } from '../firebase';
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    Timestamp,
    serverTimestamp,
} from 'firebase/firestore';

interface Todo {
    id: string;
    text: string;
    completed: boolean;
    createdAt: Timestamp;
}

interface TodosState {
    todos: Todo[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    filter: 'all' | 'active' | 'completed';
}

export const addTodo = createAsyncThunk('todos/addTodo', async ({ userId, text }: { userId: string; text: string }) => {
    await addDoc(collection(db, `users/${userId}/todos`), {
        text,
        completed: false,
        createdAt: serverTimestamp(),
    });
});

export const toggleTodo = createAsyncThunk('todos/toggleTodo', async ({ userId, id, completed }: { userId: string; id: string; completed: boolean }) => {
    await updateDoc(doc(db, `users/${userId}/todos`, id), { completed: !completed });
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async ({ userId, id }: { userId: string; id: string }) => {
    await deleteDoc(doc(db, `users/${userId}/todos`, id));
});

export const saveEdit = createAsyncThunk('todos/saveEdit', async ({ userId, id, text }: { userId: string; id: string; text: string }) => {
    await updateDoc(doc(db, `users/${userId}/todos`, id), { text });
});

const initialState: TodosState = {
    todos: [],
    status: 'idle',
    error: null,
    filter: 'all',
};

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setTodos: (state, action: PayloadAction<Todo[]>) => {
            state.todos = action.payload;
            state.status = 'succeeded';
            state.error = null;
        },
        setTodosLoading: (state) => {
            state.status = 'loading';
        },
        setTodosError: (state, action: PayloadAction<string | null>) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        setFilter: (state, action: PayloadAction<'all' | 'active' | 'completed'>) => {
            state.filter = action.payload;
        },
    },
});

export const { setTodos, setTodosLoading, setTodosError, setFilter } = todosSlice.actions;
export default todosSlice.reducer;