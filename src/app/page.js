"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Button, Container, Navbar, ListGroup } from "react-bootstrap";
import "./index";

export default function Home() {

  const [value, setValue] = useState(null);
const [message, setMessage] = useState(null);


  const getMessages = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: value,
        max_tokens: 10,
      })
    }
    try{

      const response = await fetch('http://localhost:8000/completions', options)
      const data  = await response.json();
      setMessage(data.choices[0].message);
    

    }catch(error){
      console.log(error);
    }
  }

  return (
    <Container fluid className="app">
      <Container fluid className="side-bar d-flex flex-column">
        <Button variant="outline-info mt-3 w-100">+ New Chat</Button>
        <ListGroup className="history mt-4 h-100">
          <ListGroup.Item action>This one is a button</ListGroup.Item>
        </ListGroup>

        <Navbar>
          <p>Made by Jose Zepeda</p>
        </Navbar>
      </Container>

      <Container className="main">
        <h1> Jose-GPT</h1>

        <ListGroup className="feed"></ListGroup>
        <Container className="bottom-section">
          <Container className="input-container p-0">
            <Container className="submit ml-0 mr-0 p-0">
              <textarea rows={1} value={value}  onChange={(e) => setValue(e.target.value)}/> <h5 className="submit-icon" onClick={getMessages}> &#62; </h5>
            </Container>

            <p className="info">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            </p>
          </Container>
        </Container>
      </Container>
    </Container>
  );
}
