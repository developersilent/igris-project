
export interface VideoInfoType {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
  duration: string;
  views: string;
  publishedAt: string
}

export interface AudioMetadata {
  audioQuality: string;
  downloadSize: string;
  mediaType: string;
  id: number;
  url: string;
  lable: string;
  format: string;
}

export interface VideoMetadata {
  size: string;
  mediaType: string;
  url: string;
  quality: string;
  lable: string;
  id: number;
}

type MediaTypes = {
  audio?: AudioMetadata[]
  video?: VideoMetadata[]
}

export interface MediaData {
  Media: MediaTypes
}

