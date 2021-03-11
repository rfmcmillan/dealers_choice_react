import React from 'react';

const Artworks = (props) => {
  const { owner } = props;

  return (
    <ul>
      {owner.artworks.map((artwork, index) => {
        return <li key={index}>{artwork.title}</li>;
      })}
    </ul>
  );
};

export default Artworks;
