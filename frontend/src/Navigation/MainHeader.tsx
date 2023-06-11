import React, { PropsWithChildren } from "react";

import "./MainHeader.css";

const MainHeader: React.FC<PropsWithChildren<{}>> = (props) => {
  return <header className="main-header">{props.children}</header>;
};

export default MainHeader;
