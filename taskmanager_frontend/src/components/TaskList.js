import React, { useState, useEffect } from 'react';
import { Plus, LogOut, Loader2, Trash2, Edit2, Check, X } from 'lucide-react';
import { tasksAPI } from '../services/api';
import TaskModal from './TaskModal';

function TaskList({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await tasksAPI.getAll();
      setTasks(response.data);
    } catch (err) {
      setError('Failed to load tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await tasksAPI.create(taskData);
      setTasks([response.data, ...tasks]);
      setShowModal(false);
    } catch (err) {
      throw new Error('Failed to create task');
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const response = await tasksAPI.update(editingTask.id, taskData);
      setTasks(tasks.map(t => t.id === editingTask.id ? response.data : t));
      setShowModal(false);
      setEditingTask(null);
    } catch (err) {
      throw new Error('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await tasksAPI.delete(taskId);
      setTasks(tasks.filter(t => t.id !== taskId));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const handleToggleStatus = async (task) => {
    try {
      const newStatus = task.status === 'completed' ? 'pending' : 'completed';
      const response = await tasksAPI.update(task.id, { status: newStatus });
      setTasks(tasks.map(t => t.id === task.id ? response.data : t));
    } catch (err) {
      setError('Failed to update task status');
    }
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <div style={styles.navbarContent}>
          <h1 style={styles.navbarTitle}>Task Manager</h1>
          <button onClick={onLogout} style={styles.logoutButton}>
            <LogOut style={styles.icon} />
            Logout
          </button>
        </div>
      </nav>

      <div style={styles.content}>
        <div style={styles.header}>
          <h2 style={styles.pageTitle}>My Tasks</h2>
          <button onClick={() => setShowModal(true)} style={styles.addButton}>
            <Plus style={styles.icon} />
            Add Task
          </button>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        {loading ? (
          <div style={styles.loadingContainer}>
            <Loader2 style={styles.loadingSpinner} />
          </div>
        ) : tasks.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={styles.emptyStateText}>No tasks yet. Create your first task!</p>
          </div>
        ) : (
          <div style={styles.taskGrid}>
            {tasks.map((task) => (
              <div key={task.id} style={styles.taskCard}>
                <div style={styles.taskContent}>
                  <div style={styles.taskInfo}>
                    <div style={styles.taskHeader}>
                      <h3 style={{
                        ...styles.taskTitle,
                        ...(task.status === 'completed' ? styles.taskTitleCompleted : {})
                      }}>
                        {task.title}
                      </h3>
                      <span style={{
                        ...styles.badge,
                        ...(task.status === 'completed' ? styles.badgeCompleted : styles.badgePending)
                      }}>
                        {task.status}
                      </span>
                    </div>
                    <p style={{
                      ...styles.taskDescription,
                      ...(task.status === 'completed' ? styles.taskDescriptionCompleted : {})
                    }}>
                      {task.description}
                    </p>
                  </div>
                  <div style={styles.taskActions}>
                    <button
                      onClick={() => handleToggleStatus(task)}
                      style={{
                        ...styles.actionButton,
                        ...(task.status === 'completed' ? styles.actionButtonWarning : styles.actionButtonSuccess)
                      }}
                      title={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
                    >
                      {task.status === 'completed' ? <X style={styles.actionIcon} /> : <Check style={styles.actionIcon} />}
                    </button>
                    <button
                      onClick={() => openEditModal(task)}
                      style={{...styles.actionButton, ...styles.actionButtonInfo}}
                      title="Edit task"
                    >
                      <Edit2 style={styles.actionIcon} />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      style={{...styles.actionButton, ...styles.actionButtonDanger}}
                      title="Delete task"
                    >
                      <Trash2 style={styles.actionIcon} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <TaskModal
          task={editingTask}
          onClose={closeModal}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)',
  },
  navbar: {
    backgroundColor: 'white',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  },
  navbarContent: {
    maxWidth: '72rem',
    margin: '0 auto',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navbarTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#4f46e5',
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    color: '#6b7280',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '0.375rem',
    transition: 'color 0.2s',
  },
  content: {
    maxWidth: '72rem',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  pageTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1f2937',
  },
  addButton: {
    backgroundColor: '#4f46e5',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    fontWeight: '500',
    transition: 'background-color 0.2s',
  },
  icon: {
    width: '1.25rem',
    height: '1.25rem',
    marginRight: '0.5rem',
  },
  error: {
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    color: '#991b1b',
    padding: '0.75rem 1rem',
    borderRadius: '0.375rem',
    marginBottom: '1rem',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3rem',
  },
  loadingSpinner: {
    width: '2rem',
    height: '2rem',
    color: '#4f46e5',
    animation: 'spin 1s linear infinite',
  },
  emptyState: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    padding: '3rem',
    textAlign: 'center',
  },
  emptyStateText: {
    color: '#6b7280',
    fontSize: '1.125rem',
  },
  taskGrid: {
    display: 'grid',
    gap: '1rem',
  },
  taskCard: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    padding: '1.5rem',
    transition: 'box-shadow 0.2s',
  },
  taskContent: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  taskInfo: {
    flex: 1,
  },
  taskHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  taskTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1f2937',
  },
  taskTitleCompleted: {
    textDecoration: 'line-through',
    color: '#9ca3af',
  },
  badge: {
    marginLeft: '0.75rem',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '500',
  },
  badgeCompleted: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
  },
  badgePending: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
  },
  taskDescription: {
    color: '#6b7280',
  },
  taskDescriptionCompleted: {
    textDecoration: 'line-through',
  },
  taskActions: {
    display: 'flex',
    gap: '0.5rem',
    marginLeft: '1rem',
  },
  actionButton: {
    padding: '0.5rem',
    borderRadius: '0.375rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  actionButtonSuccess: {
    backgroundColor: '#d1fae5',
    color: '#059669',
  },
  actionButtonWarning: {
    backgroundColor: '#fef3c7',
    color: '#d97706',
  },
  actionButtonInfo: {
    backgroundColor: '#dbeafe',
    color: '#2563eb',
  },
  actionButtonDanger: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
  },
  actionIcon: {
    width: '1.25rem',
    height: '1.25rem',
  },
};

export default TaskList;