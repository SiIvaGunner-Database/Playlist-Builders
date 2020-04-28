function rebuildRecentVidsPlaylist()
{
  var currentDate = new Date().toISOString();
  var playlistId = "PLn8P5M1uNQk68YEXoZYybM41Kc8GK8-8q";
  var ripList = SpreadsheetApp.openById("1Ay8mIwv99hBDSym0o_vol0tgRyUtRFH02fEEM79v_64").getSheetByName("List of Rips");
  //ripList.getRange("A2:P19000").sort({column: 4, ascending: false});
  var newRips = ripList.getRange("C2:C61").getValues();
  var count = 0;
  var finalCount = 50;
  // Empty the current playlist.
  var playlistResponse = YouTube.PlaylistItems.list('snippet', 
                                                    {
                                                      playlistId: playlistId,
                                                      maxResults: 50
                                                    });

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
    count = (parseInt(i) + 1).toString();
    Logger.log("#" + count + " - Add: " + newRips[i]);
    
    try
    {
      YouTube.PlaylistItems.insert
      ({
        snippet: 
        {
          playlistId: playlistId,
          resourceId: 
          {
            kind: "youtube#video",
            videoId: newRips[i]
          }
        }
      }, "snippet");
    } catch (e)
    {
      Logger.log(e);
      finalCount++;
    }
  }
}
