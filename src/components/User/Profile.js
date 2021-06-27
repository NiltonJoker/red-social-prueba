import React, { useState } from "react";
import { Card, Image, OverlayTrigger } from "react-bootstrap";
import clienteAxios from "../../config/axios";

import moment from 'moment';

export const Profile = ({ userInfo, direction="top" }) => {

  const [fullProfile, setFullProfile] = useState({})

  const getFullProfile = async() => {
    const response = await clienteAxios.get(`/user/${userInfo.id}`);
    setFullProfile(response.data)
  }

  return (
    <Card.Title>
      <Image src={userInfo.picture} fluid roundedCircle width="50" />{" "}
      <OverlayTrigger
        triggerType="hover"
        overlay={
          <Card style={{ width: "18rem", zIndex: 10000 }}>
            <Card.Img variant={direction} src={userInfo.picture} fluid />
            <Card.Body>
              <Card.Title>{userInfo.firstName} {userInfo.lastName}</Card.Title>
              <Card.Text>Gender: {fullProfile?.gender}</Card.Text>
              <Card.Text>Email: {fullProfile?.email}</Card.Text>
              <Card.Text>Date of Birth: {moment(fullProfile?.dateOfBirth).format('MM-DD-YYYY')}</Card.Text>
              <Card.Text>Phone: {fullProfile?.phone}</Card.Text>
              <Card.Text>Country: {fullProfile?.location?.country}</Card.Text>
            </Card.Body>
          </Card>
        }
        placement={direction}
      >
        <span role="button" onMouseEnter={getFullProfile}>{userInfo.firstName} {userInfo.lastName}</span>
      </OverlayTrigger>
    </Card.Title>
  );
};

