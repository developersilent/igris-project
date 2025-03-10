import { MediaData, VideoInfoType } from "@/types/video.info";
import { videoInfo } from "@distube/ytdl-core";
import { ConvertSecToMins, FormatBitrate, FormatDate, FormatDownloadSize, FormatViewCount } from "./video-info-helpers";
import { format } from "path";

export function GetVideoInfo(info: videoInfo) {
  const thumbnailLen = info.videoDetails.thumbnails.length
  const thumbnail = info.videoDetails.thumbnails[thumbnailLen - 1]?.url;
  const VideoData: VideoInfoType = {
    id: info.videoDetails.videoId,
    title: info.videoDetails.title,
    channel: info.videoDetails.ownerChannelName,
    duration: ConvertSecToMins(info.videoDetails.lengthSeconds),
    views: FormatViewCount(info.videoDetails.viewCount),
    publishedAt: FormatDate(info.videoDetails.publishDate),
    thumbnail: thumbnail ?? "Thumbnail not Found"
  }
  return VideoData
}


function GetAllAudioInfo(info: videoInfo) {
  const allAudios = info.formats.filter(e => e.hasAudio && !e.hasVideo);

  const seen = new Set(); // Track unique media types + bitrate  
  const Audios = allAudios.filter(audio => {
    const uniqueKey = `${audio.mimeType}-${audio.bitrate}`;
    if (seen.has(uniqueKey)) return false;
    seen.add(uniqueKey);
    return true;
  }).map(audio => {
    return {
      id: audio.itag,
      audioQuality: audio.audioQuality ?? "",
      url: audio.url,
      downloadSize: FormatDownloadSize(audio.contentLength),
      mediaType: audio.mimeType ?? "",
      lable: FormatBitrate(audio.bitrate ?? 0),
      format: audio.container
    };
  });

  return Audios;
}


function GetAllVideoInfo(info: videoInfo) {
  const allVideos = info.formats.filter(e => e.hasVideo && e.container === "mp4");

  const seen = new Set(); // Track unique media types + bitrate  
  const Videos = allVideos.filter(vid => {
    const uniqueKey = `${vid.mimeType}-${vid.qualityLabel}`;
    if (seen.has(uniqueKey)) return false;
    seen.add(uniqueKey);
    return true;
  }).map(video => {
    return {
      id: video.itag,
      mediaType: video.mimeType ?? "",
      quality: video.quality,
      url: video.url,
      lable: video.qualityLabel,
      size: FormatDownloadSize(video.contentLength)
    }
  });

  return Videos;
}


export function GetMediasInfo(info: videoInfo) {
  const allAudios = GetAllAudioInfo(info)
  const allVideos = GetAllVideoInfo(info)
  const Data: MediaData = {
    Media: {
      audio: allAudios,
      video: allVideos
    }
  }
  return Data
}

