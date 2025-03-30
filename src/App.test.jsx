import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthContext } from './modules/auth/AuthProvider';

// Mock the useAuth hook
vi.mock('./modules/auth/hooks/useAuth', () => ({
  useAuth: () => ({
    loading: false
  })
}));

// Mock the components used in App
vi.mock('./modules/core/components/Header', () => ({
  default: () => <div data-testid="header">Header Component</div>
}));

vi.mock('./modules/core/components/Footer', () => ({
  default: () => <div data-testid="footer">Footer Component</div>
}));

vi.mock('./modules/core/components/ZaptBadge', () => ({
  default: () => <div data-testid="zapt-badge">ZAPT Badge</div>
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Routes: ({ children }) => <div data-testid="routes">{children}</div>,
    Route: () => <div>Route</div>
  };
});

describe('App Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ loading: false, user: null }}>
          <App />
        </AuthContext.Provider>
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('zapt-badge')).toBeInTheDocument();
    expect(screen.getByTestId('routes')).toBeInTheDocument();
  });
});