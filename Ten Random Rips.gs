/**
 * Rebuild a playlist with ten randomly selected SiIvaGunner, VvvvvaVvvvvvr, and TimmyTurnersGrandDad videos.
 */
function rebuildTenRipsPlaylist() {
  // Empty the current playlist
  const playlistId = "PLn8P5M1uNQk4336xHrr0boOX-3fLJGeLP"
  const playlistOptions = { "playlistId": playlistId, "maxResults": 50 }
  const playlistResponse = YouTube.PlaylistItems.list("snippet", playlistOptions)

  playlistResponse.items.forEach((item, index) => {
    console.log(`#${index + 1} - remove ${item.id}`)
    YouTube.PlaylistItems.remove(item.id)
  })

  // Find ten random rips
  const spreadsheetId = "1B7b9jEaWiqZI8Z8CzvFN1cBvLVYwjb5xzhWtrgs4anI"
  const channelRipsSpreadsheet = SpreadsheetApp.openById(spreadsheetId)
  const videoIds = []

  for (let index = 0; index < 10; index++) {
    const channelRand = Math.floor((Math.random() * 5) + 1)
    let channelName = "SiIvaGunner"

    if (channelRand == 1) {
      channelName = "VvvvvaVvvvvvr"
    } else if (channelRand == 2) {
      channelName = "TimmyTurnersGrandDad"
    }

    console.log(`#${index + 1} - channel ${channelName}`)
    const channelSheet = channelRipsSpreadsheet.getSheetByName(channelName)
    const videoCount = channelSheet.getLastRow() - 1
    const randomSheetRow = Math.floor((Math.random() * videoCount) + 2)
    const videoId = channelSheet.getRange(randomSheetRow, 1).getValue()
    const videoStatus = channelSheet.getRange(randomSheetRow, 4).getValue()

    if (["Public", "Unlisted"].includes(videoStatus) === true && videoIds.includes(videoId) === false) {
      videoIds.push(videoId)
    } else {
      index--
    }
  }

  // Add the rips to the playlist
  videoIds.forEach((videoId, index) => {
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
