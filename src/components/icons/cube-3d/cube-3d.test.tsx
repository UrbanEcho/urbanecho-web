import { render, screen } from '@testing-library/react';
import React from 'react';

import { Cube3DIcon } from './cube-3d';

describe('Cube3DIcon', () => {
  it('should render', () => {
    expect.hasAssertions();

    render(<Cube3DIcon />);

    // Check that the svg is rendered
    expect(screen.getByTestId('cube-3d-icon')).toBeInTheDocument();
  });

  it('should render with custom size', () => {
    expect.hasAssertions();

    render(<Cube3DIcon size={32} />);

    // Check that the svg has the correct size
    const svg = screen.getByTestId('cube-3d-icon');
    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
  });

  it('should render with custom className', () => {
    expect.hasAssertions();

    render(<Cube3DIcon className="custom-class" />);

    // Check that the svg has the custom class
    const svg = screen.getByTestId('cube-3d-icon');
    expect(svg).toHaveClass('custom-class');
  });
});