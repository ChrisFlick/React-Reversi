import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import "../../css/Nav.css";

function Nav() {
  const [store] = useStoreContext();

  return (
    //<nav className="navbar navbar-expand-lg navbar-light bg-light">
    <nav >
      <span className="lobby">
        <a href="/">Create lobby</a>
      </span>
      {store.loading ? <a className="navbar-brand ml-auto">Loading...</a> : <></>}
    </nav>
  );
}

export default Nav;
