import React from 'react';
import { useUser } from '@clerk/nextjs';
import VideoCall from '../VideoCall/page';

const CallPage = () => {
  const { user } = useUser();
  const targetUserId = 'TARGET_USER_ID'; // Replace with actual target user ID

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Video Call</h1>
      {user && <VideoCall currentUser={user} targetUserId={targetUserId} />}
    </div>
  );
};

export default CallPage;
