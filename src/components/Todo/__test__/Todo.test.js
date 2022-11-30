import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Todo from '../Todo';

const MockTodo = () => {
    return (
        <BrowserRouter>
            <Todo />
        </BrowserRouter>
    )
}

const addTask = (tasks) => {
    const inputElement = screen.getByPlaceholderText("Add a new task here...");
    const buttonElement = screen.getByRole("button", { name: "Add" });
    tasks.forEach(task => {
        fireEvent.change(inputElement, { target: { value: task }});
        fireEvent.click(buttonElement);
    });
}

describe("Todo", () => {
    it('should render same text passed into title prop', () => {
        render(<MockTodo />);
        addTask(["Go Grocery Shopping"]);
        const divElement = screen.getByText("Go Grocery Shopping");
        expect(divElement).toBeInTheDocument();
      });

      it('task should not have completed class when initially rendered', () => {
        render(<MockTodo />);
        addTask(["Go Grocery Shopping"]);
        const divElement = screen.getByText("Go Grocery Shopping");
        expect(divElement).not.toHaveClass("todo-item-active"); 
      });

      it('task should have completed class when clicked', () => {
        render(<MockTodo />);
        addTask(["Go Grocery Shopping"]);
        const divElement = screen.getByText("Go Grocery Shopping");
        fireEvent.click(divElement);
        expect(divElement).toHaveClass("todo-item-active"); 
      });
})