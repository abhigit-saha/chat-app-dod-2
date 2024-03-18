import { AuthContext } from "../context/AuthContext";
import React, { useContext } from "react";
const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="currentUser">
        {/*display the current user details*/}
        <img src={currentUser.photoURL} alt={currentUser.displayName} />
        <p>{currentUser.displayName}</p>
      </div>
    </div>
  );
};

export default Navbar;
