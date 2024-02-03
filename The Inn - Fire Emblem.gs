/**
 * "The Inn - Fire Emblem" is a high quality rip of "The Inn" from Fire Emblem.
 */
function theInnFireEmblem() {
  // The Inn - Fire Emblem
  for (let i = 0; i < 155; i++) {
    console.log("The Inn - Fire Emblem")
    const theOptionsFireEmblem = {
      "snippet":  {
        "playlistId": "PLn8P5M1uNQk7hJWh8jPlpbhvvxex_QfI5", // Fire Emblem
        "resourceId":  {
          "kind": "youtube#video",
          "videoId": "NzoneDE0A2o" // The Inn
        }
      }
    }
    YouTube.PlaylistItems.insert(theOptionsFireEmblem, "snippet")
  }
}

/**
 * "The Inn - Fire Emblem" is the highest quality rip of "The Inn" from Fire Emblem.
 */
function theInnFireTrigger() {
  ScriptApp.newTrigger("theInnFireEmblem")
    .timeBased()
    .everyDays(1)
    .atHour(0)
    .create()
}
