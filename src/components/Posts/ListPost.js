import React, { useEffect, useContext } from "react";
import { Container, Row, Col, Badge, Button } from "react-bootstrap";
import PostContext from "../../context/posts/PostContext";
import { Post } from "./Post";
export const ListPost = () => {
  const { posts, tagSelected, getAllPosts, LimpiarTags } = useContext(PostContext);

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <Container>
      {tagSelected && (
        <Button variant="primary" className="mt-2" onClick={LimpiarTags}>
          <Badge variant="light"> {tagSelected} X</Badge>
        </Button>
      )}
      <Row>
        {posts.map((post) => (
          <Col
            md="12"
            key={post.id}
            className="d-flex justify-content-center mt-2"
          >
            <Post post={post} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
