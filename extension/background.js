chrome.tabs.onUpdated.addListener((tabId,tab) => {
    if (tab.url && tab.url.includes("https://mail.google.com/mail/u/")){
        const queryParameters = tab.url.split("?")[1];
        const urlParameters = new URLSearchParams(queryParameters);
        chrome.tabs.sendMessage(tabId, {
            type: "NEW",
          });
    }
})