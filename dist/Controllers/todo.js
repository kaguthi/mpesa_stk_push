/* eslint-disable @typescript-eslint/no-explicit-any */
import todoSchema from '../Models/todo.js';
export const getTodos = async (req, res) => {
    try {
        const todos = await todoSchema.find();
        res.status(200).json(todos);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const createTodo = async (req, res) => {
    const { title, description } = req.body;
    const newTodo = new todoSchema({
        title,
        description
    });
    try {
        const savedTodo = await newTodo.save();
        res.status(201).json({ status: 'success', data: savedTodo });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const updatedTodo = await todoSchema.findByIdAndUpdate(id, { title, description }, { new: true });
        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json(updatedTodo);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTodo = await todoSchema.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
