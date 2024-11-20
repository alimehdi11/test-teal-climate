import React from "react";

const Footer = () => {
  return (
    <footer className="flex justify-between items-center border-t border-gray-300 px-4 py-3 text-sm text-gray-600 bg-gray-50 mx-5 p-10">
      <div>&copy; 2024 Teal Climate</div>
      <div className="flex space-x-4">
        <a href="/terms" className="hover:underline">
          Terms & Conditions
        </a>
        <a href="/privacy" className="hover:underline">
          Privacy Policy
        </a>
        <a href="/help" className="hover:underline">
          Need help?
        </a>
      </div>
    </footer>
  );
};

export default Footer;
