import React, { useState } from 'react';
import NewProposal from './NewProposal';
import PricingModule from './PricingModule';

const GOLD = '#C9A84C';

function Dashboard({ user, onLogout }) {
  const [activePage, setActivePage] = useState('dashboard');
  const [showNewProposal, setShowNewProposal] = useState(false);
  const [showPricing, setShowPricing] = useState(false);

  if (showNewProposal) {
    return <NewProposal onBack={() => setShowNewProposal(false)} />;
  }

  if (showPricing) {
    return <PricingModule onBack={() => setShowPricing(false)} />;
  }

  const navItems = [
    { id: 'dashboard', icon: '⊞', label: 'Dashboard' },
    { id: 'proposals', icon: '📄', label: 'My Proposals' },
    { id: 'pricing', icon: '💰', label: 'Pricing Engine' },
    { id: 'templates', icon: '📋', label: 'Templates' },
    { id: 'analytics', icon: '📊', label: 'Analytics' },
    { id: 'settings', icon: '⚙️', label: 'Settings' },
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    if (id === 'pricing') setShowPricing(true);
  };

  return (
    <div style={{
      display: 'flex', minHeight: '100vh', width: '100vw',
      background: '#080808', fontFamily: "'Inter', sans-serif"
    }}>

      {/* Sidebar */}
      <div style={{
        width: '260px', minHeight: '100vh', background: '#0D0D0D',
        borderRight: '1px solid rgba(201,168,76,0.1)',
        display: 'flex', flexDirection: 'column',
        padding: '32px 0', flexShrink: 0
      }}>

        {/* Logo */}
        <div style={{ padding: '0 28px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '22px', fontWeight: '800', color: '#fff' }}>Proposal</span>
            <span style={{ fontSize: '22px', fontWeight: '800', color: GOLD }}>AI</span>
          </div>
          <p style={{ color: '#ebebeb', fontSize: '11px', marginTop: '4px', fontWeight: '300' }}>Freelance Growth Platform</p>
        </div>

        {/* Generate Button */}
        <div style={{ padding: '0 20px', marginBottom: '32px' }}>
          <button
            onClick={() => setShowNewProposal(true)}
            style={{
              width: '100%',
              background: `linear-gradient(135deg, ${GOLD}, #E2C06A)`,
              border: 'none', borderRadius: '12px', padding: '13px',
              color: '#080808', fontWeight: '700', fontSize: '13px',
              cursor: 'pointer', letterSpacing: '0.3px',
              boxShadow: '0 4px 20px rgba(201,168,76,0.25)'
            }}
          >
            ✦ New Proposal
          </button>
        </div>

        {/* Nav Items */}
        <nav style={{ flex: 1, padding: '0 12px' }}>
          {navItems.map(item => (
            <div
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px 16px', borderRadius: '10px', marginBottom: '4px',
                cursor: 'pointer',
                background: activePage === item.id ? 'rgba(201,168,76,0.1)' : 'transparent',
                borderLeft: activePage === item.id ? `2px solid ${GOLD}` : '2px solid transparent',
                color: activePage === item.id ? GOLD : '#ebebeb',
                fontSize: '14px', fontWeight: activePage === item.id ? '500' : '300'
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>

        {/* User Section */}
        <div style={{
          margin: '0 12px', padding: '16px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(201,168,76,0.1)',
          borderRadius: '12px'
        }}>
          <p style={{ color: '#ebebeb', fontSize: '11px', marginBottom: '4px', fontWeight: '300' }}>Signed in as</p>
          <p style={{ color: '#ccc', fontSize: '12px', marginBottom: '12px', fontWeight: '300' }}>{user}</p>
          <button
            onClick={onLogout}
            style={{
              width: '100%', background: 'rgba(255,59,59,0.08)',
              border: '1px solid rgba(255,59,59,0.2)',
              borderRadius: '8px', padding: '8px',
              color: '#ff6b6b', fontSize: '12px',
              cursor: 'pointer', fontWeight: '400'
            }}
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '40px', background: '#080808', overflowY: 'auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: '600', letterSpacing: '-0.5px', marginBottom: '8px' }}>
            Good day 👋
          </h1>
          <p style={{ color: '#ebebeb', fontSize: '14px', fontWeight: '300' }}>
            Ready to win more clients today?
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px' }}>
          {[
            { label: 'Total Proposals', value: '0', color: '#fff' },
            { label: 'Win Rate', value: '0%', color: '#4CAF50' },
            { label: 'This Month', value: '0', color: GOLD },
            { label: 'Credits Left', value: '3', color: GOLD },
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(201,168,76,0.1)',
              borderRadius: '16px', padding: '24px'
            }}>
              <p style={{ color: '#ebebeb', fontSize: '12px', fontWeight: '300', marginBottom: '12px' }}>
                {stat.label}
              </p>
              <p style={{ color: stat.color, fontSize: '36px', fontWeight: '600', letterSpacing: '-1px' }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* AI Modules */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ color: '#fff', fontSize: '16px', fontWeight: '500', marginBottom: '20px' }}>
            AI Modules
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {[
              { icon: '🖊️', label: 'Proposal Writer', desc: 'Generate winning proposals', action: () => setShowNewProposal(true) },
              { icon: '💰', label: 'Pricing Engine', desc: 'Get best price suggestions', action: () => setShowPricing(true) },
              { icon: '📅', label: 'Timeline Generator', desc: 'Coming soon...', action: null },
              { icon: '🎯', label: 'Scope Builder', desc: 'Coming soon...', action: null },
              { icon: '✉️', label: 'Cover Letter', desc: 'Coming soon...', action: null },
              { icon: '🔍', label: 'Client Analyzer', desc: 'Coming soon...', action: null },
            ].map((mod, i) => (
              <div
                key={i}
                onClick={mod.action || undefined}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: `1px solid ${mod.action ? 'rgba(201,168,76,0.2)' : 'rgba(255,255,255,0.05)'}`,
                  borderRadius: '14px', padding: '20px',
                  cursor: mod.action ? 'pointer' : 'default',
                  opacity: mod.action ? 1 : 0.5,
                  transition: 'all 0.2s'
                }}
              >
                <span style={{ fontSize: '24px' }}>{mod.icon}</span>
                <p style={{ color: '#fff', fontSize: '14px', fontWeight: '500', marginTop: '12px', marginBottom: '4px' }}>
                  {mod.label}
                </p>
                <p style={{ color: '#666', fontSize: '12px', fontWeight: '300' }}>{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Proposals */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(201,168,76,0.1)',
          borderRadius: '16px', padding: '28px'
        }}>
          <h2 style={{ color: '#fff', fontSize: '16px', fontWeight: '500', marginBottom: '24px' }}>
            Recent Proposals
          </h2>
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <p style={{ fontSize: '32px', marginBottom: '12px' }}>📄</p>
            <p style={{ color: '#ebebeb', fontSize: '14px', fontWeight: '300' }}>No proposals yet</p>
            <p style={{ color: '#555', fontSize: '12px', marginTop: '4px' }}>
              Click "New Proposal" to get started
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;