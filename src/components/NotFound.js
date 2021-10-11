import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => <div className='something-wrong'>
        <p>Something went wrong...</p>;
        <Link to='/'>Return to Homepage</Link>
    </div>;

export default NotFound;