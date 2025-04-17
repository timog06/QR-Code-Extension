document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const qrcodeElement = document.getElementById('qrcode');
    const qrTextElement = document.getElementById('qr-text');
    const downloadBtn = document.getElementById('download-btn');
    const copyBtn = document.getElementById('copy-btn');
  
    let qrCode = null;
  
    // Function to generate QR code
    function generateQRCode(text) {
      // Clear previous QR code
      qrcodeElement.innerHTML = '';
  
      if (!text || text.trim() === '') {
        qrTextElement.textContent = 'No text provided for QR code generation';
        return;
      }
  
      // Create new QR code
      qrCode = new QRCode(qrcodeElement, {
        text: text,
        width: 200,
        height: 200,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      });
  
      // Display the text
      qrTextElement.textContent = text;
    }
  
    // Download QR code as image
    downloadBtn.addEventListener('click', function() {
      if (!qrCode) return;
  
      const canvas = qrcodeElement.querySelector('canvas');
      if (canvas) {
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    });
  
    // Copy QR code to clipboard
    copyBtn.addEventListener('click', function() {
      const canvas = qrcodeElement.querySelector('canvas');
      if (canvas) {
        canvas.toBlob(function(blob) {
          const item = new ClipboardItem({ 'image/png': blob });
          navigator.clipboard.write([item])
            .then(() => alert('QR code copied to clipboard!'))
            .catch(err => console.error('Error copying QR code: ', err));
        });
      }
    });
  
    // Handle messages from background script
    browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.action === 'generateQR' && request.text) {
        generateQRCode(request.text);
      } else if (request.action === 'textSelected' && request.text) {
        generateQRCode(request.text);
        browser.browserAction.setBadgeText({text: '!'});
      }
    });
  
    // Check for new QR text or last generated QR code
    browser.storage.local.get(['qrText', 'lastQRText'], function(result) {
      // Clear the badge when popup opens
      browser.browserAction.setBadgeText({text: ''});
    
      if (result.qrText) {
        generateQRCode(result.qrText);
        // Store as last QR code and clear current
        browser.storage.local.set({ lastQRText: result.qrText }, () => {
          browser.storage.local.remove(['qrText']);
        });
      } else if (result.lastQRText) {
        generateQRCode(result.lastQRText);
      } else {
        // If no QR code exists yet, show instructions
        qrTextElement.textContent = 'Use right-click or Alt+Shift+Q to generate a QR code';
      }
    });

    // Listen for shortcut presses while popup is open
    browser.commands.onCommand.addListener((command) => {
      if (command === "generate-qr") {
        // Refresh the QR code display
        browser.storage.local.get(['lastQRText'], function(result) {
          if (result.lastQRText) {
            generateQRCode(result.lastQRText);
          }
        });
      }
    });
  });
