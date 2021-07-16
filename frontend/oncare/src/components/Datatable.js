import { useCallback, useEffect, useState } from "react";
import "./Datatable.css";
import DeleteUserButton from "./DeleteUserButton";
import EditUserButton from "./EditUsersButton";
import {useAuthentication} from './authenticationContext';
import{Alert} from 'react-bootstrap';

const UsersTable = ({ children }) => (
  <div className="users-table">{children}</div>
);

const UsersTableHeader = () => (
  <div className="users-table__row">
    <div className="users-table__col-header">Id</div>
    <div className="users-table__col-header">Name</div>
    <div className="users-table__col-header">Email</div>
    <div className="users-table__col-header"></div>
    <div className="users-table__col-header"></div>
  </div>
);

const UserRow = ({ id, fullName , email, refetch, onDelete}) => (
  <div className="users-table__row">
    <div>{id}</div>
    <div>{fullName}</div>
    <div>{email}</div>
    <EditUserButton id={id} refetch={refetch}/>
    <DeleteUserButton id={id} refetch={refetch}/>
  </div>
);





export default function Users() {
  const { jwt } = useAuthentication();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("")

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/users`);
      const { users } =await response.json();
      return users;  
    } catch(err) {
      setError('UnAuthurized req');
    }
  };

  const loadUsers = useCallback(() => {
    fetchUsers().then(setUsers)
  }, []);
  useEffect(loadUsers, [loadUsers]);


  
  return (
    <div className="container">
    <h3>Platform Users</h3>
    {error && <Alert variant="danger">{error}</Alert>}
    <div>
      { <UsersTable>
        <UsersTableHeader />
        {users && users.map((user) => (
          <UserRow key={user.id} {...user} refetch={loadUsers}/>
        ))}
      </UsersTable>}
    </div>
    </div>
  );
}
