// Blacklist settings

// Add website to list
function addWebsite() {
    let url = document.getElementById("websiteInput").value;
    chrome.storage.sync.get("websites", (data) => {
        let websites = data.websites || [];
        console.log(url);
        if (!websites.includes(url)) {
            websites.push(url);
            chrome.storage.sync.set({ websites: websites }, () => {
                displayWebsites({ websites: websites });
                document.getElementById('websiteInput').value = '';
            });
        } else {
            alert("Website already blacklisted");
        }

        websites.forEach(url => {
            let wildcardUrl = `https://www.${url}/*`;
            let wildcardUrlHttp = `http://www.${url}/*`;
            chrome.permissions.request({
                origins: [wildcardUrl, wildcardUrlHttp]
            }, (granted) => {
                if (granted) {
                    console.log(`Permission granted for ${wildcardUrl}`);
                } else {
                    console.log(`Permission denied for ${wildcardUrl}`);
                }
            });
        });
        console.log(data.websites); 
    });
};
// display website list
function displayWebsites(data) {
    let websiteList = document.getElementById("websiteList");
    websiteList.innerHTML = ''; // Clear existing list

    let websites = data.websites || [];
    websites.forEach(element => {
        var li = document.createElement("li");
        var text = document.createTextNode(element);
        li.appendChild(text);
        websiteList.appendChild(li);
    });
}

// remove websites from list
document.getElementById('removeButton').addEventListener('click', function() {
    chrome.storage.sync.get("websites", (data) => {
        let urlToRemove = document.getElementById('websiteOutput').value;
        let index = data.websites.indexOf(urlToRemove);
        if (index !== -1) {
            data.websites.splice(index, 1);
            chrome.storage.sync.set({ websites: data.websites }, () => {
                displayWebsites(data);
                document.getElementById('websiteOutput').value = '';
            });            
            if (urlToRemove.startsWith("http://www.")) {
                urlToRemove = urlToRemove.slice(11);
            } else if (urlToRemove.startsWith("https://www.")) {
                urlToRemove = urlToRemove.slice(12);
            }
            let parsedUrl = new URL("https://www." + urlToRemove);
            let hostname = parsedUrl.hostname;
            let originPattern = `*://www.${hostname}/*`;
            chrome.permissions.remove({
                origins: [originPattern]
            });
            var ul = document.getElementById("websiteList");
            var items = ul.getElementsByTagName("li");
            for (var i = 0; i < items.length; ++i) {
                if (items[i].textContent == urlToRemove) {
                ul.removeChild(items[i]);
                }
            };

            document.getElementById('websiteOutput').value = '';
        } else {
            alert("Website not found in blacklist");
        }
    });
});

// button for adding website
document.getElementById("addWebsiteButton").addEventListener("click", addWebsite);

// display blacklist of websites
document.addEventListener("DOMContentLoaded", function() {
    chrome.storage.sync.get("websites", function(websites) {
        displayWebsites(websites);
    });
});