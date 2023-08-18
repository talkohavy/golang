import React from "react";

// Styles
import "../styles/PageHeader.css";

// Icons
import { IoLogoGithub } from "react-icons/io";

function PageHeader() {
  return (
    <div className="thead-container">
      <table className="table">
        <thead>
          <tr>
            <td className="col">
              <IoLogoGithub className="github-logo" />
            </td>
            <td className="col-10">
              <h3>My GitHub Repositories</h3>
            </td>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default PageHeader;
