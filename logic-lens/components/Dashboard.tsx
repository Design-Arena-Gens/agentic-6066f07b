'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import ICSelector from './ICSelector';
import ConnectionPanel from './ConnectionPanel';
import TestPanel from './TestPanel';
import AIAssistant from './AIAssistant';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [selectedIC, setSelectedIC] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [showAI, setShowAI] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Logic Lens</h1>
              <p className="text-xs text-gray-500">IC Testing Platform</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowAI(!showAI)}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span>AI Assistant</span>
            </button>

            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Connection */}
          <div className="lg:col-span-1">
            <ConnectionPanel
              isConnected={isConnected}
              setIsConnected={setIsConnected}
            />
          </div>

          {/* Middle Column - IC Selection */}
          <div className="lg:col-span-1">
            <ICSelector
              selectedIC={selectedIC}
              onSelectIC={setSelectedIC}
            />
          </div>

          {/* Right Column - Test Panel */}
          <div className="lg:col-span-1">
            <TestPanel
              selectedIC={selectedIC}
              isConnected={isConnected}
            />
          </div>
        </div>
      </main>

      {/* AI Assistant Modal */}
      {showAI && (
        <AIAssistant onClose={() => setShowAI(false)} />
      )}
    </div>
  );
}
