import { getData } from './../../request/getData';
import { server } from '../../mocks/server';
import { rest } from 'msw';

describe('getData API integration tests', () => {
  it('calls API with correct parameters', async () => {
    const searchTerm = 'rick';

    const fetchSpy = jest.spyOn(global, 'fetch');
    await getData(searchTerm);

    expect(fetchSpy).toHaveBeenCalledWith(
      `https://rickandmortyapi.com/api/character/?name=${searchTerm}`
    );

    fetchSpy.mockRestore();
  });

  it('handles successful API response', async () => {
    const response = await getData('rick');
    if ('results' in response) {
      expect('results' in response).toBe(true);
      expect(response.results.length).toBeGreaterThan(0);
      expect(response.results[0].name).toBe('Rick Sanchez');
    }
  });

  it('handles API error response', async () => {
    server.use(
      rest.get('https://rickandmortyapi.com/api/character', (req, res, ctx) => {
        const name = req.url.searchParams.get('name');
        if (name === 'unknown-name') {
          return res(ctx.status(404), ctx.json({ error: 'There is nothing here' }));
        }
        return res(ctx.status(200), ctx.json({ results: [] }));
      })
    );

    const response = await getData('unknown-name');
    expect('error' in response).toBe(true);
    if ('error' in response) {
      expect(response.error).toBe('There is nothing here');
    }
  });
});
