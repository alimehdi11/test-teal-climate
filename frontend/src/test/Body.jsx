// Body.js
import React from 'react';

function Body({ selectedOption }) {
  return (
    <div>
      {selectedOption === 'option1' && <div>Option 1 Content</div>}
      {selectedOption === 'option2' && <div>Option 2 Content</div>}
      {selectedOption === 'default' && <div>Default Content</div>}
    </div>
  );
}

export default Body;
