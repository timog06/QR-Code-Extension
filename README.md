# QR Code Generator Chrome Extension

This Chrome extension allows you to quickly generate QR codes from selected text, links, or clipboard content.

## Features

- Right-click on selected text or links to generate a QR code
- Use keyboard shortcut Alt+Shift+Q to generate a QR code from clipboard content
- All QR code generation happens locally in your browser
- Download or copy generated QR codes

## Installation for Development

### Prerequisites

- Google Chrome browser
- Visual Studio Code

### Setup Instructions

1. Clone or download this repository to your local machine

2. Open the project in Visual Studio Code:
   ```
   code qr-extension
   ```

3. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" using the toggle in the top-right corner
   - Click "Load unpacked" and select the `qr-extension` folder

4. The extension should now be installed and visible in your Chrome toolbar

## Usage

- **Right-click menu**: Select text or right-click on a link, then choose "Generate QR Code" from the context menu
- **Keyboard shortcut**: Copy text to clipboard, then press Alt+Shift+Q

## Development

If you make changes to the extension code:

1. Edit the files in Visual Studio Code
2. Save your changes
3. Go to Chrome's extension page (`chrome://extensions/`)
4. Find the QR Code Generator extension and click the refresh icon

## Project Structure

- `manifest.json`: Extension configuration
- `background.js`: Handles context menu and keyboard shortcuts
- `popup/`: Contains the UI for displaying QR codes
- `lib/`: Contains the QRCode.js library for generating QR codes
- `icons/`: Extension icons

## License

This project uses the QRCode.js library which is licensed under the MIT license.
