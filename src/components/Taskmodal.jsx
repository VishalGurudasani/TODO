"use client";
import React, { useState, useCallback, useContext } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FiX, FiMaximize, FiShare2, FiStar, FiLoader, FiAlertTriangle, FiCalendar, FiEdit, FiPlus } from 'react-icons/fi';
import { useDropzone } from 'react-dropzone';
import '../CSS/TaskModal.css';
import noteContext from '@/Context/Notecontext';

const Taskmodal = () => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [title, setTitle] = useState('');
    const [fields, setFields] = useState([
        { id: 'status', name: 'Status', icon: <FiLoader />, value: '' },
        { id: 'priority', name: 'Priority', icon: <FiAlertTriangle />, value: '' },
        { id: 'deadline', name: 'Deadline', icon: <FiCalendar />, value: '' },
        { id: 'description', name: 'Description', icon: <FiEdit />, value: '' },
    ]);
    const [files, setFiles] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(fields);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setFields(items);
    };

    const onDrop = useCallback((acceptedFiles) => {
        setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleFieldChange = (id, value) => {
        setFields(fields.map(field => 
            field.id === id ? { ...field, value } : field
        ));
    };

    const handleSubmit = async () => {
        // Validate required fields
        if (!title || !fields.find(field => field.id === 'status').value || !fields.find(field => field.id === 'priority').value) {
            setError('Please fill in all required fields.');
            return;
        }

        const status = fields.find(field => field.id === 'status').value;
        const priority = fields.find(field => field.id === 'priority').value;
        const description = fields.find(field => field.id === 'description').value;
        const deadline = fields.find(field => field.id === 'deadline').value;

        // Optional: Validate date format
        if (deadline && isNaN(new Date(deadline).getTime())) {
            setError('Invalid date format.');
            return;
        }

        try {
            await addNote(title, description, status, priority, deadline);
            setSuccess('Task added successfully!');
            // Reset form fields
            setTitle('');
            setFields(fields.map(field => ({ ...field, value: '' })));
            setFiles([]);
            setError('');
        } catch (err) {
            setError('Failed to add task. Please try again.');
        }
    };

    const renderFieldInput = (field) => {
        switch (field.id) {
            case 'status':
                return (
                    <select 
                        value={field.value} 
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    >
                        <option value="">Select status</option>
                        <option value="to-do">ToDo</option>
                        <option value="in-progress">In Progress</option>
                        <option value="under-review">Under Review</option>
                        <option value="finished">Fineshed</option>
                    </select>
                );
            case 'priority':
                return (
                    <select 
                        value={field.value} 
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    >
                        <option value="">Select priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                );
            case 'deadline':
                return (
                    <input 
                        type="date" 
                        value={field.value} 
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    />
                );
            default:
                return (
                    <input 
                        type="text" 
                        value={field.value} 
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        placeholder={`Enter ${field.name.toLowerCase()}`}
                    />
                );
        }
    };

    return (
        <div className="task-form-container">
            <div className="task-form">
                <div className="task-header">
                    <div className="task-actions">
                        <FiX />
                        <FiMaximize />
                    </div>
                    <div className="task-actions">
                        <FiShare2 />
                        <FiStar />
                    </div>
                </div>
                
                <input 
                    className="task-title" 
                    placeholder="Title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="fields">
                        {(provided) => (
                            <ul {...provided.droppableProps} ref={provided.innerRef}>
                                {fields.map((field, index) => (
                                    <Draggable key={field.id} draggableId={field.id} index={index}>
                                        {(provided) => (
                                            <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="task-field"
                                            >
                                                {field.icon}
                                                <span>{field.name}</span>
                                                {renderFieldInput(field)}
                                            </li>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
                
                <button className="add-property">
                    <FiPlus />
                    Add custom property
                </button>
                
                <div {...getRootProps()} className={`task-footer dropzone ${isDragActive ? 'active' : ''}`}>
                    <input {...getInputProps()} />
                    {files.length > 0 ? (
                        <p>Files attached: {files.map(file => file.name).join(', ')}</p>
                    ) : (
                        <p>Drag your files here.</p>
                    )}
                </div>

                <button onClick={handleSubmit}>Add Task</button>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </div>
        </div>
    );
};

export default Taskmodal;
