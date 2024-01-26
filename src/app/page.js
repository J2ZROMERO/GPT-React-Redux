"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Button, Container, Navbar, ListGroup } from "react-bootstrap";
import "./index";

export default function Home() {
  const [value, setValue] = useState(null);
  const [message, setMessage] = useState(null);
  const [previuosChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
  };

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
    if (!currentTitle && value && message) {
      setCurrentTitle(value);
    }
    if (currentTitle && value && message) {
      setPreviousChats((prevChats) => [
        ...prevChats,
        { title: currentTitle, role: "user", content: value },
        { title: currentTitle, role: message.role, content: message.content },
      ]);
    }
  }, [message, currentTitle]); // [] wherever those

  const createNewChat = () => {
    setMessage(null);
    setValue("");
    setCurrentTitle(null);
  };

  const currentChat = previuosChats.filter(
    (previuosChat) => previuosChat.title === currentTitle
  );

  const uniqueTitles = Array.from(
    new Set(previuosChats.map((previuosChat) => previuosChat.title))
  );

  return (
    <div className="app  container-fluid ">
      <Navbar expand="md" bg="light" className="d-block d-md-none">
        <Container fluid>
          <Button
            className="mt-3 w-100 "
            variant="outline-info"
            onClick={createNewChat}
          >
            + New Chat
          </Button>
          <Navbar.Collapse id="navbarNav">
            <ul className="navbar-nav">
              {/* Add your other Navbar links if needed */}
            </ul>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="row vh-100">
        <div className="side-bar d-flex flex-column container col-3 vh-100 d-none d-md-block">
          <Button
            className="mt-3 w-100 "
            variant="outline-info"
            onClick={createNewChat}
          >
            + New Chat
          </Button>
          <ListGroup className="history mt-4">
            {uniqueTitles?.map((uniqueTitle, index) => (
              <ListGroup.Item
                key={index}
                action
                onClick={() => handleClick(uniqueTitle)}
              >
                {" "}
                {uniqueTitle}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Container className="m-0">
            <p className="text-center">Made by Jose Zepeda</p>
          </Container>
        </div>

        <div class="col-9">
          <div className="main container vh-100 d-flex flex-column justify-content-between align-items-center">
            <ListGroup className="feed">
              {!currentTitle && <h1 className="nameTitle"> Jose-GPT</h1>}
              <div className="chatContainer mt-3">
                {currentChat?.map((chatMessage, index) => (
                  <ListGroup.Item className="mt-1" key={index} action>
                    <p>{chatMessage.role}</p>
                    <p className="">{chatMessage.content}</p>
                  </ListGroup.Item>
                ))}
              </div>
            </ListGroup>
            <div className="bottom-section container">
              <div className="input-container p-0 container">
                <div className="submit ml-0 mr-0 p-0 container d-flex justify-content-center">
                  <textarea
                    rows={1}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />{" "}
                  <h5 className="submit-icon" onClick={getMessages}>
                    {" "}
                    &#62;{" "}
                  </h5>
                </div>

                <p className="info text-center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
