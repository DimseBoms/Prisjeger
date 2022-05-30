/* Ikke i bruk. Er en del av malen vi har brukt */
import React from "react";

import { Button } from "reactstrap";

function FixedPlugin(props) {
  const [classes, setClasses] = React.useState("dropdown");
  const handleClick = () => {
    if (classes === "dropdown") {
      setClasses("dropdown show");
    } else {
      setClasses("dropdown");
    }
  };
  return null;
}

export default FixedPlugin;
