import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import throttle from "lodash.throttle";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import { setMessages } from "../actions/message";

let Message = ({ className, isTabletOrMobile, setMessages, selectedUser }) => {
  const { name, image } = selectedUser;
  const history = useHistory();
  const [incomingMessage, handleChange] = useState("");

  const onSerchKeyWord = (e) => {
    const keyword = e.target.value;
    if (keyword !== "") {
      setFilteredMessage(
        selectedUser.message.filter((msg) =>
          msg.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    } else {
      setFilteredMessage(selectedUser.message);
    }
  };
  const throttledOnSerchKeyWord = throttle(onSerchKeyWord, 100);

  const [message, setFilteredMessage] = useState(selectedUser.message);
  const [isSearchable, toggleSearch] = useState(true);
  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };
  const onSearch = (e) => {
    e.preventDefault();
    if (isSearchable) {
      document.querySelector(".search-input").style.display = "block";
    } else {
      document.querySelector(".search-input").style.display = "none";
    }
    toggleSearch(!isSearchable);
  };

  return (
    <div className={className}>
      <div
        className="row header"
        style={
          isTabletOrMobile ? { padding: "15% 10%" } : { padding: "3% 30%" }
        }
      >
        <div className="col">
          <h2 onClick={() => history.push("/")}>
            <FontAwesomeIcon icon={faLongArrowAltLeft} /> &nbsp; &nbsp;
            {name}
          </h2>
        </div>

        <div className="col" style={{ textAlign: "end" }}>
          <FontAwesomeIcon
            icon={faSearch}
            style={{ fontSize: "large" }}
            onClick={onSearch}
          />
          <input
            className="search-input"
            placeholder="Search"
            style={{
              display: "none",
              border: "none",
              outline: "none",
              background: "transparent",
              borderBottom: "1px solid grey",
            }}
            onChange={throttledOnSerchKeyWord}
          ></input>
        </div>
      </div>
      <div className="body">
        <br />
        {message &&
          message.map((data, index) =>
            index % 2 ? (
              <div className="row" key={index} style={{ padding: "5%0" }}>
                <div className="col" style={{ textAlign: "end" }}>
                  <p className="chat-bubble-right">{data}</p>
                </div>
              </div>
            ) : (
              <div className="row" key={index} style={{ padding: "5%0" }}>
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
              autoFocus
              placeholder="Type your message here.."
              onKeyDown={handleKeyDown}
              style={{
                width: "100%",
                borderColor: "#66cdaa",
                borderRadius: "10px",
              }}
              value={incomingMessage}
              onChange={(event) => handleChange(event.target.value)}
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
              onClick={() => {
                setMessages(name, incomingMessage);
                handleChange("");
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
  setMessages,
};

Message = styled(Message)`
  .body {
    padding: ${(props) => (props.isTabletOrMobile ? "2% 10%" : "5% 30%")};
    border-radius: 10%;
  }
  .header {
    height: 150px;
    background-color: #00563b;
    color: white;
    position: sticky;
    top: 0px;
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
    white-space: pre-wrap;
  }
  .chat-bubble-right {
    alig-self: center;
    background: #66cdaa;
    padding: 10px;
    border-radius: 20px 20px 0px 20px;
    margin-left: 30%;
    white-space: pre-wrap;
  }
`;
export default connect(mapStateToProps, mapDispatchToProps)(Message);
