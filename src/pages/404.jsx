import React from 'react';

function Error({ statusCode }) {
  return (
    <p> 
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "Oops! It seems an unexpected error occurred. If this problem persists, please don't hesitate to contact our support team for assistance. We apologize for the inconvenience."}
    </p>
  );
}

export default Error;
