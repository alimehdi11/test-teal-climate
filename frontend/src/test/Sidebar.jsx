// Sidebar.js
import React from 'react';

function Sidebar({ onSidebarClick }) {
  return (
    <div>
      <button onClick={() => onSidebarClick('option1')}>Option samad</button>
      <button onClick={() => onSidebarClick('option2')}>Option hello</button>
    </div>
  );
}

export default Sidebar;
