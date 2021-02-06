import React, { useEffect, useState } from "react";
import { data } from "../assets/userInfo";
import styled from "styled-components";

const Inbox = ({ isTabletOrMobile, className }) => {
  return (
    <div className={className}>
      <h2>Messages</h2>
      <br />
      {data.map((user, index) => [
        <a href={`/message/${user.name}`} className="link">
          <div className="row" key={index}>
            <div className="col-4">
              <img src={user.image} alt="profile" className="profile-image" />
            </div>
            <div className="col-8" style={{ alignSelf: "center" }}>
              <h5>{user.name}</h5>
              <p>{user.lastMessage}</p>
            </div>
          </div>
        </a>,
        <hr />,
      ])}
    </div>
  );
};

const StyledInbox = styled(Inbox)`
  padding: ${(props) => (props.isTabletOrMobile ? "2% 10%" : "5% 30%")};
  .link {
    text-decoration: none !important;
    color: black !important;
  }

  .profile-image {
    height: ${(props) => (props.isTabletOrMobile ? "75px" : "100px")};
    width: ${(props) => (props.isTabletOrMobile ? "75px" : "100px")};
    border-radius: 100%;
  }
`;

export default StyledInbox;
