import { Component } from "react";
import { Card } from "../components/Card";
import { Props } from "../types/types";
import "./container.css";

export class CardsList extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    console.log('"this.props.propsArr="', this.props.propsArr);
    return (
      <ul className="cards">
        {this.props.propsArr.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </ul>
    );
  }
}

// <Card
//   key={item.key}
//   name={item.name}
//   image={item.image}
//   gender={item.gender}
//   species={item.species}
//   status={item.status}
// />