import React from "react";
import { UserContext } from "../../Context/user-context";

const AccDetails = () => {
  const { userSignOut } = React.useContext(UserContext);
  function signOutHandler() {
    userSignOut();
  }
  return (
    <div style={{ color: "white" }}>
      <div>Acc Details</div>
      <button onClick={signOutHandler}>Sign Out</button>
    </div>
  );
};

export default AccDetails;
