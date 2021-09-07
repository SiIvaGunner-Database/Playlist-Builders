// The Inn - Fire Emblem
function theInnFireEmblem()  {
  for (var i = 0; i < 155; i++) {
    YouTube.PlaylistItems.insert
    ({
      snippet:  {
        playlistId: "PLn8P5M1uNQk7hJWh8jPlpbhvvxex_QfI5", // Fire Emblem
        resourceId:  {
          kind: "youtube#video",
          videoId: "NzoneDE0A2o" // The Inn
        }
      }
    }, "snippet");
  }
}

// The Inn - Fire Emblem
function theInnFireEmblemTrigger() {
  ScriptApp.newTrigger("theInnFireEmblem")
  .timeBased()
  .everyDays(1)
  .atHour(0)
  .create();
}
