import React from 'react';
import DaoBoardroom from '@/components/dao/DaoBoardroom';
import Meta from '@/components/Meta';

const DaoBoardPage = ({ showToast }) => {
  return (
    <>
      <Meta 
        title="DAO-Board | SELFIX"
        description="Access the SELFIX DAO Boardroom. Participate in governance, view proposals, and exercise your voting rights as an NFT holder."
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-background">
        <DaoBoardroom showToast={showToast} />
      </div>
    </>
  );
};

export default DaoBoardPage;