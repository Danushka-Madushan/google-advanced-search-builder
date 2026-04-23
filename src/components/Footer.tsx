import React from 'react';
import { G } from '../styles/g-color';

const Footer: React.FC = () => {
  return (
    <div style={{
      textAlign: "center",
      fontSize: 12,
      color: G.grey,
      paddingTop: 8,
      fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
      lineHeight: 1.8
    }}>
      Google Advanced Search Builder · All operators sourced from Google's official documentation
      <div style={{ marginTop: 8 }}>
        Made with ❤️ by{" "}
        <a
          href="https://github.com/Danushka-Madushan/google-advanced-search-builder"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: G.blue, textDecoration: "none" }}
        >
          Danushka Madushan
        </a>
      </div>
    </div>
  );
};

export default Footer;
