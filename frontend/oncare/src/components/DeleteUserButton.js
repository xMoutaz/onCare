import React, { useCallback } from 'react'
import { useAuthentication } from "./authenticationContext";
import {useHistory} from "react-router-dom";

export default function DeleteUserButton(input) {
    const id = input.id;
    var refetch = input.refetch;
    const { setCurrentUser } = useAuthentication();
    const {currentUser} = useAuthentication();
    const history = useHistory()

    const deleteUserReq = () => {
        const requestOptions = {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: "Bearer"
        },
    };
        fetch('http://localhost:5000/api/v1/users/'+id, requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            if (!data.user) {
                const error = data.message;
                return Promise.reject(error);
            }
            if(currentUser.id == id) {
                history.push('/signup')
            } else {
                refetch();
            }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };


    const onDelete = useCallback(() => {
        deleteUserReq();
    }, [refetch]);

    return (
        <div className="manageButton">
        <button className="manageButton" onClick={onDelete}>Delete User</button>            
        </div>
    )
}
