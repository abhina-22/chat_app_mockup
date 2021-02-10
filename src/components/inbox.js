import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { fetchMessages } from "../actions/message";
import { data } from "../assets/userInfo";

const Inbox = ({ className, fetchMessages }) => {
  const history = useHistory();
  return (
    <div className={className}>
      <div className="header">
        <h2 className="title">Messages</h2>
      </div>
      <div className="body">
        <br />
        {data.map((user, index) => (
          <div
            className="row"
            key={index}
            style={{ padding: "5% 0%" }}
            onClick={() => {
              fetchMessages(user.name);
              history.push(`message/${user.name}`);
            }}
          >
            <div className="col-3">
              <img src={user.image} alt="profile" className="profile-image" />
            </div>
            <div className="col-9" style={{ alignSelf: "center" }}>
              <h6 style={{ fontWeight: "bolder" }}>{user.name}</h6>
              <p style={{ overflowWrap: "break-word" }}>
                {user && user.message.length
                  ? user.message[user.message.length - 1].message.length > 25
                    ? user.message[user.message.length - 1].message.substring(
                        0,
                        25
                      ) + "..."
                    : user.message[user.message.length - 1].message
                  : null}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  fetchMessages,
};

const StyledInbox = styled(Inbox)`
  .header {
    height: 150px;
    width: 100%;
    background-color: #00563b;
    color: white;
  }
  .title {
    padding: ${(props) => (props.isTabletOrMobile ? "15% 10%" : "3% 30%")};
  }
  .body {
    padding: ${(props) => (props.isTabletOrMobile ? "2% 10%" : "5% 30%")};
    border-radius: 10%;
  }
  .profile-image {
    height: ${(props) => (props.isTabletOrMobile ? "50px" : "100px")};
    width: ${(props) => (props.isTabletOrMobile ? "50px" : "100px")};
    border-radius: 100%;
  }
`;
export default connect(mapStateToProps, mapDispatchToProps)(StyledInbox);
