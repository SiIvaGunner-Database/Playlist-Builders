/**
 * Rebuild a playlist with the 50 most recent videos from the SiIvaGunner channel.
 */
function rebuildRecentVidsPlaylist() {
  // Empty the current playlist
  const playlistId = "PLn8P5M1uNQk68YEXoZYybM41Kc8GK8-8q"
  const playlistResponse = YouTube.PlaylistItems.list("snippet", { "playlistId": playlistId, "maxResults": 50 })

  playlistResponse.items.forEach((item, index) => {
    console.log(`#${index + 1} - remove ${item.id}`)
    YouTube.PlaylistItems.remove(item.id)
  })

  // Add the new rips to the playlist
  const channelId = "UC9ecwl3FTG66jIKA9JRDtmg"
  const channelResults = YouTube.Channels.list("contentDetails", { "id": channelId })
  const uploadsPlaylistId = channelResults.items[0].contentDetails.relatedPlaylists.uploads
  const uploadsPlaylistResponse = YouTube.PlaylistItems.list("snippet", { "playlistId": uploadsPlaylistId, "maxResults": 50 })

  uploadsPlaylistResponse.items.forEach((item, index) => {
    const videoId = item.snippet.resourceId.videoId
    console.log(`#${index + 1} - insert ${videoId}`)
    const insertOptions = {
      "snippet": {
        "playlistId": playlistId,
        "resourceId": {
          "kind": "youtube#video",
          "videoId": videoId
        }
      }
    }
    YouTube.PlaylistItems.insert(insertOptions, "snippet")
  })
}
