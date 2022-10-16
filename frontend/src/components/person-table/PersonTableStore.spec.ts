import PersonTableStore from './PersonTableStore';
import PersonApi from '../../api/PersonApi';

jest.mock('../../api/PersonApi', () => ({
  __esModule: true,
  default: jest.fn()
}));

describe('PersonTableStore', () => {
  const create = () => new PersonTableStore();

  beforeEach(() => {
    PersonApi.findPersonsByName = jest.fn(() => Promise.resolve({
      people: [{
        name: 'name without suffix',
        url: 'url-2'
      }],
      page: {
        number: 0,
        totalPages: 0,
        totalElements: 0,
        size: 0
      }
    }));
  });

  it('should create', () => {
    const store = create();
    expect(store).toBeDefined();
  });

  describe('init', () => {
    it('should succeed', async () => {
      const store = create();

      await store.init();

      expect(PersonApi.findPersonsByName).toHaveBeenCalledWith('', undefined);
      expect(store.people).toHaveLength(1);
      expect(store.page.number).toBe(0);
      expect(store.page.totalPages).toBe(0);
      expect(store.page.totalElements).toBe(0);
      expect(store.page.size).toBe(0);
      expect(store.isInitialized).toBe(true);
    });

    it('should fail and register errors', async () => {
      PersonApi.findPersonsByName = jest.fn(() => Promise.reject(new Error()));

      const store = create();

      await store.init();

      expect(store.hasErrors).toBe(true);
      expect(store.people).toHaveLength(0);
      expect(store.page).toBeUndefined();
      expect(store.isInitialized).toBe(true);
    });
  });

  describe('findPeople', () => {
    it('should call api and update state', async () => {
      const store = create();

      await store.findPeople();

      expect(PersonApi.findPersonsByName).toHaveBeenCalledWith('', undefined);
      expect(store.people).toHaveLength(1);
      expect(store.page.number).toBe(0);
      expect(store.page.totalPages).toBe(0);
      expect(store.page.totalElements).toBe(0);
      expect(store.page.size).toBe(0);
    });

    it('should call api with name filter and page', async () => {
      const page = {
        number: 0,
        totalPages: 0,
        totalElements: 0,
        size: 0
      };

      const store = create();
      store.nameFilter = 'name-filter';

      await store.findPeople(page);

      expect(PersonApi.findPersonsByName).toHaveBeenCalledWith('name-filter', page);
      expect(store.people).toHaveLength(1);
      expect(store.page.number).toBe(0);
      expect(store.page.totalPages).toBe(0);
      expect(store.page.totalElements).toBe(0);
      expect(store.page.size).toBe(0);
    });
  });

  describe('onSelectPage', () => {
    it('should call api with name filter', async () => {
      const page = {
        number: 1,
        totalPages: 10,
        totalElements: 20,
        size: 10
      };

      const store = create();
      store.nameFilter = 'name-filter';

      await store.onSelectPage(page);

      expect(PersonApi.findPersonsByName).toHaveBeenCalledWith('name-filter', page);
    });
  });

  describe('setState', () => {
    it('should update state', () => {
      const store = create();

      expect(store.people).toHaveLength(0);
      expect(store.page).toBeUndefined();

      store.setState({
        people: [{ name: 'person name', url: 'url' }],
        page: { number: 1, totalPages: 10, totalElements: 20, size: 10 }
      });

      expect(store.people).toHaveLength(1);
      expect(store.page).toBeDefined();
    });
  });

  describe('onChangePersonFilter', () => {
    it('should set state with trimmed value and call persons api', async () => {
      const store = create();

      await store.onChangePersonFilter('    val\t');
      store.nameFilterChangeCallback.flush();

      expect(PersonApi.findPersonsByName).toHaveBeenCalledWith('val', undefined);
    });
  });

  describe('onPersonFilterBlur', () => {
    it('should call name filter change callback', () => {
      const store = create();

      store.onChangePersonFilter('val');
      store.onPersonFilterBlur();

      expect(PersonApi.findPersonsByName).toHaveBeenCalledWith('val', undefined);
    });
  });

  describe('setInitialized', () => {
    it('should update state', () => {
      const store = create();
      store.setInitialized();

      expect(store.isInitialized).toBe(true);
    });
  });

  describe('setErrors', () => {
    it('should set errors to true', () => {
      const store = create();
      store.setErrors();

      expect(store.hasErrors).toBe(true);
    });
  });

});