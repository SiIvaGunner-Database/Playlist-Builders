/**
 *  Rebuild the necessary playlists.
 */
function rebuildPlaylists() {
  rebuildTenRipsPlaylist()
  rebuildRecentVidsPlaylist()
}

/**
 * Create a trigger to call rebuildPlaylists once a day.
 */
function rebuildPlaylistsTrigger() {
  ScriptApp.newTrigger("rebuildPlaylists")
    .timeBased()
    .everyDays(1)
    .atHour(23)
    .create()
}
