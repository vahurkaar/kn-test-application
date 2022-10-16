import axios, { AxiosResponse } from 'axios';
import Person from '../models/Person';
import Page from '../models/Page';

export interface PersonsResponse {
  people: Person[];
  page: Page;
}

axios.defaults.baseURL = '/api';

export default class PersonApi {

  static findPersonsByName = (name: string, page?: Page): Promise<PersonsResponse> =>
    axios.get("/people/search/findByName", {
      params: {
        name,
        page: page ? page.number : undefined,
        size: page ? page.size : undefined,
      }
    }).then((response: AxiosResponse) => ({
      people: response.data['_embedded'].people,
      page: response.data.page
    }));
}