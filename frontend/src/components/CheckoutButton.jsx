import React, { useState } from 'react';

const CheckoutButton = ({ selectedPackage, selectedAddons = [], seats = 1 }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          package: selectedPackage,
          selectedAddons,
          seats,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error || 'Unable to start checkout session.');
      }

      window.location.href = data.url; // safer than hardcoding session.id
    } catch (err) {
      console.error('Checkout Error:', err);
      setError(err.message || 'Unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-sm transition ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Redirecting...' : 'Buy Now'}
      </button>

      {error && (
        <p className="text-sm text-red-600 mt-2 text-center">{error}</p>
      )}
    </div>
  );
};

export default CheckoutButton;
