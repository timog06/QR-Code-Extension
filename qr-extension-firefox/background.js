// Initialize context menu
browser.runtime.onInstalled.addListener(() => {
  browser.contextMenus.create({
    id: "generateQR", 
    title: "Generate QR Code",
    contexts: ["selection", "link", "page"]
  });
});

// Track last selection
let lastSelectedText = '';

// Listen for selection changes
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && !tab.url.startsWith('about:')) {
    try {
      browser.tabs.executeScript(tabId, {
        code: `
          document.addEventListener('selectionchange', () => {
            const selection = window.getSelection().toString().trim();
            if (selection) {
              browser.runtime.sendMessage({
                action: "textSelected",
                text: selection
              });
            }
          });
        `
      });
    } catch (err) {
      console.log("Cannot execute script on this page:", err);
    }
  }
});

// Handle selection messages
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "textSelected") {
    lastSelectedText = request.text;
    browser.storage.local.set({
      qrText: request.text,
      lastQRText: request.text
    });
  }
});

// Handle context menu clicks
browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "generateQR") {
    let textToEncode = "";
    
    if (info.selectionText) {
      textToEncode = info.selectionText;
    } else if (info.linkUrl) {
      textToEncode = info.linkUrl;
    }
    
    if (textToEncode) {
      // Store the text in local storage for the popup to access
      browser.storage.local.set({ qrText: textToEncode }, function() {
        // Try to open the popup
        try {
          browser.browserAction.openPopup();
        } catch (e) {
          console.log("Could not open popup automatically:", e);
          // Set badge as fallback
          browser.browserAction.setBadgeText({text: '!'});
          browser.browserAction.setBadgeBackgroundColor({color: '#4285f4'});
        }
      });
    }
  }
});

// Store last generated QR code
let lastGeneratedText = '';

// Handle keyboard shortcut
browser.commands.onCommand.addListener(async (command) => {
  if (command === "generate-qr") {
    console.log("Keyboard shortcut triggered: Alt+Shift+Q");
    
    // Try to get selected text via content script
    try {
      const tabs = await browser.tabs.query({active: true, currentWindow: true});
      if (tabs && tabs.length > 0 && !tabs[0].url.startsWith('about:')) {
        try {
          // Execute script to get selected text
          const result = await browser.tabs.executeScript(tabs[0].id, {
            code: "window.getSelection().toString().trim()"
          });
          
          if (result && result[0]) {
            const selectedText = result[0];
            console.log("Got selected text:", selectedText);
            
            // Use selected text for QR code
            lastGeneratedText = selectedText;
            await browser.storage.local.set({ 
              qrText: selectedText,
              lastQRText: selectedText 
            });
            
            // Show notification
            browser.notifications.create({
              type: 'basic',
              title: 'QR Code Generated',
              message: 'QR code created from selected text'
            });
            
            // Try to open popup
            try {
              browser.browserAction.openPopup();
            } catch (e) {
              console.log("Could not open popup automatically:", e);
              // Set badge as fallback
              browser.browserAction.setBadgeText({text: '!'});
              browser.browserAction.setBadgeBackgroundColor({color: '#4285f4'});
            }
            
            return;
          }
        } catch (scriptErr) {
          console.log("Script execution error:", scriptErr);
        }
      }
    } catch (err) {
      console.log("Error accessing selection:", err);
    }
    
    // If selection access failed, try to use last generated text
    if (lastGeneratedText) {
      await browser.storage.local.set({ 
        qrText: lastGeneratedText,
        lastQRText: lastGeneratedText 
      });
      
      browser.notifications.create({
        type: 'basic',
        title: 'QR Code Generated',
        message: 'Using last generated text'
      });
      
      // Try to open popup
      try {
        browser.browserAction.openPopup();
      } catch (e) {
        console.log("Could not open popup automatically:", e);
        // Set badge as fallback
        browser.browserAction.setBadgeText({text: '!'});
        browser.browserAction.setBadgeBackgroundColor({color: '#4285f4'});
      }
    } else {
      browser.notifications.create({
        type: 'basic',
        title: 'QR Code Generator',
        message: 'No text selected. Select text first.'
      });
    }
  }
});
