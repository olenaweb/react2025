import { Component } from "react";
import { Card } from "../components/Card";
import { CharacterArr } from "../types/types";

export class Container extends Component<CharacterArr> {
  render() {
    return (
      <ul className="cards">
        {this.props.results.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </ul>
    );
  }
}
