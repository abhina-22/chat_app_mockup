import React from "react";
import { data } from "../assets/userInfo";
import styled from "styled-components";
import { fetchMessages } from "../actions/message";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const Inbox = ({ isTabletOrMobile, className, fetchMessages }) => {
  const history = useHistory();
  return (
    <div className={className}>
      <div className="header">
        <h2
          style={
            isTabletOrMobile ? { padding: "15% 10%" } : { padding: "3% 30%" }
          }
        >
          Messages
        </h2>
      </div>
      <div className="body">
        <br />
        {data.map((user, index) => (
          <div
            className="row"
            key={index}
            style={{ padding: "5%0" }}
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
              <p>{user.message[user.message.length - 1]}</p>
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
  .body {
    padding: ${(props) => (props.isTabletOrMobile ? "2% 10%" : "5% 30%")};
    border-radius: 10%;
  }

  .header {
    height: 150px;
    width: 100%;
    background-color: #00563b;
    color: white;
  }
  .profile-image {
    height: ${(props) => (props.isTabletOrMobile ? "50px" : "100px")};
    width: ${(props) => (props.isTabletOrMobile ? "50px" : "100px")};
    border-radius: 100%;
  }
`;
export default connect(mapStateToProps, mapDispatchToProps)(StyledInbox);
