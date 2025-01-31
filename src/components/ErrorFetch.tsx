import { Component } from 'react';
import errorImage from '../assets/error.jpg';
export class ErrorFetch extends Component {
  render() {
    return (
      <>
        <div className="error-page">
          <div className="error-image-host">
            <img className="error-image" src={errorImage} alt="error" />
          </div>
        </div>
      </>
    );
  }
}
