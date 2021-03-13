import React from 'react';
import Artworks from './Artworks';

const Owner = (props) => {
  const { owner } = props;
  return (
    <div>
      <big>
        {owner.firstName} {owner.lastName}
      </big>
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
      <form method="POST" action={`/api/owners/${owner.id}`}>
        <label>Enter New Note:</label>
        <input name="newNote"></input>
      </form>
    </div>
  );
};

export default Owner;
