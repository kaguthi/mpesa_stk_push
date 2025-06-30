/* eslint-disable @typescript-eslint/no-explicit-any */
import todoSchema from '../Models/todo.ts';
import { Request, Response } from 'express';

export const getTodos = async (req: Request, res: Response) => {
    try {
        const todos = await todoSchema.find();
        res.status(200).json(todos);
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
};

export const createTodo = async (req: Request, res: Response) => {
    const { title, description } = req.body;

    const newTodo = new todoSchema({
        title,
        description
    });

    try {
        const savedTodo = await newTodo.save();
        res.status(201).json({ status: 'success', data: savedTodo });
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const updatedTodo = await todoSchema.findByIdAndUpdate(
            id,
            { title, description },
            { new: true }
        );
        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json(updatedTodo);
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedTodo = await todoSchema.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
};