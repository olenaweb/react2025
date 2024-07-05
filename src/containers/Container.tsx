import { Component } from "react";
import { Card } from "../components/Card";
import { Props } from "../types/types";
import "./container.css";

export default class CardsList extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <ul className="cards">
        {this.props.propsArr.map((item) => (
          <Card key={item.key} name={item.name} image={item.image} gender={item.gender} species={item.species} status={item.status} />
        ))}
      </ul>
    );
    // <Card key={item.id} {...item} />
  }
}

// class News extends React.Component {
//   render() {
//     const newsTemplate = this.props.data.map(function (item, index) {
//       return (
//         <div key={index}>
//           <p className="news__author">{item.author}:</p>
//           <p className="news__text">{item.text}</p>
//         </div>
//       )
//     })
//     console.log(newsTemplate)
//     return (
//       <div className="news">
//         {newsTemplate}
//       </div>
//     )
//   }
// }

// <div className="goods-field" onClick={clickHandler}>
//   {goods.map(item => <Goods title={item.title} cost={item.cost} image={item.image}
//     articul={item.articul} key={item.articul} />)}
// </div>

// export default class CardsList extends Component<Props> {
//   constructor(props: Props) {
//     super(props);
//   }
//   render() {
//     const cardsArr = this.props.propsArr;
//     return (
//       <ul className='cards'>
//         {cardsArr.map((item, i) => (<Card key={item.id} {...item} />)
//         )}
//       </ul>
//     );
//   }
// }
