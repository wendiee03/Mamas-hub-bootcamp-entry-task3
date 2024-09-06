import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        const usersData = await usersResponse.json();

        // Fetch posts
        const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
        const postsData = await postsResponse.json();

        // Combine users with their post count
        const usersWithPosts = usersData.map(user => {
          const userPosts = postsData.filter(post => post.userId === user.id);
          return { ...user, postCount: userPosts.length };
        });

        setUsers(usersWithPosts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-gray-900 bg-gray-200">
      <div className="p-4 flex">
        <h1 className="text-3xl">Users</h1>
      </div>
      <div className="px-3 py-4 flex justify-center">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
          <tbody>
            <tr className="border-b">
              <th className="text-left p-3 px-5">Name</th>
              <th className="text-left p-3 px-5">Email</th>
              <th className="text-left p-3 px-5">Posts</th>
            </tr>
            {users.map(user => (
              <tr key={user.id} className="border-b hover:bg-orange-100 bg-gray-100">
                <td className="p-3 px-5">
                    <span className="py-2">{user.name}</span>
                </td>
                <td className="p-3 px-5">
                  <input
                    type="text"
                    value={user.email}
                    className="bg-transparent border-b-2 border-gray-300 py-2"
                    readOnly
                  />
                </td>
                <td className="p-3 px-5">
                  <input
                    type="text"
                    value={user.postCount}
                    className="bg-transparent border-b-2 border-gray-300 py-2"
                    readOnly
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;