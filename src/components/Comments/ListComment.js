import React from "react";
import { Modal, Card } from "react-bootstrap";
import { Profile } from "../User/Profile";
import moment from "moment";
export const ListComment = ({ show, comments=[], handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Comments</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {comments &&
          comments.map((comment) => (
            <Card key={comment.id}>
              <Card.Body>
                <p className="text-end">
                  {moment(comment.publishDate).format("MM-DD-YYYY")}
                </p>
                <Profile userInfo={comment.owner} direction="right" />
                <Card.Text>{comment.message}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        {comments.length === 0 && (
          <p>There are no comments... </p>
        )}
      </Modal.Body>
    </Modal>
  );
};
