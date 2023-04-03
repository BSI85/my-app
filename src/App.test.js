import { render, screen } from '@testing-library/react';
import { createRoot } from 'react-dom/client';
import App from './App';

test('renders without crashing', () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(<App tab="home" />);
  root.unmount();
});

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
