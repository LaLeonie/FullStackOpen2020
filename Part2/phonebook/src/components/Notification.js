import React from "react";

const Notification = ({ notificationObject }) => {
  const messageStyle = {
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px"
  };

  const success = {
    color: "green",
    ...messageStyle
  };

  const error = {
    color: "red",
    ...messageStyle
  };

  if (notificationObject == null) {
    return null;
  }
  return (
    <div style={notificationObject.type === "success" ? success : error}>
      {notificationObject.message}
    </div>
  );
};

export default Notification;
