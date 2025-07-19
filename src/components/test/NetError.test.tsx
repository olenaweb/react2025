
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';

test('shows error message when network fails', async () => {
  jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network failure'));

  render(<App />);

  const input = screen.getByPlaceholderText("Enter the name");
  await userEvent.type(input, 'Rick');
  await userEvent.keyboard('{enter}');

  await waitFor(() => {
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  (global.fetch as jest.Mock).mockRestore?.();
});
