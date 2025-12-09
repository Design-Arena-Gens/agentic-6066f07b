'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import Dashboard from '@/components/Dashboard';
import AuthModal from '@/components/AuthModal';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Logic Lens</h1>
            <p className="text-gray-600">Professional IC Testing Solution</p>
          </div>

          <p className="text-gray-700 mb-8">
            Test and analyze logic ICs with your ESP32-based tester. Connect via Bluetooth or WiFi to get started.
          </p>

          <button
            onClick={() => setShowAuthModal(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 mb-4"
          >
            Get Started
          </button>

          <div className="text-sm text-gray-500">
            <p>Features:</p>
            <ul className="mt-2 space-y-1">
              <li>✓ Bluetooth & WiFi Connectivity</li>
              <li>✓ Comprehensive IC Testing</li>
              <li>✓ AI Assistant (Premium)</li>
              <li>✓ Pin Configuration</li>
            </ul>
          </div>
        </div>

        {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      </div>
    );
  }

  return <Dashboard />;
}
