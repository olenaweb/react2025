import "./loader.css";
import { Component, ReactNode } from "react";

export class Loader extends Component {
  render(): ReactNode {
    return (
      <div className="loader">
        <p>Loading...</p>
        <div className="loader-image"></div>
      </div>
    );
  }
}
