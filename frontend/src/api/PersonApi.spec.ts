import axios from 'axios';
import PersonApi from './PersonApi';

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    defaults: { baseURL: '/base-url' }
  }
}));

describe('PersonApi', () => {
  describe('findPersonsByName', () => {
    it('should call with name parameter', async () => {
      // @ts-ignore
      axios.get = jest.fn(() => Promise.resolve({
        data: {
          '_embedded': {
            people: []
          }
        }
      }));

      const result = await PersonApi.findPersonsByName('name-param');

      expect(axios.get).toHaveBeenCalledWith('/people/search/findByName', {
        params: { name: 'name-param', page: undefined, size: undefined }
      });
      expect(result.people).toBeDefined();
      expect(result.page).toBeUndefined();
    });

    it('should call with name and page parameters', async () => {
      const page = { number: 1, totalPages: 10, totalElements: 20, size: 10 };
      // @ts-ignore
      axios.get = jest.fn(() => Promise.resolve({
        data: {
          '_embedded': {
            people: []
          },
          page
        }
      }));

      const result = await PersonApi.findPersonsByName('name-param', page);

      expect(axios.get).toHaveBeenCalledWith('/people/search/findByName', {
        params: { name: 'name-param', page: 1, size: 10 }
      });
      expect(result.people).toBeDefined();
      expect(result.page).toEqual(page);
    });
  })
});