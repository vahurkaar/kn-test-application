import { Alert, Spinner, Table } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { observer, useLocalObservable } from 'mobx-react';
import PersonTableStore from './PersonTableStore';
import TablePagination from '../shared/TablePagination';
import Person from '../../models/Person';
import SearchField from '../shared/SearchField';

const PersonTable = observer(() => {
  const store = useLocalObservable(() => new PersonTableStore());
  const { people, page, hasErrors, isInitialized, onSelectPage, onChangePersonFilter, onPersonFilterBlur } = store;

  const getPersonIndex = (index: number) => page.size * page.number + index + 1 ;
  const getPersonName = (person: Person) => person.name + (person.suffix ? ` (${person.suffix})` : '');

  useEffect(() => {
    store.init();
  }, [store]);

  if (hasErrors) {
    return <Alert variant="danger">System error!</Alert>;
  }

  if (!isInitialized) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
      <h3>Persons</h3>

      <SearchField label="Search by name" onChange={onChangePersonFilter} onBlur={onPersonFilterBlur} />
      <TablePagination page={page} onSelect={onSelectPage} />
      <Table striped bordered hover>
        <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Image</th>
        </tr>
        </thead>
        <tbody>
        {people.map((person: Person, index: number) => (
          <tr key={`person-${index}`}>
            <td>{getPersonIndex(index)}</td>
            <td>{getPersonName(person)}</td>
            <td><img height={50} src={person.url} alt="" /></td>
          </tr>
        ))}
        </tbody>
      </Table>
      <TablePagination page={page} onSelect={onSelectPage} />
    </>
  )
});

export default PersonTable;