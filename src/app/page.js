'use client'
import React from 'react';
import { Button, Container, Navbar, ListGroup } from 'react-bootstrap';
import './index';

export default function Home() {
  return (
    <Container fluid className="app">
      <Container fluid className="side-bar d-flex flex-column">
        <Button variant="outline-info mt-3 w-100">+ New Chat</Button>
        <ListGroup className="history mt-4">
        <ListGroup.Item  action>
        This one is a button
      </ListGroup.Item >
      <ListGroup.Item  action>
        This one is a button
      </ListGroup.Item >
      <ListGroup.Item  action>
        This one is a button
      </ListGroup.Item >
      <ListGroup.Item  action>
        This one is a button
      </ListGroup.Item >

        </ListGroup>
        <Navbar>
          <p>Made by Jose Zepeda</p>
        </Navbar>
      </Container>
      <Container className="main"></Container>
    </Container>
  );
}
