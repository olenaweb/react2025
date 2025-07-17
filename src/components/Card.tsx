import { Component } from "react";
import { Character } from "../types/types";

export class Card extends Component<Character> {
  render() {
    const { name, image, gender, species, status } = this.props;

    return (
      <li className="card" data-testid="card" >
        <p className="card-name">
          <b>{name}</b>
        </p>
        <div>
          <img className="card-image" src={image} alt={name} />
        </div>
        <p>Gender: {gender}</p>
        <p>Species: {species}</p>
        <p className="card-status"> {status}</p>
      </li>
    );
  }
}
