export function extractVideoIdList(videos) {
  const videoIdList = [];
  videos.map((video) => videoIdList.push(video.id));
  return videoIdList;
}

export function extractChannelIdList(videos) {
  const channelIdList = [];
  videos.map((video) => channelIdList.push(video.snippet.channelId));
  return channelIdList;
}
