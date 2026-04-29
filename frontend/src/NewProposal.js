import React, { useState } from 'react';

function NewProposal({ onBack }) {
  const [brief, setBrief] = useState('');
  const [platform, setPlatform] = useState('Upwork');
  const [budget, setBudget] = useState('');
  const [loading, setLoading] = useState(false);
  const [proposal, setProposal] = useState('');

  const platforms = ['Upwork', 'Fiverr', 'Toptal', 'Direct Client'];

  const handleGenerate = async () => {
    if (!brief) return alert('Please enter a project brief!');
    setLoading(true);
    // AI integration agle step mein hogi
    setTimeout(() => {
      setProposal(`This is a sample proposal for: ${brief}`);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950">

      {/* Navbar */}
      <div className="bg-slate-900 border-b border-slate-700 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-white">Proposal</span>
          <span className="text-2xl font-black text-indigo-400">AI</span>
        </div>
        <button
          onClick={onBack}
          className="bg-slate-800 text-slate-300 px-4 py-2 rounded-full text-sm hover:bg-slate-700 transition"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="px-8 py-8 max-w-4xl mx-auto">

        <h2 className="text-3xl font-bold text-white mb-2">Generate Proposal ✦</h2>
        <p className="text-slate-400 mb-8">Paste the client brief and let AI do the magic!</p>

        {/* Platform Selector */}
        <div className="mb-6">
          <p className="text-slate-300 font-medium mb-3">Select Platform</p>
          <div className="flex gap-3">
            {platforms.map(p => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className={`px-5 py-2 rounded-full font-medium transition ${
                  platform === p
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Brief Input */}
        <div className="mb-6">
          <p className="text-slate-300 font-medium mb-3">Client Brief</p>
          <textarea
            rows={6}
            placeholder="Paste the client's project description here..."
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-2xl px-5 py-4 focus:outline-none focus:border-indigo-500 placeholder-slate-600"
          />
        </div>

        {/* Budget */}
        <div className="mb-8">
          <p className="text-slate-300 font-medium mb-3">Your Expected Budget ($)</p>
          <input
            type="text"
            placeholder="e.g. 500"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-2xl px-5 py-4 focus:outline-none focus:border-indigo-500 placeholder-slate-600"
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-5 rounded-2xl text-xl font-bold transition shadow-lg shadow-indigo-500/20 disabled:opacity-50"
        >
          {loading ? '⏳ Generating...' : '✦ Generate Proposal'}
        </button>

        {/* Result */}
        {proposal && (
          <div className="mt-8 bg-slate-900 border border-slate-700 rounded-2xl p-6">
            <h3 className="text-white font-bold text-lg mb-4">Your Proposal 🎉</h3>
            <p className="text-slate-300 leading-relaxed">{proposal}</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default NewProposal;