import React from 'react';
import { Link } from 'react-router-dom'; // Optional: Use react-router-dom for navigation links

const Breadcrumb = ({ path = [] }) => {
  return (
    <div className="bg-gray-200 py-6 text-center">
      <nav className="inline-flex items-center space-x-2">
        {path.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <span className="text-gray-600 mx-2">/</span> 
            )}
            <Link
              to={item.path || '/'}
              className="text-black hover:text-gray-800 font-medium"
            >
              {item.name}
            </Link>
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
};

export default Breadcrumb;