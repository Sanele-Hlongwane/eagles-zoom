'use client';
// components/UsersList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersList = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Users List</h2>
      <ul className="divide-y divide-gray-300">
        {users.map(user => (
          <li key={user.id} className="py-2">
            <button
              onClick={() => onSelectUser(user)}
              className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-100 rounded"
            >
              {user.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
