import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

describe('TodoList Component', () => {
    it('should render default tasks', () => {
        render(<TodoList />);
        expect(screen.getByText('Walk the dog')).toBeInTheDocument();
        expect(screen.getByText('Water the plants')).toBeInTheDocument();
        expect(screen.getByText('Wash the dishes')).toBeInTheDocument();
    });

    it('should add a new task', () => {
        render(<TodoList />);
        const input = screen.getByPlaceholderText('New task...');
        const addButton = screen.getByText('Add');

        fireEvent.change(input, { target: { value: 'New Test Task' } });
        fireEvent.click(addButton);

        expect(screen.getByText('New Test Task')).toBeInTheDocument();
        expect(input).toHaveValue('');
    });

    it('should delete a task', () => {
        render(<TodoList />);
        const taskToDelete = screen.getByText('Walk the dog');
        const deleteButton = taskToDelete.nextElementSibling as HTMLButtonElement;

        fireEvent.click(deleteButton);
        expect(screen.queryByText('Walk the dog')).not.toBeInTheDocument();
    });

    it('should add task on Enter key', () => {
        render(<TodoList />);
        const input = screen.getByPlaceholderText('New task...');

        fireEvent.change(input, { target: { value: 'Enter Task' } });
        fireEvent.keyDown(input, { key: 'Enter' });

        expect(screen.getByText('Enter Task')).toBeInTheDocument();
    });
});
