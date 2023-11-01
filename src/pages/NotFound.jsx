import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPersonThroughWindow} from "@fortawesome/free-solid-svg-icons";

export const NotFound = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h3>Page Not Found - 404 </h3>
      <FontAwesomeIcon
        icon={faPersonThroughWindow}
        className="fa-fade fa-10x"
        transform={{ rotate: 42 }}
        border
      />
      <div>
        
          
      </div>
    </div>
  );
};
