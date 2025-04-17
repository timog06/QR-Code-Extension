// Initialize context menu
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "generateQR", 
    title: "Generate QR Code",
    contexts: ["selection", "link", "page"]
  });
});

// Track last selection
let lastSelectedText = '';

// Listen for selection changes
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && !tab.url.startsWith('chrome://')) {
    try {
      chrome.scripting.executeScript({
        target: {tabId: tabId},
        func: () => {
          document.addEventListener('selectionchange', () => {
            const selection = window.getSelection().toString().trim();
            if (selection) {
              chrome.runtime.sendMessage({
                action: "textSelected",
                text: selection
              });
            }
          });
        }
      });
    } catch (err) {
      console.log("Cannot execute script on this page:", err);
    }
  }
});

// Handle selection messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "textSelected") {
    lastSelectedText = request.text;
    chrome.storage.local.set({
      qrText: request.text,
      lastQRText: request.text
    });
  }
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "generateQR") {
    let textToEncode = "";
    
    if (info.selectionText) {
      textToEncode = info.selectionText;
    } else if (info.linkUrl) {
      textToEncode = info.linkUrl;
    }
    
    if (textToEncode) {
      // Store the text in local storage for the popup to access
      chrome.storage.local.set({ qrText: textToEncode }, function() {
        // Open the popup
        chrome.action.openPopup();
      });
    }
  }
});

// Store last generated QR code
let lastGeneratedText = '';

// Handle keyboard shortcut
chrome.commands.onCommand.addListener(async (command) => {
  if (command === "generate-qr") {
    console.log("Keyboard shortcut triggered: Alt+Shift+Q");
    
    // Try to get selected text via content script
    try {
      const tabs = await chrome.tabs.query({active: true, currentWindow: true});
      if (tabs && tabs.length > 0 && !tabs[0].url.startsWith('chrome://')) {
        try {
          // Execute script to get selected text
          const result = await chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            func: () => {
              return window.getSelection().toString().trim();
            }
          });
          
          if (result && result[0] && result[0].result) {
            const selectedText = result[0].result;
            console.log("Got selected text:", selectedText);
            
            // Use selected text for QR code
            lastGeneratedText = selectedText;
            await chrome.storage.local.set({ 
              qrText: selectedText,
              lastQRText: selectedText 
            });
            
            // Show notification
            chrome.notifications.create({
              type: 'basic',
              iconUrl: 'icons/icon128.png',
              title: 'QR Code Generated',
              message: 'QR code created from selected text',
              priority: 0
            });
            
            // Set badge and try to open popup
            chrome.action.setBadgeText({text: '!'});
            chrome.action.setBadgeBackgroundColor({color: '#4285f4'});
            
            try {
              await chrome.action.openPopup();
            } catch (e) {
              console.log("Could not open popup automatically, click the extension icon");
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
      await chrome.storage.local.set({ 
        qrText: lastGeneratedText,
        lastQRText: lastGeneratedText 
      });
      
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon128.png',
        title: 'QR Code Generated',
        message: 'Using last generated text',
        priority: 0
      });
      
      chrome.action.setBadgeText({text: '!'});
      chrome.action.setBadgeBackgroundColor({color: '#4285f4'});
      
      try {
        await chrome.action.openPopup();
      } catch (e) {
        console.log("Could not open popup automatically, click the extension icon");
      }
    } else {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon128.png',
        title: 'QR Code Generator',
        message: 'No text selected. Select text first.',
        priority: 0
      });
    }
  }
});
