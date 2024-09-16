import React, { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
}

interface Post {
  userId: number;
}

const UserPosts: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch users and posts data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        const usersData = await usersResponse.json();
        setUsers(usersData);

        // Fetch posts
        const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
        const postsData = await postsResponse.json();
        setPosts(postsData);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Count posts per user
  const getUserPostCount = (userId: number) => {
    return posts.filter(post => post.userId === userId).length;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Users and their Post Counts</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} has made {getUserPostCount(user.id)} posts.
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPosts;
