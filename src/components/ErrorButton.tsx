import React, { useState, useEffect } from 'react';

const ErrorButton: React.FC = () => {
  const [errorState, setErrorState] = useState(false);

  const createError = () => {
    setErrorState(true);
  };

  useEffect(() => {
    if (errorState) {
      throw new Error('New Error was created by press button "Create Error"');
    }
  }, [errorState]);

  return (
    <button className="search-error-button btn" onClick={createError}>
      Create Error
    </button>
  );
};

export default ErrorButton;
