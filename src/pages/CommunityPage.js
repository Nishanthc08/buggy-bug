import React from 'react';
import DiscussionForum from '../components/DiscussionForum';
import TipsAndTricks from '../components/TipsAndTricks';

const CommunityPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Community Hub</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <DiscussionForum week="1" />
        </div>
        <div>
          <TipsAndTricks />
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;

