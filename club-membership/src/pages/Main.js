import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <div>
        <h1>Hello world</h1>
        <Link to={"/login"}>Go to login</Link>
    </div>
  );
}

export default Main;