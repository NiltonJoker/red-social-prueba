import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { ListPost } from "./components/Posts/ListPost";
import PostState from "./context/posts/PostState";

export const App = () => {
  return (
    <>
      <PostState>
        <Navbar expand="lg" variant="dark" bg="dark">
          <Container>
            <Navbar.Brand href="#">Red Social</Navbar.Brand>
          </Container>
        </Navbar>

        <ListPost />
      </PostState>
    </>
  );
};
