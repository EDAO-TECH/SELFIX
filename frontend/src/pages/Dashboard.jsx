import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        navigate('/login'); // redirect if not logged in
        return;
      }

      const { data: userData } = await supabase.auth.getUser();
      setUser(userData.user);

      // assuming 'plan' is stored in user_metadata
      const plan = userData?.user?.user_metadata?.plan || 'Free';
      setPlan(plan);
    };

    fetchUser();
  }, [navigate]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4 text-indigo-700">Welcome to Your Dashboard</h1>

      {user && (
        <div className="bg-white shadow-md rounded p-6">
          <p className="text-lg text-gray-800 mb-2">
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <p className="text-lg text-gray-800 mb-4">
            <span className="font-medium">Current Plan:</span>{' '}
            <span className="text-indigo-600 font-semibold">{plan}</span>
          </p>

          {plan !== 'Free' ? (
            <div className="mt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">🔓 Downloads & Tools</h2>
              <ul className="list-disc list-inside text-gray-700">
                <li><a href="#" className="text-indigo-600 hover:underline">SELFIX Vault App</a></li>
                <li><a href="#" className="text-indigo-600 hover:underline">GPG CLI Agent</a></li>
                <li><a href="#" className="text-indigo-600 hover:underline">PDF Compliance Report</a></li>
              </ul>
            </div>
          ) : (
            <p className="mt-4 text-sm text-gray-500 italic">Upgrade to access tools and downloads.</p>
          )}
        </div>
      )}
    </div>
  );
}
