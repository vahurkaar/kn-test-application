import { action, makeObservable, observable } from 'mobx';
import Person from '../../models/Person';
import Page from '../../models/Page';
import { debounce } from 'debounce';
import PersonApi, { PersonsResponse } from '../../api/PersonApi';
import { Debounce } from '../../../typings';

export default class PersonTableStore {
  @observable people: Person[] = [];
  @observable page: Page;
  @observable nameFilter: string = '';
  @observable isInitialized: boolean = false;
  @observable hasErrors: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @action
  init = async () => {
    await this.findPeople();
    this.setInitialized();
  }

  @action
  findPeople = async (page?: Page) => {
    return PersonApi.findPersonsByName(this.nameFilter, page).then(this.setState).catch(this.setErrors);
  }

  @action
  onSelectPage = async (page: Page) => {
    await this.findPeople(page);
  }

  @action
  setState = ({ people, page }: PersonsResponse) => {
    this.people = people;
    this.page = page;
  }

  @action
  onChangePersonFilter = async (name?: string) => {
    this.nameFilter = name?.trim();
    await this.nameFilterChangeCallback();
  }

  @action
  onPersonFilterBlur = () => {
    this.nameFilterChangeCallback.flush();
  }

  @action
  setInitialized = () => {
    this.isInitialized = true;
  }

  @action
  setErrors = () => {
    this.hasErrors = true;
  }

  nameFilterChangeCallback: Debounce<(page?: Page) => void> = debounce(this.findPeople, 2000);
}
