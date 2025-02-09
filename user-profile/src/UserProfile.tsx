/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";

interface Props {
  userId: number;
}

const UserProfile: React.FC<Props> = ({ userId }) => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://banksinn.free.beeceptor.com/1`);
        if (response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setUser(userData);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchData();
  }, [userId]);
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;
