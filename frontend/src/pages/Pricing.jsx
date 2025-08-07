import React from 'react';

const pricingPlans = [
  {
    name: 'Home',
    price: 'Free / $5',
    features: ['GUI, Scanner', 'VPN', 'Legal Logging'],
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$12/mo',
    features: ['AI Healing', 'CLI Tools', 'Rollback Engine'],
    highlight: true,
  },
  {
    name: 'Team',
    price: '$39/mo/admin',
    features: ['Dashboard', 'Vault Access', 'AI Chat'],
    highlight: false,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: ['Seeder Agents', 'GPG Vault', 'Compliance Logs'],
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <div className="bg-white py-12 px-6 sm:px-12 lg:px-24">
      <h2 className="text-3xl font-bold text-center mb-8">SELFIX Pricing Plans</h2>
      <div className="grid md:grid-cols-4 gap-6">
        {pricingPlans.map((plan) => (
          <div
            key={plan.name}
            className={`border rounded-lg p-6 shadow-sm ${
              plan.highlight ? 'border-indigo-600 shadow-lg' : ''
            }`}
          >
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <p className="text-2xl font-bold text-indigo-600 mb-4">{plan.price}</p>
            <ul className="space-y-2 text-gray-700">
              {plan.features.map((feature, idx) => (
                <li key={idx}>✅ {feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
