# Logic Lens - IC Testing Application

Professional Logic IC Testing Solution for ESP32-based testers.

## Features

- 🔌 **Dual Connectivity**: Connect via Bluetooth (Classic & BLE) or WiFi
- 🔍 **IC Database**: Comprehensive library of 7400 series TTL, 4000 series CMOS, and 74HC series ICs
- 🧪 **Test Suite**: Run tests, check pin configurations, board tests, and sleep mode
- 🤖 **AI Assistant**: Get expert help with IC testing and troubleshooting (requires login)
- 👤 **User Accounts**: Secure authentication system
- 💻 **Cross-Platform**: Works on Windows, Android (web), and other platforms

## Installation

### Web Version (Vercel Deployment)

The application is deployed at: `https://agentic-6066f07b.vercel.app`

### Windows Desktop Application

1. Download the installer from releases
2. Run the installer
3. Choose installation directory
4. Select "Create desktop shortcut" option
5. Click "Launch Logic Lens" after installation

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run Electron app in development
npm run electron-dev

# Build Electron app for Windows
npm run electron-build
```

## Usage

1. **Create Account**: Sign up or login to access all features
2. **Connect Device**: Choose Bluetooth or WiFi connection method
3. **Select IC**: Search and select the IC you want to test
4. **Run Tests**: Use the test panel to perform various operations
5. **AI Assistant**: Click the AI Assistant button for help (login required)

## ESP32 Commands

The app sends these commands to your ESP32 tester:

- `RUN_TEST`: Execute IC functionality test
- `BOARD_TEST`: Test board connections
- `SLEEP_MODE`: Put device into low-power mode

## Supported ICs

- **TTL 7400 Series**: 7400, 7402, 7404, 7408, 7432, 7473, 7474, 7490, 7493, and more
- **CMOS 4000 Series**: 4011, 4012, 4013, 4017, 4020, 4027, 4040, 4049, 4050, 4069, 4071, 4081
- **CMOS 74HC Series**: 74HC00, 74HC04, 74HC08, 74HC32, 74HC74, 74HC138, 74HC595

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Desktop**: Electron
- **Deployment**: Vercel
- **APIs**: Web Bluetooth API, WebSocket for WiFi

## License

MIT License - See LICENSE file for details

## Support

For issues or questions, please open an issue on GitHub or contact support.
