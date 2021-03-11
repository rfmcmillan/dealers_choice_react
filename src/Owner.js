import React from 'react';
import Artworks from './Artworks';

const Owner = (props) => {
  const { owner } = props;
  return (
    <div>
      <big>
        {owner.firstName} {owner.lastName}
      </big>
      <form method="POST" action="/api/owners/?_method=DELETE">
        <button name="id" value={owner.id}>
          X
        </button>
      </form>
      <br></br>
      <img src={owner.imageUrl}></img>
      <br></br>
      <br></br>Email: {owner.email}
      <br></br>
      Phone: {owner.phone}
      <br></br>
      Notes: {owner.notes}
      <br></br>
      Collection:
      <Artworks owner={owner} />
      <br></br>
      <br></br>
    </div>
  );
};

export default Owner;
