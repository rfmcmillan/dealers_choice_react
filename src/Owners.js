import React from 'react';
import Artworks from './Artworks';

const Owners = (props) => {
  const { owners } = props;
  return (
    <div>
      <h1>Owners</h1>
      <ul>
        {owners.map((owner, index) => {
          return (
            <li key={index}>
              <big>
                {owner.firstName} {owner.lastName}
              </big>
              <br></br>
              <br></br>Email: {owner.email}
              <br></br>
              Phone: {owner.phone}
              <br></br>
              Collection:
              <Artworks owner={owner} />
              <br></br>
              <form method="POST" action="/api/owners/?_method=DELETE">
                <button name="id" value={owner.id}>
                  X
                </button>
              </form>
              <br></br>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Owners;
