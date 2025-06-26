'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { styles } from '@/lib/styles';

const ReportPage = () => {
    const { todos } = useSelector((state: RootState) => state.todos);

    const totalTasks = todos.length;
    const completedTasks = todos.filter(todo => todo.completed).length;
    const activeTasks = totalTasks - completedTasks;
    const completionRate = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(2) : '0.00';

    return (
        <div style={styles.pageBox}>
            <h1 style={styles.title}>Task Report</h1>
            <div style={styles.reportStat}>
                <p><strong style={{...styles.reportLabel, color: '#22d3ee'}}>Total Tasks:</strong> {totalTasks}</p>
                <p><strong style={{...styles.reportLabel, color: '#22c55e'}}>Completed Tasks:</strong> {completedTasks}</p>
                <p><strong style={{...styles.reportLabel, color: '#facc15'}}>Active Tasks:</strong> {activeTasks}</p>
                <p><strong style={{...styles.reportLabel, color: '#06b6d4'}}>Completion Rate:</strong> {completionRate}%</p>

                <h2 style={styles.reportSubHeader}>Recent Activity</h2>
                {todos.length > 0 ? (
                    <ul style={styles.reportList}>
                        {todos.slice(0, 5).map(todo => (
                            <li key={todo.id} style={styles.reportListItem}>
                                <span style={{ color: todo.completed ? '#22c55e' : 'white' }}>
                                    {todo.text} {todo.completed ? '(Done)' : '(Active)'}
                                </span>
                                {todo.createdAt && (
                                    <span style={styles.reportTimestamp}>
                                        {new Date(todo.createdAt.seconds * 1000).toLocaleString()}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No tasks to report yet.</p>
                )}
            </div>
        </div>
    );
};

export default ReportPage;