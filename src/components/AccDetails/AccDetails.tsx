import React from "react";
import { UserContext } from "../../Context/user-context";
import { SettingsContext } from "../../Context/settings-context";
import { BoardContext } from "../../Context/board-context";
import { defaultSettings } from "../../utils/defaultSettings";

const AccDetails = () => {
  const { userSignOut, isAuth } = React.useContext(UserContext);
  const { discardChanges } = React.useContext(SettingsContext);
  const { resetSettings, resetScoreMax } = React.useContext(BoardContext);
  async function signOutHandler() {
    await userSignOut().then(() => {
      discardChanges(defaultSettings);
      resetSettings(false, isAuth);
      resetScoreMax();
    });
  }
  return (
    <div style={{ color: "white" }}>
      <div>Acc Details</div>
      <button onClick={signOutHandler}>Sign Out</button>
    </div>
  );
};

export default AccDetails;
