// check to execute features
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        let newUrl = new URL(tab.url);
        // normalize hostname
        let hostname = newUrl.hostname.replace(/^www\./, '');
    
        chrome.storage.sync.get("websites", (data) => {
            if (data.websites && data.websites.includes(hostname)) {
                chrome.action.setIcon({
                    path: "images/poison-32.png",
                    tabId: tabId
                });

                // execute features
                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    files: ["features.js"]
                })
            }
        })
    }
});