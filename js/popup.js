
var open_activity = document.getElementById("open_activity");
var state_button = document.getElementById("set_control");
var progress = document.getElementById("progress");

/*xoanhatky.onclick = function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "xoanhatky", tabId:tabs[0].id});
    });
}
xoabaidang.onclick = function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "xoabaidang", tabId:tabs[0].id});
    });
}*/
open_activity.onclick = function(){
    chrome.runtime.sendMessage({greeting: "open_activity"});
}
chrome.storage.local.get(['state','progress'], function(data) {
    if(data.state == true)
        control1_theme_start();
    else control1_theme_end();
    if (data.progress != null)
        progress.value = data.progress;
});
chrome.storage.onChanged.addListener(function(changes, namespace) {
    for(key in changes) {
      if(key === 'progress') {
        chrome.storage.local.get('progress', function(data) {
            progress.value = data.progress;
        });
      }
    }
});
function control1_theme_start(){
    state_button.style.backgroundColor = "brown";
    state_button.innerText = "Stop";
}
function control1_theme_end(){
    state_button.style.backgroundColor = "green";
    state_button.innerText = "Start";
}
state_button.onclick = function(){
    if (state_button.innerText == "Start"){
        chrome.storage.local.set({state:true});
        control1_theme_start();
    }
    else if (state_button.innerText == "Stop") {
        chrome.storage.local.set({state:false});
        control1_theme_end();
    }
}