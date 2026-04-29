import React, { useState } from 'react';
import NewProposal from './NewProposal';

function Dashboard({ user, onLogout }) {
  const [showNewProposal, setShowNewProposal] = useState(false);

  if (showNewProposal) {
    return <NewProposal onBack={() => setShowNewProposal(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-950">
      
      {/* Navbar */}
      <div className="bg-slate-900 border-b border-slate-700 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-white">Proposal</span>
          <span className="text-2xl font-black text-indigo-400">AI</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-slate-800 px-4 py-2 rounded-full">
            <span className="text-slate-300 text-sm">{user}</span>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-500 bg-opacity-20 text-red-400 border border-red-500 border-opacity-30 px-4 py-2 rounded-full text-sm hover:bg-opacity-40 transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white">Good day! 👋</h2>
          <p className="text-slate-400 mt-1">Ready to win more clients today?</p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
            <p className="text-slate-400 text-sm mb-1">Total Proposals</p>
            <p className="text-4xl font-bold text-white">0</p>
            <p className="text-slate-500 text-xs mt-2">↑ Start generating!</p>
          </div>
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
            <p className="text-slate-400 text-sm mb-1">Win Rate</p>
            <p className="text-4xl font-bold text-emerald-400">0%</p>
            <p className="text-slate-500 text-xs mt-2">↑ Track your wins</p>
          </div>
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
            <p className="text-slate-400 text-sm mb-1">This Month</p>
            <p className="text-4xl font-bold text-indigo-400">0</p>
            <p className="text-slate-500 text-xs mt-2">↑ proposals sent</p>
          </div>
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
            <p className="text-slate-400 text-sm mb-1">Credits Left</p>
            <p className="text-4xl font-bold text-amber-400">3</p>
            <p className="text-slate-500 text-xs mt-2">Free plan</p>
          </div>
        </div>

        <div className="mb-8">
          <button
            onClick={() => setShowNewProposal(true)}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-5 rounded-2xl text-xl font-bold transition shadow-lg shadow-indigo-500/20"
          >
            ✦ Generate New Proposal
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">Recent Proposals</h2>
          <div className="text-center py-12">
            <p className="text-4xl mb-3">📄</p>
            <p className="text-slate-400">No proposals yet!</p>
            <p className="text-slate-600 text-sm mt-1">Click the button above to generate your first proposal</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;