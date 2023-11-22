/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '@/app/(main)/(routes)/page';

describe('Home', () => {
  it('renders the PayStream logo', () => {
    render(<Home />);

    const logo = screen.getByAltText('PayStream logo');

    expect(logo).toBeInTheDocument();
  });

  it('renders the PayStream logo with correct attributes', () => {
    render(<Home />);
    const logo = screen.getByAltText('PayStream logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute(
      'src',
      '/_next/image?url=%2Flogo.png&w=828&q=75'
    );
    // Add more attribute checks if needed
  });

  it('renders buttons with correct links', () => {
    render(<Home />);
    const experienceButton = screen.getByText('Experience PayStream');
    const learnMoreButton = screen.getByText('Learn more');

    expect(experienceButton.closest('a')).toHaveAttribute('href', '/admin');
    expect(learnMoreButton.closest('a')).toHaveAttribute(
      'href',
      'https://github.com/oslabs-beta/PayStream'
    );
  });

  it('renders team members info correctly', () => {
    render(<Home />);
    const teamMember = screen.getByText('Chandler');

    expect(teamMember.closest('a')).toHaveAttribute(
      'href',
      'mailto:chndlrchrty@gmail.com'
    );
  });
});
