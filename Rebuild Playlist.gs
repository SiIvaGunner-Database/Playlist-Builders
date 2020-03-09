function rebuildPlaylist()
{
  var playlistId = "PLn8P5M1uNQk4336xHrr0boOX-3fLJGeLP";
  var spreadsheet = SpreadsheetApp.openById("1Ay8mIwv99hBDSym0o_vol0tgRyUtRFH02fEEM79v_64");
  var ripList = spreadsheet.getSheetByName("SiIvaGunner");
  var ripCount = spreadsheet.getSheetByName("Summary").getRange("B1").getValue();
  var ripsToAdd = [];
  var duplicate = false;
  var count = 0;
  
  // Find ten random rips.
  while (count < 10)
  {
    var row = Math.floor((Math.random() * ripCount) + 2);
    var rip = ripList.getRange(row, 3).getValue();
    
    for (var i in ripsToAdd)
    {
      if (ripsToAdd[i] == rip)
        duplicate = true;
    }
    
    if (!duplicate)
    {
      ripsToAdd.push(rip);
      count++;
    }
    
    duplicate = false;
  }
  
  // Empty the current playlist.
  var playlistResponse = YouTube.PlaylistItems.list('snippet', 
                                                    {
                                                      playlistId: playlistId,
                                                      maxResults: 20
                                                    });

  for (i = 0; i < playlistResponse.items.length; i++)
  {
    var id = playlistResponse.items[i].id;
    
    count = i + 1;
    Logger.log("#" + count + " - Delete: " + id);
    
    YouTube.PlaylistItems.remove(id);
  }

  // Add the new rips to the playlist.
  i = 0;
  for (i in ripsToAdd)
  {
    count = (parseInt(i) + 1).toString();
    Logger.log("#" + count + " - Add: " + ripsToAdd[i]);

    YouTube.PlaylistItems.insert
    ({
      snippet: 
      {
        playlistId: playlistId,
        resourceId: 
        {
          kind: "youtube#video",
          videoId: ripsToAdd[i]
        }
      }
    }, "snippet");
  }
}



// Create a trigger to rebuild the playlist daily.
function rebuildPlaylistTrigger()
{
  ScriptApp.newTrigger('rebuildPlaylist')
  .timeBased()
  .everyDays(1)
  .atHour(0)
  .create();
}
