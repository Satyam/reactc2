import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import Estado from 'Components/Estado';

import Sector from 'Components/Sector';

export default function Mimico({ idSector }) {
  return (
    <Container>
      <Row>
        <Col><Sector idSector={idSector} /></Col>
        <Col md="2"><Estado /></Col>
      </Row>
    </Container>
  );
}
