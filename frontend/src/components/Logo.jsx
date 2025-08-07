import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const Logo = ({ className = '' }) => {
  return (
    <Link to="/" className={`flex items-center group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg ${className}`}>
      <ShieldCheck className="w-8 h-8 text-primary text-glow" />
      <span className="ml-2 text-2xl font-bold text-glow text-foreground group-hover:text-primary transition-colors duration-300">
        SELFIX.PRO
      </span>
    </Link>
  );
};

export default Logo;