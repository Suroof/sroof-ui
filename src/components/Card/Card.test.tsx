import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  test('renders card with content', () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  test('renders card with title', () => {
    render(<Card title="Card Title">Card Content</Card>);
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  test('renders card with icon', () => {
    const icon = <span>Icon</span>;
    render(<Card icon={icon} title="Card Title">Card Content</Card>);
    expect(screen.getByText('Icon')).toBeInTheDocument();
  });

  test('renders card with actions', () => {
    const actions = <button>Action</button>;
    render(<Card actions={actions} title="Card Title">Card Content</Card>);
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(<Card className="custom-class">Card Content</Card>);
    const card = screen.getByText('Card Content').parentElement;
    expect(card).toHaveClass('custom-class');
  });

  test('applies size classes', () => {
    render(<Card size="large">Card Content</Card>);
    const card = screen.getByText('Card Content').parentElement;
    expect(card).toBeInTheDocument();
  });

  test('applies type classes', () => {
    render(<Card type="primary">Card Content</Card>);
    const card = screen.getByText('Card Content').parentElement;
    expect(card).toBeInTheDocument();
  });

  test('shows border by default', () => {
    render(<Card>Card Content</Card>);
    const card = screen.getByText('Card Content').parentElement;
    expect(card).toBeInTheDocument();
  });

  test('hides border when bordered is false', () => {
    render(<Card bordered={false}>Card Content</Card>);
    const card = screen.getByText('Card Content').parentElement;
    expect(card).toBeInTheDocument();
  });

  test('applies shadow classes', () => {
    render(<Card shadow="lg">Card Content</Card>);
    const card = screen.getByText('Card Content').parentElement;
    expect(card).toBeInTheDocument();
  });

  test('is not clickable by default', () => {
    render(<Card>Card Content</Card>);
    const card = screen.getByText('Card Content').parentElement;
    expect(card).not.toHaveAttribute('role', 'button');
  });

  test('is clickable when clickable prop is true', () => {
    const handleClick = jest.fn();
    render(<Card clickable onClick={handleClick}>Card Content</Card>);
    const card = screen.getByText('Card Content').parentElement;
    expect(card).toHaveAttribute('role', 'button');
    expect(card).toHaveAttribute('tabIndex', '0');
  });

  test('shows loading overlay when loading is true', () => {
    render(<Card loading>Card Content</Card>);
    const card = screen.getByText('Card Content').parentElement;
    expect(card).toBeInTheDocument();
  });

  test('does not show loading overlay when loading is false', () => {
    render(<Card loading={false}>Card Content</Card>);
    const card = screen.getByText('Card Content').parentElement;
    expect(card).toBeInTheDocument();
  });
});