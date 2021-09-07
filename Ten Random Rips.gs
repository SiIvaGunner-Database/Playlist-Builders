function rebuildTenRipsPlaylist() {
  var playlistId = "PLn8P5M1uNQk4336xHrr0boOX-3fLJGeLP";
  var spreadsheetId = "1B7b9jEaWiqZI8Z8CzvFN1cBvLVYwjb5xzhWtrgs4anI";
  var ripSheet = SpreadsheetApp.openById(spreadsheetId)
  var ripIds = [];
  var count = 0;
  
  // Empty the current playlist.
  var playlistResponse = YouTube.PlaylistItems.list("snippet", {playlistId: playlistId, maxResults: 50});
  
  for (var i in playlistResponse.items) {
    var id = playlistResponse.items[i].id;
    count = parseInt(i) + 1;
    Logger.log("#" + count + " - " + id);
    YouTube.PlaylistItems.remove(id);
  }
  
  // Find ten random rips.
  for (var i = 0; i < 10; i++) {
    var channelRand = Math.floor((Math.random() * 5) + 1);
    
    if (channelRand == 1)
      var channelName = "VvvvvaVvvvvvr";
    else if (channelRand == 2)
      var channelName = "TimmyTurnersGrandDad";
    else
      var channelName = "SiIvaGunner";
    
    count = parseInt(i) + 1;
    Logger.log("#" + count + " - " + channelName);
    
    var channelSheet = ripSheet.getSheetByName(channelName);
    var ripCount = channelSheet.getLastRow() - 1;
    var row = Math.floor((Math.random() * ripCount) + 2);
    var ripId = channelSheet.getRange(row, 1).getValue();
    var ripStatus = channelSheet.getRange(row, 4).getValue();
    
    if (ripStatus == "Public" || ripStatus == "Unlisted" && !ripIds.includes(ripId)) {
      ripIds.push(ripId);
    }
    else i--;
  }

  // Add the rips to the playlist.
  for (var i in ripIds) {
    count = parseInt(i) + 1;
    Logger.log("#" + count + " - " + ripIds[i]);
    YouTube.PlaylistItems.insert({snippet: {playlistId: playlistId, resourceId: {kind: "youtube#video", videoId: ripIds[i]}}}, "snippet");
  }
}
