function rebuildRecentVidsPlaylist()
{
  var currentDate = new Date().toISOString();
  var playlistId = "PLn8P5M1uNQk68YEXoZYybM41Kc8GK8-8q";
  var ripList = SpreadsheetApp.openById("1Ay8mIwv99hBDSym0o_vol0tgRyUtRFH02fEEM79v_64").getSheetByName("List of Rips");
  //ripList.getRange("A2:P19000").sort({column: 4, ascending: false});
  var newRips = ripList.getRange("C2:C51").getValues();
  var count = 0;
  
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
  for (i in newRips)
  {
    count = (parseInt(i) + 1).toString();
    Logger.log("#" + count + " - Add: " + newRips[i]);

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
  }
}

// Create a trigger to rebuild the playlist daily.
function rebuildRecentVidsPlaylistTrigger()
{
  ScriptApp.newTrigger('rebuildRecentVidsPlaylist')
  .timeBased()
  .everyDays(1)
  .atHour(0)
  .create();
}
