import { CSSProperties } from 'react';

// Make sure the "export" keyword is right here. This is the fix.
export const styles: { [key: string]: CSSProperties } = {
    appContainer: { backgroundColor: '#111827', color: '#ffffff', minHeight: '100vh', fontFamily: 'sans-serif', padding: '1rem' },
    loadingScreen: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontSize: '1.5rem' },
    
    // Auth Page Styles
    authContainer: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' },
    authBox: { width: '100%', maxWidth: '24rem', backgroundColor: '#1f2937', borderRadius: '1rem', padding: '2rem', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' },
    authForm: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    submitButton: { width: '100%', backgroundColor: '#06b6d4', color: 'white', fontWeight: 'bold', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontSize: '1rem' },
    toggleAuth: { width: '100%', marginTop: '1rem', fontSize: '0.875rem', color: '#22d3ee', background: 'none', border: 'none', cursor: 'pointer' },
    errorBox: { backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', textAlign: 'center' },
    
    // Main App Layout Styles
    mainLayout: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
    mainContent: { width: '100%', display: 'flex', justifyContent: 'center' },

    // Navbar Styles
    navbar: { width: '100%', maxWidth: '42rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#1f2937', borderRadius: '1rem', marginBottom: '2rem', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' },
    navLinksContainer: { display: 'flex', gap: '0.5rem'},
    link: { padding: '0.5rem 1rem', borderRadius: '0.5rem', textDecoration: 'none', color: '#9ca3af', fontWeight: '500' },
    activeLink: { color: 'white', backgroundColor: '#374151' },
    signOutButton: { background: 'none', border: 'none', cursor: 'pointer', color: '#f87171' },

    // Generic Page/Box Styles
    pageBox: { position: 'relative', width: '100%', maxWidth: '42rem', backgroundColor: '#1f2937', borderRadius: '1rem', padding: '2rem', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' },
    title: { fontSize: '2.25rem', fontWeight: 'bold', textAlign: 'center', color: '#22d3ee', marginBottom: '1.5rem', marginTop: 0 },
    subtitle: { textAlign: 'center', color: '#9ca3af', marginTop: '-1rem', marginBottom: '1.5rem' },
    
    // Todo List Styles
    addTodoContainer: { display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' },
    inputField: { flexGrow: 1, backgroundColor: '#374151', color: 'white', border: '1px solid #4b5563', borderRadius: '0.5rem', padding: '0.75rem 1rem', fontSize: '1rem', boxSizing: 'border-box' },
    addButton: { backgroundColor: '#06b6d4', color: 'white', fontWeight: 'bold', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    todoList: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
    emptyState: { textAlign: 'center', padding: '2rem 1rem', backgroundColor: 'rgba(55, 65, 81, 0.5)', borderRadius: '0.5rem', color: '#9ca3af' },
    todoItem: { display: 'flex', alignItems: 'center', backgroundColor: '#374151', padding: '0.75rem', borderRadius: '0.5rem', transition: 'opacity 0.3s' },
    todoItemCompleted: { opacity: 0.6 },
    iconButton: { background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    todoTextContainer: { flexGrow: 1, margin: '0 0.75rem' },
    todoText: { fontSize: '1.125rem', color: 'white', margin: 0 },
    todoTextCompleted: { textDecoration: 'line-through', color: '#9ca3af' },
    editInput: { width: '100%', backgroundColor: '#4b5563', color: 'white', border: '1px solid #22d3ee', borderRadius: '0.25rem', padding: '0.5rem', fontSize: '1.125rem', boxSizing: 'border-box' },
    actionButtons: { display: 'flex', alignItems: 'center', gap: '0.5rem' },

    // Filter Button Styles
    filterContainer: { display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', gap: '0.5rem', flexWrap: 'wrap' },
    filterButton: { padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #4b5563', backgroundColor: '#374151', color: '#9ca3af', cursor: 'pointer', fontWeight: '500' },
    filterButtonActive: { backgroundColor: '#06b6d4', color: 'white', borderColor: '#06b6d4' },
    
    // Profile & Report Page Styles
    infoText: { color: 'white', fontSize: '1.125rem', lineHeight: '1.75' },
    infoLabel: { color: '#22d3ee', fontWeight: 'bold' },
    reportStat: { color: 'white', fontSize: '1.125rem', lineHeight: '1.75' },
    reportLabel: { fontWeight: 'bold' },
    reportSubHeader: { fontSize: '1.5rem', color: '#22d3ee', marginTop: '2rem', marginBottom: '1rem' },
    reportList: { listStyleType: 'none', paddingLeft: '0' },
    reportListItem: { marginBottom: '0.5rem', borderBottom: '1px solid #4b5563', paddingBottom: '0.5rem' },
    reportTimestamp: { fontSize: '0.875rem', color: '#9ca3af', marginLeft: '1rem' },
    aboutList: { listStyleType: 'disc', paddingLeft: '2rem', marginTop: '1rem' }
};