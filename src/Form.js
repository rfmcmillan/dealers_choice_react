import React from 'react';

const Form = (props) => {
  return (
    <form method="POST" action="/api/owners">
      <label>First Name:</label>
      <input name="firstName" placeholder="'Sandra'"></input>
      <br></br>
      <label>Last Name:</label>
      <input name="lastName" placeholder="'Carter'"></input>
      <br></br>
      <label>Email Address:</label>
      <input name="email" placeholder="sandra@gmail.com"></input>
      <br></br>
      <label>Phone Number:</label>
      <input name="phone" placeholder="828-564-8769"></input>
      <br></br>
      <button>Create New User</button>
    </form>
  );
};

export default Form;
