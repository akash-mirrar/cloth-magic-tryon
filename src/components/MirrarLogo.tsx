
import React from "react";

interface MirrarLogoProps {
  className?: string;
}

const MirrarLogo: React.FC<MirrarLogoProps> = ({ className }) => {
  return (
    <div className={className}>
      <svg viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.87 8.6H0V32.24H5.87V8.6Z" fill="black"/>
        <path d="M29.99 8.6L23.07 23.48L16.14 8.6H9.67L20.46 32.24H25.68L36.47 8.6H29.99Z" fill="black"/>
        <path d="M58.73 8.6L51.81 23.48L44.88 8.6H38.41L49.2 32.24H54.42L65.21 8.6H58.73Z" fill="black"/>
        <path d="M80.08 8.6H74.21V32.24H80.08V8.6Z" fill="black"/>
        <path d="M104.2 8.6L97.28 23.48L90.35 8.6H83.88L94.67 32.24H99.89L110.68 8.6H104.2Z" fill="black"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M112.26 8.6H127.85V14.13H118.13V17.85H126.87V23.38H118.13V26.71H127.85V32.24H112.26V8.6Z" fill="black"/>
      </svg>
    </div>
  );
};

export default MirrarLogo;
