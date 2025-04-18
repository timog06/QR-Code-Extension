# QR Code Generator Browser Extension

This Browser extension allows you to quickly generate QR codes from selected text, links, or clipboard content. It works in both Chrome and Firefox.

## Features

- Right-click on selected text or links to generate a QR code
- Use keyboard shortcut Alt+Shift+Q to generate a QR code from clipboard content
- All QR code generation happens locally in your browser
- Download or copy generated QR codes

## Installation for Development

### Prerequisites

- Google Chrome or Firefox browser
- Visual Studio Code

### Chrome Setup Instructions

1. Clone or download this repository to your local machine

2. Open the project in Visual Studio Code:
   ```
   code qr-extension
   ```

3. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" using the toggle in the top-right corner
   - Click "Load unpacked" and select the `qr-extension-chrome` folder

4. The extension should now be installed and visible in your Chrome toolbar

### Firefox Setup Instructions

1. Clone or download this repository to your local machine

2. Open the project in Visual Studio Code:
   ```
   code qr-extension-firefox
   ```

3. Load the extension in Firefox:
   - Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
   - Click "Load Temporary Add-on..."
   - Select the `manifest.json` file in the `qr-extension-firefox` folder
   - The extension will be loaded temporarily and will remain until Firefox is restarted

4. The extension should now be installed and visible in your Firefox toolbar

## Usage

- **Right-click menu**: Select text or right-click on a link, then choose "Generate QR Code" from the context menu
- **Keyboard shortcut**: Copy text to clipboard, then press Alt+Shift+Q

## Project Structure

- `manifest.json`: Extension configuration
- `background.js`: Handles context menu and keyboard shortcuts
- `popup/`: Contains the UI for displaying QR codes
- `lib/`: Contains the QRCode.js library for generating QR codes

