import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import { AuthContext } from '@/modules/auth/AuthProvider';

describe('Header Component', () => {
  it('renders the logo and navigation', () => {
    // Mock the auth context
    const contextValue = {
      user: null,
      signOut: vi.fn(),
      loading: false
    };
    
    render(
      <BrowserRouter>
        <AuthContext.Provider value={contextValue}>
          <Header />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    // Check if the logo is rendered
    expect(screen.getByText('Shtetl')).toBeInTheDocument();
    
    // Check if navigation items are rendered
    expect(screen.getByText('Marketplace')).toBeInTheDocument();
    expect(screen.getByText('Events')).toBeInTheDocument();
    
    // Check if the sign in button is rendered (when user is null)
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });
});