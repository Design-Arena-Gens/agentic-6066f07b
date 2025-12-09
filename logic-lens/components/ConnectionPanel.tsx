'use client';

import { useState, useEffect } from 'react';

interface ConnectionPanelProps {
  isConnected: boolean;
  setIsConnected: (connected: boolean) => void;
}

type ConnectionType = 'bluetooth' | 'wifi';
type BluetoothMode = 'classic' | 'ble';

export default function ConnectionPanel({ isConnected, setIsConnected }: ConnectionPanelProps) {
  const [connectionType, setConnectionType] = useState<ConnectionType>('bluetooth');
  const [bluetoothMode, setBluetoothMode] = useState<BluetoothMode>('classic');
  const [devices, setDevices] = useState<any[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [wifiSSID, setWifiSSID] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [status, setStatus] = useState('Not connected');

  const scanForDevices = async () => {
    setIsScanning(true);
    setStatus('Scanning...');

    // Simulate device scanning
    setTimeout(() => {
      const mockDevices = [
        { id: 'esp32-001', name: 'Logic Tester ESP32', type: connectionType, mode: bluetoothMode },
        { id: 'esp32-002', name: 'ESP32-DevKit', type: connectionType, mode: bluetoothMode },
      ];
      setDevices(mockDevices);
      setIsScanning(false);
      setStatus(`Found ${mockDevices.length} device(s)`);
    }, 2000);

    // For real implementation:
    if (connectionType === 'bluetooth' && typeof navigator !== 'undefined' && 'bluetooth' in navigator) {
      try {
        // Web Bluetooth API (BLE only)
        // const device = await navigator.bluetooth.requestDevice({
        //   acceptAllDevices: true,
        //   optionalServices: ['battery_service']
        // });
        // setDevices([device]);
      } catch (error) {
        console.error('Bluetooth error:', error);
      }
    }
  };

  const connectToDevice = async () => {
    if (!selectedDevice) return;

    setStatus('Connecting...');

    // Simulate connection
    setTimeout(() => {
      setIsConnected(true);
      setStatus('Connected to ' + devices.find(d => d.id === selectedDevice)?.name);
    }, 1500);

    // Real implementation would connect via Web Bluetooth or WebSocket
  };

  const disconnect = () => {
    setIsConnected(false);
    setSelectedDevice(null);
    setStatus('Disconnected');
  };

  const connectViaWifi = async () => {
    if (!wifiSSID) return;

    setStatus('Connecting to WiFi...');

    // Simulate WiFi connection
    setTimeout(() => {
      setIsConnected(true);
      setStatus('Connected via WiFi');
    }, 2000);

    // Real implementation would use WebSocket or HTTP to ESP32
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Device Connection</h2>

      {/* Connection Type Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Connection Type</label>
        <div className="flex space-x-2">
          <button
            onClick={() => setConnectionType('bluetooth')}
            className={`flex-1 py-2 px-4 rounded-lg transition duration-200 ${
              connectionType === 'bluetooth'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Bluetooth
          </button>
          <button
            onClick={() => setConnectionType('wifi')}
            className={`flex-1 py-2 px-4 rounded-lg transition duration-200 ${
              connectionType === 'wifi'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            WiFi
          </button>
        </div>
      </div>

      {connectionType === 'bluetooth' && (
        <>
          {/* Bluetooth Mode */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Bluetooth Mode</label>
            <div className="flex space-x-2">
              <button
                onClick={() => setBluetoothMode('classic')}
                className={`flex-1 py-2 px-4 rounded-lg transition duration-200 ${
                  bluetoothMode === 'classic'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Classic
              </button>
              <button
                onClick={() => setBluetoothMode('ble')}
                className={`flex-1 py-2 px-4 rounded-lg transition duration-200 ${
                  bluetoothMode === 'ble'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                BLE
              </button>
            </div>
          </div>

          {/* Scan Button */}
          {!isConnected && (
            <button
              onClick={scanForDevices}
              disabled={isScanning}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 mb-4"
            >
              {isScanning ? 'Scanning...' : 'Scan for Devices'}
            </button>
          )}

          {/* Device List */}
          {devices.length > 0 && !isConnected && (
            <div className="mb-4 border border-gray-200 rounded-lg max-h-40 overflow-y-auto">
              {devices.map((device) => (
                <button
                  key={device.id}
                  onClick={() => setSelectedDevice(device.id)}
                  className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-blue-50 transition duration-150 ${
                    selectedDevice === device.id ? 'bg-blue-100 border-l-4 border-l-blue-600' : ''
                  }`}
                >
                  <div className="font-medium text-gray-900">{device.name}</div>
                  <div className="text-xs text-gray-500">{device.id}</div>
                </button>
              ))}
            </div>
          )}

          {/* Connect Button */}
          {selectedDevice && !isConnected && (
            <button
              onClick={connectToDevice}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 mb-4"
            >
              Connect
            </button>
          )}
        </>
      )}

      {connectionType === 'wifi' && !isConnected && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ESP32 IP Address / Hostname
            </label>
            <input
              type="text"
              value={wifiSSID}
              onChange={(e) => setWifiSSID(e.target.value)}
              placeholder="192.168.1.100"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Port (Optional)
            </label>
            <input
              type="text"
              value={wifiPassword}
              onChange={(e) => setWifiPassword(e.target.value)}
              placeholder="80"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={connectViaWifi}
            disabled={!wifiSSID}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            Connect via WiFi
          </button>
        </div>
      )}

      {/* Connection Status */}
      <div className={`p-4 rounded-lg ${
        isConnected ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700">Status</p>
            <p className={`text-sm ${isConnected ? 'text-green-700' : 'text-gray-600'}`}>
              {status}
            </p>
          </div>
          <div className={`w-3 h-3 rounded-full ${
            isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
          }`} />
        </div>
      </div>

      {/* Disconnect Button */}
      {isConnected && (
        <button
          onClick={disconnect}
          className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
        >
          Disconnect
        </button>
      )}
    </div>
  );
}
