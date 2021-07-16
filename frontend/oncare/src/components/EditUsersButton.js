import React from "react";
import {useHistory} from "react-router-dom";


export default function EditUserButton(input) {
    const history = useHistory()

    function handleClick(e) {
        e.preventDefault();
        console.log('The link was clicked.');
        history.push(`/EditUserInfo/${input.id}`);
      }

  return (
        <div className="ManageButton">
        <button onClick={handleClick} className='ManageButton'>Edit User's Info</button>
        </div>
  );
}