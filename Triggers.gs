// Rebuilds the necessary playlists.
function rebuildPlaylists() {
  rebuildTenRipsPlaylist();
  rebuildRecentVidsPlaylist();
}

// Creates a trigger to call once a day.
function rebuildPlaylistsTrigger() {
  ScriptApp.newTrigger("rebuildPlaylists")
  .timeBased()
  .everyDays(1)
  .atHour(23)
  .create();
}
