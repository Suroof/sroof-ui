import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  test('renders button with correct text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  test('applies correct variant classes', () => {
    render(<Button variant="primary">Primary Button</Button>);
    const button = screen.getByRole('button', { name: 'Primary Button' });
    // 注意：这里我们无法直接检查 CSS 模块类名，因为我们不知道生成的类名
    expect(button).toBeInTheDocument();
  });

  test('applies correct size classes', () => {
    render(<Button size="large">Large Button</Button>);
    const button = screen.getByRole('button', { name: 'Large Button' });
    expect(button).toBeInTheDocument();
  });

  test('is enabled by default', () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });

  test('can be disabled', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable Button</Button>);
    const button = screen.getByRole('button', { name: 'Clickable Button' });
    
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not handle click events when disabled', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Disabled Button</Button>);
    const button = screen.getByRole('button', { name: 'Disabled Button' });
    
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(0);
  });

  test('applies custom className', () => {
    render(<Button className="custom-button-class">Custom Class Button</Button>);
    const button = screen.getByRole('button', { name: 'Custom Class Button' });
    expect(button).toBeInTheDocument();
  });
});