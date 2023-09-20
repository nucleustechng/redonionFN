import React from "react";

const LazyImageComponent = ({ src, style, className }) => {
  return <img className={className} style={style} src={src} alt="Lazy Load!" />;
};

export default LazyImageComponent;
