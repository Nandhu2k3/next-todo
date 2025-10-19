'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { addTodo, toggleTodo, deleteTodo, saveEdit, setTodos, setTodosLoading, setTodosError, setFilter } from '@/lib/slices/todosSlice';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, Timestamp } from 'firebase/firestore';
import { CheckCircle, Circle, Trash2, Plus, Edit, Save } from 'lucide-react';
import { styles } from '@/lib/styles';

const TodoListPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.auth);
    const { todos, status: todosStatus, error: todosError, filter } = useSelector((state: RootState) => state.todos);
    const [newTodo, setNewTodo] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingText, setEditingText] = useState('');

    useEffect(() => {
        if (!user) return;
        
        dispatch(setTodosLoading());
        const q = query(collection(db, `users/${user.uid}/todos`));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const todosData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            } as { id: string, text: string, completed: boolean, createdAt: Timestamp }));
            
            todosData.sort((a, b) => {
                if (a.completed !== b.completed) return a.completed ? 1 : -1;
                const aTime = a.createdAt?.seconds || 0;
                const bTime = b.createdAt?.seconds || 0;
                return bTime - aTime;
            });
            
            dispatch(setTodos(todosData));
        }, (error) => {
            console.error("Error fetching todos:", error);
            dispatch(setTodosError(error.message));
        });
        
        return () => unsubscribe();
    }, [user, dispatch]);

    const handleAddTodo = () => {
        if (newTodo.trim() === '' || !user) return;
        dispatch(addTodo({ userId: user.uid, text: newTodo }));
        setNewTodo('');
    };
    
    const handleToggleTodo = (id: string, completed: boolean) => {
        if (!user) return;
        dispatch(toggleTodo({ userId: user.uid, id, completed }));
    };

    const handleDeleteTodo = (id: string) => {
        if (!user) return;
        dispatch(deleteTodo({ userId: user.uid, id }));
    };

    const handleSaveEdit = (id: string) => {
        if (!user || editingText.trim() === '') {
            setEditingId(null);
            return;
        }
        dispatch(saveEdit({ userId: user.uid, id, text: editingText }));
        setEditingId(null);
        setEditingText('');
    };

    const startEditing = (todo: { id: string, text: string }) => {
        setEditingId(todo.id);
        setEditingText(todo.text);
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true; // 'all'
    });

    const FilterButton = ({ filterType, label }: { filterType: 'all' | 'active' | 'completed', label: string }) => (
        <button
            onClick={() => dispatch(setFilter(filterType))}
            style={filter === filterType ? { ...styles.filterButton, ...styles.filterButtonActive } : styles.filterButton}
        >
            {label}
        </button>
    );

    return (
        <div style={styles.pageBox}>
            <header>
                <h1 style={styles.title}>Balu's Todo List</h1>
                <p style={styles.subtitle}>Signed in as {user?.email}</p>
            </header>

            {todosError && <div style={styles.errorBox}>{todosError}</div>}

            <div style={styles.addTodoContainer}>
                <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()} placeholder="Hi there, what do you need to do?" style={styles.inputField} />
                <button onClick={handleAddTodo} style={styles.addButton}><Plus size={24} /></button>
            </div>

            <div style={styles.filterContainer}>
                <FilterButton filterType="all" label="All" />
                <FilterButton filterType="active" label="Active" />
                <FilterButton filterType="completed" label="Completed" />
            </div>

            <div style={styles.todoList}>
                {todosStatus === 'loading' && <p>Loading your tasks...</p>}
                {todosStatus === 'succeeded' && filteredTodos.length === 0 && (
                    <div style={styles.emptyState}><p>No tasks found for this filter!</p></div>
                )}
                {filteredTodos.map((todo) => {
                    const itemStyle = todo.completed ? { ...styles.todoItem, ...styles.todoItemCompleted } : styles.todoItem;
                    const textStyle = todo.completed ? { ...styles.todoText, ...styles.todoTextCompleted } : styles.todoText;

                    return (
                        <div key={todo.id} style={itemStyle}>
                            <button onClick={() => handleToggleTodo(todo.id, todo.completed)} style={styles.iconButton}>
                                {todo.completed ? <CheckCircle color="#22c55e" size={24} /> : <Circle color="#6b7280" size={24} />}
                            </button>
                            <div style={styles.todoTextContainer}>
                                {editingId === todo.id ? (
                                    <input type="text" value={editingText} onChange={(e) => setEditingText(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit(todo.id)} onBlur={() => handleSaveEdit(todo.id)} style={styles.editInput} autoFocus />
                                ) : (
                                    <p style={textStyle}>{todo.text}</p>
                                )}
                            </div>
                            <div style={styles.actionButtons}>
                                {editingId === todo.id ? (
                                    <button onClick={() => handleSaveEdit(todo.id)} style={styles.iconButton}><Save color="#22c55e" size={20} /></button>
                                ) : (
                                    <button onClick={() => startEditing(todo)} style={styles.iconButton}><Edit color="#facc15" size={20} /></button>
                                )}
                                {!todo.completed && (
                                    <button onClick={() => handleDeleteTodo(todo.id)} style={styles.iconButton}><Trash2 color="#f87171" size={20} /></button>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

//
// THIS IS THE MOST IMPORTANT LINE TO CHECK.
// It must be "export default" and not "export { ... }"
//
export default TodoListPage;