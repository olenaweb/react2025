import { Component } from "react";
import { Card } from "../components/Card";
import { AllCharacter } from "../types/types";

export class CardList extends Component<AllCharacter> {
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
