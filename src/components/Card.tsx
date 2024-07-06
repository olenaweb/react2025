import { Component } from "react";
import { Character } from "../types/types";
import "./components.css";

export class Card extends Component<Character> {
  constructor(props: Character) {
    super(props);
  }
  render() {
    return (
      <li className="card">
        <div className="card-content">
          <p className="card-name">{this.props.name}</p>
          <div>
            <img className="card-image" src={this.props.image} />
          </div>
          <p>
            <b>Gender:</b> {this.props.gender}
          </p>
          <p>
            <b>Species:</b> {this.props.species}
          </p>
          <p className="card-status"> {this.props.status}</p>
        </div>
      </li>
    );
  }
}
