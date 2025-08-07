import React, { useState } from 'react';
import CheckoutButton from '@/components/CheckoutButton';

const plans = [
  {
    name: 'Home',
    key: 'home',
    price: 'Free / $5',
    features: ['Antivirus', 'VPN', 'GUI Dashboard', 'Legal Logging'],
  },
  {
    name: 'Pro',
    key: 'pro',
    price: '$12/mo',
    features: ['AI Healing', 'CLI Tools', 'Rollback Engine'],
  },
  {
    name: 'Team',
    key: 'team',
    price: '$39/mo/user',
    features: ['Dashboard', 'Vault Access', 'AI Chat CLI'],
    hasSeats: true,
  },
  {
    name: 'Enterprise',
    key: 'enterprise',
    price: 'Custom',
    features: ['Seeder Agents', 'GPG Vault', 'Compliance Logs'],
  },
];

const addons = [
  { key: 'ai_chat', label: 'AI Chat CLI' },
  { key: 'rollback_engine', label: 'Rollback Engine' },
  { key: 'book_forgiveness', label: 'Book of Forgiveness' },
  { key: 'self_audit', label: 'Self-Audit Engine' },
  { key: 'sandbox', label: 'Module Sandbox' },
  { key: 'sdk', label: 'DevAgent SDK' },
];

const PricingBuilder = () => {
  const [selectedPackage, setSelectedPackage] = useState('home');
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [seats, setSeats] = useState(1);

  const toggleAddon = (addon) => {
    setSelectedAddons((prev) =>
      prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]
    );
  };

  return (
    <div className="space-y-8 p-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center">Select Your Plan</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.key}
            onClick={() => setSelectedPackage(plan.key)}
            className={`cursor-pointer p-5 border rounded-lg shadow-sm transition hover:shadow-md ${
              selectedPackage === plan.key
                ? 'border-indigo-600 shadow-md bg-indigo-50'
                : 'border-gray-300 bg-white'
            }`}
          >
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{plan.price}</p>
            <ul className="text-sm space-y-1">
              {plan.features.map((feature, i) => (
                <li key={i}>✅ {feature}</li>
              ))}
            </ul>
            {plan.hasSeats && selectedPackage === plan.key && (
              <div className="mt-4">
                <label className="text-sm block mb-1 font-medium">Seats</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={seats}
                  onChange={(e) => setSeats(Number(e.target.value))}
                  className="w-full border rounded px-3 py-1 text-sm"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Add-ons</h3>
        <div className="flex flex-wrap gap-3">
          {addons.map((addon) => (
            <label
              key={addon.key}
              className={`border px-4 py-2 rounded cursor-pointer text-sm ${
                selectedAddons.includes(addon.key)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <input
                type="checkbox"
                className="hidden"
                checked={selectedAddons.includes(addon.key)}
                onChange={() => toggleAddon(addon.key)}
              />
              {addon.label}
            </label>
          ))}
        </div>
      </div>

      <CheckoutButton
        selectedPackage={selectedPackage}
        selectedAddons={selectedAddons}
        seats={selectedPackage === 'team' ? seats : 1}
      />
    </div>
  );
};

export default PricingBuilder;
