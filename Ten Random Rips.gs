function rebuildTenRipsPlaylist()
{
  var playlistId = "PLn8P5M1uNQk4336xHrr0boOX-3fLJGeLP";
  var spreadsheetId = "1B7b9jEaWiqZI8Z8CzvFN1cBvLVYwjb5xzhWtrgs4anI";
  var ripSheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName("SiIvaGunner");
  var ripCount = ripSheet.getLastRow() - 1;
  var ripIds = [];
  var count = 0;
  
  // Empty the current playlist.
  var playlistResponse = YouTube.PlaylistItems.list("snippet", {playlistId: playlistId, maxResults: 50});
  
  for (var i = 0; i < playlistResponse.items.length; i++)
  {
    var id = playlistResponse.items[i].id;
    count = parseInt(i) + 1;
    Logger.log("#" + count + " - Delete: " + id);
    YouTube.PlaylistItems.remove(id);
  }
  
  // Find ten random rips.
  for (var i = 0; i < 10; i++)
  {
    var row = Math.floor((Math.random() * ripCount) + 2);
    var ripId = ripSheet.getRange(row, 3).getValue();
    ripIds.push(ripId);
    
    for (var k in ripIds)
    {
      if (ripIds[k] == ripId && k != ripIds.length - 1)
      {
        ripIds.pop();
        i--;
      }
    }
  }

  // Add the rips to the playlist.
  for (var i in ripIds)
  {
    count = parseInt(i) + 1;
    Logger.log("#" + count + " - Add: " + ripIds[i]);
    YouTube.PlaylistItems.insert({snippet: {playlistId: playlistId, resourceId: {kind: "youtube#video", videoId: ripsToAdd[i]}}}, "snippet");
  }
}
