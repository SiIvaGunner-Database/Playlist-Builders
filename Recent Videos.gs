function rebuildRecentVidsPlaylist()
{
  var currentDate = new Date().toISOString();
  var playlistId = "PLn8P5M1uNQk68YEXoZYybM41Kc8GK8-8q";
  var ripList = SpreadsheetApp.openById("1B7b9jEaWiqZI8Z8CzvFN1cBvLVYwjb5xzhWtrgs4anI").getSheetByName("List of Rips");
  var newRips = ripList.getRange("C2:C61").getValues();
  var count = 0;
  var finalCount = 50;
  
  // Empty the current playlist.
  var playlistResponse = YouTube.PlaylistItems.list('snippet', {playlistId: playlistId, maxResults: 50});

  for (i = 0; i < playlistResponse.items.length; i++)
  {
    var id = playlistResponse.items[i].id;
    
    count = i + 1;
    Logger.log("#" + count + " - Delete: " + id);
    
    YouTube.PlaylistItems.remove(id);
  }

  // Add the new rips to the playlist.
  for (i = 0; i < finalCount; i++)
  {
    if (finalCount > 60)
      break;
    
    count = (parseInt(i) + 1).toString();
    Logger.log("#" + count + " - Add: " + newRips[i][0]);
    
    try
    {
      YouTube.PlaylistItems.insert({snippet: {playlistId: playlistId, resourceId: {kind: "youtube#video", videoId: newRips[i][0]}}}, "snippet");
    } catch (e)
    {
      Logger.log(e);
      finalCount++;
    }
  }
}
