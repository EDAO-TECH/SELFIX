import React from 'react';
import Logo from '../assets/svg/logo.svg'; // ✅ Fixed the path
import '../styles.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <img src={Logo} alt="SELFIX Logo" className="logo" />
        <h1>Welcome to SELFIX</h1>
        <p>Your logic. Sealed. Healed. Trusted.</p>
      </header>

      <main className="home-content">
        <section className="hero">
          <h2>Cyber Recovery Platform</h2>
          <p>
            SELFIX goes beyond antivirus. We heal broken systems with AI, rollback engines, and sealed logic.
          </p>
          <a href="/pricing" className="cta-button">
            View Plans
          </a>
        </section>

        <section className="features">
          <h3>Key Features</h3>
          <ul>
            <li>🧠 AI Healing Engine</li>
            <li>🔁 Rollback Recovery</li>
            <li>🔐 SmartLicense-X™</li>
            <li>📊 Healing Dashboard</li>
            <li>🧾 Compliance Logs</li>
          </ul>
        </section>
      </main>

      <footer className="home-footer">
        <p>© {new Date().getFullYear()} SELFIX. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
