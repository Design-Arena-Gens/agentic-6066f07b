'use client';

import { useState } from 'react';
import { getICById } from '@/lib/ic-data';

interface TestPanelProps {
  selectedIC: string | null;
  isConnected: boolean;
}

type TestResult = {
  status: 'success' | 'failure' | 'warning';
  message: string;
  details?: string;
};

export default function TestPanel({ selectedIC, isConnected }: TestPanelProps) {
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showPinConfig, setShowPinConfig] = useState(false);

  const icData = selectedIC ? getICById(selectedIC) : null;

  const sendCommand = async (command: string) => {
    if (!isConnected || !selectedIC) return;

    setIsRunning(true);
    setTestResult(null);

    // Simulate sending command to ESP32
    console.log(`Sending command: ${command} for IC: ${selectedIC}`);

    // Simulate test execution
    setTimeout(() => {
      const mockResult: TestResult = {
        status: Math.random() > 0.2 ? 'success' : 'failure',
        message: `${command} completed`,
        details: `IC ${selectedIC} ${command === 'RUN_TEST' ? 'passed all tests' : 'operation completed successfully'}`,
      };
      setTestResult(mockResult);
      setIsRunning(false);
    }, 2500);

    // Real implementation would send via Bluetooth/WiFi:
    // await sendToESP32({ command, ic: selectedIC });
  };

  const runTest = () => sendCommand('RUN_TEST');
  const runBoardTest = () => sendCommand('BOARD_TEST');
  const enterSleepMode = () => sendCommand('SLEEP_MODE');

  const generatePinConfiguration = () => {
    if (!icData) return [];

    const pins = [];
    for (let i = 1; i <= icData.pins; i++) {
      if (i === 7 || i === 8) {
        pins.push({ number: i, name: i === 7 ? 'GND' : 'VCC', type: 'Power' });
      } else {
        pins.push({ number: i, name: `PIN ${i}`, type: 'I/O' });
      }
    }
    return pins;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Test Controls</h2>

      {!selectedIC && (
        <div className="text-center py-8 text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p>Select an IC to begin testing</p>
        </div>
      )}

      {!isConnected && selectedIC && (
        <div className="text-center py-8 text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          </svg>
          <p>Connect to device to start testing</p>
        </div>
      )}

      {isConnected && selectedIC && (
        <div className="space-y-4">
          {/* Selected IC Info */}
          {icData && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{icData.name}</h3>
              <p className="text-sm text-gray-600">{icData.description}</p>
            </div>
          )}

          {/* Test Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={runTest}
              disabled={isRunning}
              className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Run Test</span>
            </button>

            <button
              onClick={() => setShowPinConfig(!showPinConfig)}
              className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Pin Config</span>
            </button>

            <button
              onClick={runBoardTest}
              disabled={isRunning}
              className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              <span>Board Test</span>
            </button>

            <button
              onClick={enterSleepMode}
              disabled={isRunning}
              className="flex items-center justify-center space-x-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <span>Sleep Mode</span>
            </button>
          </div>

          {/* Pin Configuration */}
          {showPinConfig && icData && (
            <div className="border border-gray-200 rounded-lg p-4 max-h-64 overflow-y-auto">
              <h4 className="font-semibold text-gray-900 mb-3">Pin Configuration</h4>
              <div className="grid grid-cols-2 gap-2">
                {generatePinConfiguration().map((pin) => (
                  <div
                    key={pin.number}
                    className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded border border-gray-200"
                  >
                    <span className="font-mono text-sm font-semibold text-gray-900">
                      {pin.number}
                    </span>
                    <span className="text-xs text-gray-600">{pin.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      pin.type === 'Power' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {pin.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Running Indicator */}
          {isRunning && (
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <svg className="animate-spin h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-yellow-800 font-medium">Running test...</span>
              </div>
            </div>
          )}

          {/* Test Result */}
          {testResult && (
            <div className={`border p-4 rounded-lg ${
              testResult.status === 'success'
                ? 'bg-green-50 border-green-200'
                : testResult.status === 'failure'
                ? 'bg-red-50 border-red-200'
                : 'bg-yellow-50 border-yellow-200'
            }`}>
              <div className="flex items-start space-x-3">
                <svg
                  className={`w-6 h-6 flex-shrink-0 ${
                    testResult.status === 'success'
                      ? 'text-green-600'
                      : testResult.status === 'failure'
                      ? 'text-red-600'
                      : 'text-yellow-600'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {testResult.status === 'success' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  ) : testResult.status === 'failure' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  )}
                </svg>
                <div>
                  <p className={`font-semibold ${
                    testResult.status === 'success'
                      ? 'text-green-900'
                      : testResult.status === 'failure'
                      ? 'text-red-900'
                      : 'text-yellow-900'
                  }`}>
                    {testResult.message}
                  </p>
                  {testResult.details && (
                    <p className={`text-sm mt-1 ${
                      testResult.status === 'success'
                        ? 'text-green-700'
                        : testResult.status === 'failure'
                        ? 'text-red-700'
                        : 'text-yellow-700'
                    }`}>
                      {testResult.details}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
