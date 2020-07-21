function rebuildRecentVidsPlaylist()
{
  var playlistId = "PLn8P5M1uNQk68YEXoZYybM41Kc8GK8-8q";
  var channelId = "UC9ecwl3FTG66jIKA9JRDtmg";
  
  // Empty the current playlist.
  var playlistResponse = YouTube.PlaylistItems.list("snippet", {playlistId: playlistId, maxResults: 50});
  var count = 0;

  for (var i = 0; i < playlistResponse.items.length; i++)
  {
    var id = playlistResponse.items[i].id;
    count++;
    Logger.log("#" + count + " - Delete: " + id);
    YouTube.PlaylistItems.remove(id);
  }

  // Add the new rips to the playlist.
  var results = YouTube.Channels.list("contentDetails", {id: channelId});
  var uploadsPlaylistId = results.items[0].contentDetails.relatedPlaylists.uploads;
  var playlistResponse = YouTube.PlaylistItems.list("snippet", {playlistId: uploadsPlaylistId, maxResults: 50});
  var count = 0;
  
  for (var i = 0; i < playlistResponse.items.length; i++)
  {
    var videoId = playlistResponse.items[i].snippet.resourceId.videoId;
    count++;
    Logger.log("#" + count + " - Add: " + videoId);
    YouTube.PlaylistItems.insert({snippet: {playlistId: playlistId, resourceId: {kind: "youtube#video", videoId: videoId}}}, "snippet");
  }
}
