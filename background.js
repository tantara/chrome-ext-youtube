      var YoutubeDownloader = {
        start: function() {
          this.active = true;
	  localStorage['youtube-downloader'] = true;
	  chrome.browserAction.setBadgeText({
            text: "O"
          });
        },

        stop: function() {
          this.active = false;
	  localStorage['youtube-downloader'] = false;
	  chrome.browserAction.setBadgeText({
            text: "X"
          });
        }
      };

	if(localStorage['youtube-downloader'] == "true") {
      YoutubeDownloader.active = true;
      } else {
      YoutubeDownloader.active = false;
      }

      chrome.browserAction.onClicked.addListener(function(tab) {
        YoutubeDownloader[YoutubeDownloader.active ? 'stop' : 'start']();
	chrome.tabs.sendRequest(tab.id, {active: YoutubeDownloader.active});
      });
        YoutubeDownloader[YoutubeDownloader.active ? 'start' : 'stop']();

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
      sendResponse({active: localStorage['youtube-downloader']});
});
