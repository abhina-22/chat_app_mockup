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

let Message = ({ className, setMessages, selectedUser }) => {
  const { name, image } = selectedUser;
  const history = useHistory();
  const [incomingMessage, handleMessageChange] = useState("");
  const [message, setFilteredMessage] = useState(selectedUser.message);
  const [showSearchInput, toggleSearchInput] = useState(true);

  const onSerchKeyWord = (e) => {
    const keyword = e.target.value;
    if (keyword !== "") {
      setFilteredMessage(
        selectedUser.message.filter((msg) =>
          msg.message.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    } else {
      setFilteredMessage(selectedUser.message);
    }
  };

  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const onSearch = () => {
    const searchInput = document.querySelector(".search-input");
    if (showSearchInput) {
      searchInput.style.display = "block";
      searchInput.focus();
    } else {
      searchInput.style.display = "none";
    }
    toggleSearchInput(!showSearchInput);
  };
  const throttledOnSerchKeyWord = throttle(onSerchKeyWord, 300);

  return (
    <div className={className}>
      <div className="row header">
        <div className="col-5">
          <h2 onClick={() => history.push("/")}>
            <FontAwesomeIcon icon={faLongArrowAltLeft} /> &nbsp;
            {name}
          </h2>
        </div>
        <div className="search-icon col-7">
          <FontAwesomeIcon icon={faSearch} onClick={onSearch} />
          <input
            className="search-input"
            placeholder="Search"
            onChange={throttledOnSerchKeyWord}
            autoFocus
          ></input>
        </div>
      </div>
      <div className="body">
        <br />
        {message &&
          message.map((data, index) =>
            data.author === "me" ? (
              <div className="chat row" key={index}>
                <div className="col">
                  <p className="chat-bubble right">{data.message}</p>
                </div>
              </div>
            ) : (
              <div className="chat row" key={index}>
                <div className="col-3">
                  <img src={image} alt="profile" className="profile-image" />
                </div>
                <div className="col-9">
                  <p className="chat-bubble left">{data.message}</p>
                </div>
              </div>
            )
          )}
        <div className="row" style={{ paddingTop: "10px" }}>
          <div className="col-11">
            <textarea
              autoFocus
              placeholder="Type your message here.."
              onKeyDown={handleKeyDown}
              className="text-area"
              value={incomingMessage}
              onChange={(event) => handleMessageChange(event.target.value)}
            ></textarea>
          </div>
          <div className="send-button col-1">
            <FontAwesomeIcon
              icon={faPaperPlane}
              style={{
                color: "#66cdaa",
                fontSize: "x-large",
              }}
              onClick={() => {
                if (incomingMessage !== "") {
                  setMessages(name, incomingMessage);
                  handleMessageChange("");
                }
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
  .header {
    height: 150px;
    background-color: #00563b;
    color: white;
    position: sticky;
    top: 0px;
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
  .chat {
    padding: 3% 0;
  }
  .chat-bubble{
    padding: 10px;
    white-space: pre-wrap;
    overflow-wrap: break-word
  }
  .left {
    background: #a5ebcd;
    border-radius: 20px 20px 20px 0px;
  }
  .right {
    background: #66cdaa;
    margin-left: 30%;
    border-radius: 20px 20px 0px 20px;
  }
  .search-input {
      display: none;
      border: none;
      outline: none;
      background: transparent;
      border-bottom: 1px solid grey;
      color: white;
    }}
  .search-icon {
      font-size: ${(props) =>
        props.isTabletOrMobile ? "large" : "x-large"} !important;
      text-align: end;
    }
  .text-area{
        width: 100%;
        border-color: #66cdaa;
        border-radius: 10px;
    }
    .send-button {
      margin-top: ${(props) => (props.isTabletOrMobile ? "4%" : "2%")};
    }
  }
`;
export default connect(mapStateToProps, mapDispatchToProps)(Message);
