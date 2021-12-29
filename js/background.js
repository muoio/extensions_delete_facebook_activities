chrome.runtime.onMessage.addListener(async function(message, sender, callback) {
    if (message.greeting == "open_activity"){
        chrome.tabs.update({url: "https://www.facebook.com/me/allactivity/"});
    }
});