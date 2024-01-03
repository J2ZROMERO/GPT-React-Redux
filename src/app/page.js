"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Button, Container, Navbar, ListGroup } from "react-bootstrap";
import "./index";

export default function Home() {
  const [value, setValue] = useState(null);
  const [message, setMessage] = useState(null);
  const [previuosChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState([]);

  const getMessages = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: value,
        max_tokens: 10,
      }),
    };
    try {
      const response = await fetch(
        "http://localhost:8000/completions",
        options
      );
      const data = await response.json();
      setMessage(data.choices[0].message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(currentTitle, value, message);

    if (!currentTitle && value && message) {
      setCurrentTitle(value);
    }
    if (currentTitle && value && message) {
      setPreviousChats((prevChats) => 
      [...prevChats,
        { title: currentTitle, role: "user", content: value },
        { title: currentTitle, role: message.role, content: message.content },
      ]);
    }
  }, [message, currentTitle]); // [] wherever those

const createNewChat = () => {
  setMessage(null);
  setValue("");
  setCurrentTitle(null);
}

const currentChat  = previuosChats.filter(previuosChat => previuosChat.title === currentTitle)


  console.log(previuosChats);
  return (
    <Container fluid className="app">
      <Container fluid className="side-bar d-flex flex-column">
        <Button variant="outline-info mt-3 w-100" onClick={createNewChat}>+ New Chat</Button>
        <ListGroup className="history mt-4 h-100">
          {currentChat.map((chatMessage,index  ) =>
           <ListGroup.Item key={index} action>

          </ListGroup.Item>)}
          
        </ListGroup>

        <Navbar>
          <p>Made by Jose Zepeda</p>
        </Navbar>
      </Container>

      <Container className="main">
        {!currentTitle && <h1> Jose-GPT</h1>}

        <ListGroup className="feed"></ListGroup>
        <Container className="bottom-section">
          <Container className="input-container p-0">
            <Container className="submit ml-0 mr-0 p-0">
              <textarea
                rows={1}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />{" "}
              <h5 className="submit-icon" onClick={getMessages}>
                {" "}
                &#62;{" "}
              </h5>
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
