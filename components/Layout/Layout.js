import React, { Fragment } from "react";
import NavMenu from "../NavMenu/NavMenu";

const Layout = (props) => {
  return (
    <div>
      <Fragment>
        <NavMenu></NavMenu>
        <main>{props.children}</main>
      </Fragment>
    </div>
  );
};

export default Layout;
