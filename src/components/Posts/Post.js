import React, { useState, useEffect, useContext } from "react";
import clienteAxios from "../../config/axios";
import axios from "axios";
import PostContext from "../../context/posts/PostContext";
import moment from "moment";
import { Card } from "react-bootstrap";
import { Profile } from "../User/Profile";
import { ListComment } from "../Comments/ListComment";



export const Post = ({ post }) => {
  const { id, image, owner, text, publishDate, tags, link, likes } = post;

  const [postDetails, setPostDetails] = useState({});
  const [show, setShow] = useState(false);

  const { getPostsByHashTag } = useContext(PostContext);

  useEffect(() => {
    const source = axios.CancelToken.source();
    let mounted = true;

    const fetchDetails = async () => {
      try {
        const response = await clienteAxios.get(`/post/${id}/comment`, {
          cancelToken: source.token,
        });
        if (mounted) {
          setPostDetails(response.data);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
        } else {
          throw error;
        }
      }
    };
    fetchDetails();
    return function cleanup() {
      source.cancel();
      mounted = false;
    };
  }, []);

  const handleTag = (tag) => {
    getPostsByHashTag(tag);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card style={{ width: "36rem" }}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Text className="text-end">
            {moment(publishDate).format("MM-DD-YYYY")}
          </Card.Text>
          <Profile userInfo={owner} />
          <Card.Text className="text-capitalize">{text}</Card.Text>
          {link && (
            <a
              className="text-decoration-underline"
              href={link}
              target="_blank"
            >
              {link}
            </a>
          )}
        </Card.Body>
        <Card.Footer>
          <p>
            {" "}
            <b>Likes:</b> {likes}
          </p>
          <p onClick={() => handleShow()} role="button">
            <b>Comments:</b> {postDetails?.total}
          </p>
          {tags?.map((tag, i) => (
            <p
              key={i}
              className="text-decoration-underline"
              role="button"
              onClick={() => handleTag(tag)}
            >
              {" "}
              #{tag}{" "}
            </p>
          ))}
        </Card.Footer>
      </Card>

      <ListComment comments={postDetails.data} show={show} handleClose={handleClose}/>
    </>
  );
};
