import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import { setMessage } from "../actions/message";
import useForm from "../hooks/index";

let Message = ({ className, isTabletOrMobile, setMessage, selectedUser }) => {
  const { message, name, image } = selectedUser;
  const history = useHistory();

  return (
    <div className={className}>
      <div className="header">
        <h2
          style={
            isTabletOrMobile ? { padding: "15% 10%" } : { padding: "3% 30%" }
          }
          onClick={() => history.push("/")}
        >
          <FontAwesomeIcon
            icon={faLongArrowAltLeft}
            style={{ margin: "0 8% 0 0" }}
          />
          {name}
          <FontAwesomeIcon
            icon={faSearch}
            style={{ marginLeft: "55%", fontSize: "large" }}
          />
        </h2>
      </div>
      <div className="body">
        <br />
        {message &&
          message.map((data, index) =>
            index % 2 ? (
              <div
                className="row"
                key={index}
                style={{ padding: "5%0" }}
                onClick={() => {
                  setMessage(data);
                }}
              >
                <div className="col" style={{ textAlign: "end" }}>
                  <p className="chat-bubble-right">{data}</p>
                </div>
              </div>
            ) : (
              <div
                className="row"
                key={index}
                style={{ padding: "5%0" }}
                onClick={() => {
                  setMessage(data);
                }}
              >
                <div className="col-3">
                  <img src={image} alt="profile" className="profile-image" />
                </div>
                <div className="col-9">
                  <p className="chat-bubble-left">{data}</p>
                </div>
              </div>
            )
          )}
        <div className="row">
          <div className="col-11">
            <textarea
              style={{
                width: "100%",
                borderColor: "#66cdaa",
                borderRadius: "10px",
              }}
            ></textarea>
          </div>
          <div
            className="col-1"
            style={isTabletOrMobile ? { marginTop: "4%" } : { marginTop: "2%" }}
          >
            <FontAwesomeIcon
              icon={faPaperPlane}
              style={{
                color: "#66cdaa",
                fontSize: "x-large",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ chat }) => ({
  selectedUser:
    chat.selectedUser || JSON.parse(localStorage.getItem("selectedUser")),
});

const mapDispatchToProps = {
  setMessage,
};

Message = styled(Message)`
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
  .chat-bubble-left {
    alig-self: center;
    background: #66cdaa;
    padding: 10px;
    border-radius: 20px 20px 20px 0px;
  }
  .chat-bubble-right {
    alig-self: center;
    background: #66cdaa;
    padding: 10px;
    border-radius: 20px 20px 0px 20px;
    margin-left: 30%;
  }
`;
export default connect(mapStateToProps, mapDispatchToProps)(Message);
