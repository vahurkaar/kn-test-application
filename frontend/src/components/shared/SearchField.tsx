import { Col, Form, Row } from 'react-bootstrap';
import React from 'react';

export interface SearchFieldProps {
  label: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}

const SearchField = ({ label, onChange, onBlur }: SearchFieldProps) => (
  <Row>
    <Col />
    <Col className="mb-3">
      <Form.Control
        placeholder={label}
        onBlur={onBlur}
        onChange={ (event) => onChange(event.target.value) }
      />
    </Col>
    <Col />
  </Row>
);

export default SearchField;