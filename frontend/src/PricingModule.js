import React, { useState } from 'react';

const GOLD = '#C9A84C';

function PricingModule({ onBack }) {
  const [brief, setBrief] = useState('');
  const [platform, setPlatform] = useState('Upwork');
  const [budget, setBudget] = useState('');
  const [skills, setSkills] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const platforms = ['Upwork', 'Fiverr', 'Toptal', 'Direct Client'];

  const handleAnalyze = async () => {
    if (!brief) return alert('Please enter a project brief!');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brief, platform, budget, skills })
      });
      const data = await response.json();
      setResult(data.pricing);
    } catch (err) {
      alert('Error connecting to backend!');
    }
    setLoading(false);
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
        padding: '32px 0', flexShrink: 0,
        position: 'fixed', left: 0, top: 0, height: '100vh'
      }}>
        <div style={{ padding: '0 28px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '22px', fontWeight: '800', color: '#fff' }}>Proposal</span>
            <span style={{ fontSize: '22px', fontWeight: '800', color: GOLD }}>AI</span>
          </div>
          <p style={{ color: '#aaa', fontSize: '11px', marginTop: '4px', fontWeight: '300' }}>Freelance Growth Platform</p>
        </div>

        <div style={{ padding: '0 20px', marginBottom: '32px' }}>
          <button onClick={onBack} style={{
            width: '100%', background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.2)', borderRadius: '12px',
            padding: '13px', color: GOLD, fontWeight: '500',
            fontSize: '13px', cursor: 'pointer',
          }}>
            ← Back to Dashboard
          </button>
        </div>

        <div style={{ padding: '0 20px' }}>
          <p style={{ color: '#aaa', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px', fontWeight: '300' }}>
            Platform
          </p>
          {platforms.map(p => (
            <div key={p} onClick={() => setPlatform(p)} style={{
              padding: '10px 14px', borderRadius: '8px', marginBottom: '4px',
              cursor: 'pointer',
              background: platform === p ? 'rgba(201,168,76,0.1)' : 'transparent',
              borderLeft: platform === p ? `2px solid ${GOLD}` : '2px solid transparent',
              color: platform === p ? GOLD : '#888',
              fontSize: '13px', fontWeight: platform === p ? '500' : '300'
            }}>
              {p}
            </div>
          ))}
        </div>
      </div>

      {/* Main */}
      <div style={{
        marginLeft: '260px', flex: 1, display: 'flex',
        flexDirection: 'column', alignItems: 'center',
        background: '#080808', overflowY: 'auto',
        minHeight: '100vh', paddingBottom: '60px'
      }}>

        <div style={{ width: '100%', maxWidth: '720px', padding: '48px 24px 32px 24px' }}>
          <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: '600', letterSpacing: '-0.5px', marginBottom: '8px' }}>
            💰 Pricing Engine
          </h1>
          <p style={{ color: '#aaa', fontSize: '14px', fontWeight: '300' }}>
            Get AI-powered pricing suggestions for your project
          </p>
        </div>

        {/* Result */}
        {result && (
          <div style={{ width: '100%', maxWidth: '720px', padding: '0 24px', marginBottom: '32px' }}>
            <div style={{
              background: 'rgba(201,168,76,0.03)',
              border: '1px solid rgba(201,168,76,0.15)',
              borderRadius: '20px', padding: '32px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: GOLD, fontSize: '18px' }}>💰</span>
                  <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: '500' }}>Pricing Analysis</h3>
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(result)}
                  style={{
                    background: 'rgba(201,168,76,0.1)',
                    border: '1px solid rgba(201,168,76,0.2)',
                    borderRadius: '8px', padding: '8px 16px',
                    color: GOLD, fontSize: '12px', cursor: 'pointer',
                  }}
                >
                  📋 Copy
                </button>
              </div>
              <div style={{
                color: '#ccc', fontSize: '14px', lineHeight: '1.9',
                fontWeight: '300', whiteSpace: 'pre-wrap'
              }}>
                {result}
              </div>
            </div>
          </div>
        )}

        {/* Input */}
        <div style={{ width: '100%', maxWidth: '720px', padding: '0 24px' }}>

          {/* Skills */}
          <div style={{ marginBottom: '16px' }}>
            <input
              type="text"
              placeholder="🛠️ Your skills (e.g. WordPress, React, UI/UX)"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              style={{
                width: '100%', background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(201,168,76,0.15)',
                borderRadius: '12px', padding: '14px 18px',
                color: '#fff', fontSize: '14px', fontWeight: '300',
                outline: 'none', boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = GOLD}
              onBlur={(e) => e.target.style.borderColor = 'rgba(201,168,76,0.15)'}
            />
          </div>

          {/* Brief + Generate */}
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(201,168,76,0.15)',
            borderRadius: '20px', padding: '20px 24px',
          }}>
            <textarea
              rows={5}
              placeholder="Paste the client's project brief here..."
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              style={{
                width: '100%', background: 'transparent', border: 'none',
                color: '#fff', fontSize: '15px', fontWeight: '300',
                lineHeight: '1.7', outline: 'none', resize: 'none',
                fontFamily: "'Inter', sans-serif"
              }}
            />
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginTop: '16px',
              paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)'
            }}>
              <span style={{ color: '#444', fontSize: '12px' }}>
                Platform: <span style={{ color: GOLD }}>{platform}</span>
              </span>
              <button
                onClick={handleAnalyze}
                disabled={loading}
                style={{
                  background: loading ? 'rgba(201,168,76,0.3)' : `linear-gradient(135deg, ${GOLD}, #E2C06A)`,
                  border: 'none', borderRadius: '12px', padding: '12px 28px',
                  color: '#080808', fontWeight: '700', fontSize: '14px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: loading ? 'none' : '0 4px 20px rgba(201,168,76,0.3)'
                }}
              >
                {loading ? '⏳ Analyzing...' : '💰 Analyze Price'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingModule;