/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import LanguageChart from './LanguageChart';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, style, ...props }: any) => {
      delete props.initial;
      delete props.animate;
      delete props.whileInView;
      delete props.viewport;
      delete props.transition;

      return (
        <div className={className} style={style} {...props}>
          {children}
        </div>
      );
    },
  },
}));

const mockLanguages = [
  {
    name: 'TypeScript',
    percentage: 72,
    color: '#3178c6',
  },
  {
    name: 'JavaScript',
    percentage: 28,
    color: '#f7df1e',
  },
];

describe('LanguageChart Mouse Interactivity', () => {
  it('renders donut chart successfully', () => {
    render(<LanguageChart languages={mockLanguages} />);

    expect(screen.getByTestId('donut-chart')).toBeInTheDocument();
  });

  it('renders primary language information', () => {
    render(<LanguageChart languages={mockLanguages} />);

    expect(screen.getAllByText('TypeScript').length).toBeGreaterThan(0);
    expect(screen.getAllByText('72%').length).toBeGreaterThan(0);
  });

  it('supports hover events on donut chart without crashing', () => {
    render(<LanguageChart languages={mockLanguages} />);

    const donut = screen.getByTestId('donut-chart');

    fireEvent.mouseEnter(donut);
    fireEvent.mouseMove(donut);
    fireEvent.mouseLeave(donut);

    expect(donut).toBeInTheDocument();
  });

  it('supports touch events on donut chart without crashing', () => {
    render(<LanguageChart languages={mockLanguages} />);

    const donut = screen.getByTestId('donut-chart');

    fireEvent.touchStart(donut);
    fireEvent.touchMove(donut);
    fireEvent.touchEnd(donut);

    expect(donut).toBeInTheDocument();
  });

  it('renders all language rows after interaction events', () => {
    render(<LanguageChart languages={mockLanguages} />);

    const donut = screen.getByTestId('donut-chart');

    fireEvent.mouseEnter(donut);

    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getAllByText('28%').length).toBeGreaterThan(0);
  });
});
