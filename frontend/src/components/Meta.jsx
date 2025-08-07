import React from 'react';
import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'SELFIX - AI-Powered Programmable Healing System',
  description: 'SELFIX is the world’s first AI-powered, programmable healing system for digital trust. It turns cybersecurity from reaction to regeneration.',
  keywords: 'cybersecurity, AI, self-healing, digital trust, programmable healing, regeneration, karmic simulation'
};

export default Meta;