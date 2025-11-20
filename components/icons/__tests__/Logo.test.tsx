import React from 'react';
import { render, screen } from '@testing-library/react';
import Logo from '../Logo';

describe('Logo Component', () => {
  it('renders the logo image', () => {
    render(<Logo />);
    const logoImage = screen.getByAltText('SCHOLASTIC A EDU. DEPOT Logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', '/logo-1.png');
  });

  it('renders the text on non-mobile screens', () => {
    // Set a wider viewport to test non-mobile behavior
    global.innerWidth = 1024;
    global.dispatchEvent(new Event('resize'));
    
    render(<Logo />);
    const logoText = screen.getByText('SCHOLASTIC A EDU. DEPOT');
    expect(logoText).toBeInTheDocument();
  });

  it('hides the text on mobile screens', () => {
    // Set a mobile viewport width
    global.innerWidth = 480;
    global.dispatchEvent(new Event('resize'));
    
    render(<Logo />);
    const logoText = screen.queryByText('SCHOLASTIC A EDU. DEPOT');
    expect(logoText).not.toBeInTheDocument();
  });
});
