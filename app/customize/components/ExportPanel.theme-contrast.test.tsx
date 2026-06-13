import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { ExportPanel } from './ExportPanel';

const defaultProps = {
  format: 'markdown' as const,
  snippet: '![badge](https://example.com/badge.svg)',
  copied: false,
  copyStatusMessage: '',
  hasUsername: true,
  username: 'john',
  onFormatChange: vi.fn(),
  onCopy: vi.fn(),
};

describe('ExportPanel - Theme Contrast & Visual Cohesion', () => {
  it('verifies dark and light background/border contrast classes on the outer container', () => {
    const { container } = render(<ExportPanel {...defaultProps} />);

    const mainContainer = container.firstElementChild;

    expect(mainContainer).toHaveClass('bg-white/70');
    expect(mainContainer).toHaveClass('dark:bg-black/35');
    expect(mainContainer).toHaveClass('border-black/10');
    expect(mainContainer).toHaveClass('dark:border-white/10');
  });

  it('verifies contrast text classes for headings and helper descriptions', () => {
    render(<ExportPanel {...defaultProps} />);

    const title = screen.getByText('Markdown Export Snippet');
    expect(title).toHaveClass('text-emerald-600');
    expect(title).toHaveClass('dark:text-emerald-400');

    const description = screen.getByText(
      'Switch formats without changing the live badge configuration.'
    );
    expect(description).toHaveClass('text-gray-500');
    expect(description).toHaveClass('dark:text-white/60');
  });

  it('verifies visual cohesion classes on export format selector buttons', () => {
    render(<ExportPanel {...defaultProps} />);

    const markdownButton = screen.getByRole('button', {
      name: 'Markdown',
    });

    const htmlButton = screen.getByRole('button', {
      name: 'HTML',
    });

    expect(markdownButton).toHaveClass('text-emerald-700');
    expect(markdownButton).toHaveClass('dark:text-emerald-300');

    expect(htmlButton).toHaveClass('text-gray-600');
    expect(htmlButton).toHaveClass('dark:text-white/60');
  });

  it('verifies code snippet container and code block maintain readable contrast', () => {
    const { container } = render(<ExportPanel {...defaultProps} />);

    const codeElement = container.querySelector('code');

    expect(codeElement).toHaveClass('text-emerald-600');
    expect(codeElement).toHaveClass('dark:text-emerald-300');

    const snippetContainer = codeElement?.parentElement;

    expect(snippetContainer).toHaveClass('bg-gray-100/80');
    expect(snippetContainer).toHaveClass('dark:bg-white/[0.03]');
    expect(snippetContainer).toHaveClass('border-black/10');
    expect(snippetContainer).toHaveClass('dark:border-white/10');
  });

  it('verifies disabled action buttons maintain accessible contrast styling', () => {
    render(<ExportPanel {...defaultProps} hasUsername={false} />);

    const copyButton = screen.getByRole('button', {
      name: /enable copying/i,
    });

    const downloadButton = screen.getByRole('button', {
      name: /enable image downloads/i,
    });

    expect(copyButton).toHaveClass('text-gray-500');
    expect(copyButton).toHaveClass('dark:text-white/60');
    expect(copyButton).toHaveClass('bg-gray-200/90');
    expect(copyButton).toHaveClass('dark:bg-white/10');

    expect(downloadButton).toHaveClass('text-gray-500');
    expect(downloadButton).toHaveClass('dark:text-white/35');
    expect(downloadButton).toHaveClass('bg-gray-200/90');
    expect(downloadButton).toHaveClass('dark:bg-white/10');
  });
});
