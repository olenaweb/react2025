import { Component } from "react";
interface ReloadButtonState {
  handle?: () => void;
}
export class ReloadButton extends Component<ReloadButtonState> {
  render() {
    const { handle } = this.props;
    return (
      <button className="reload-btn btn" onClick={handle}>
        Sorry, try again
      </button>
    );
  }
}
