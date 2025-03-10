

export function ConvertSecToMins(timeInSec: string) {
  const time = parseInt(timeInSec);
  const min = Math.floor(time / 60);
  const sec = time % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
}


export function FormatViewCount(viewsInstr: string) {
  const viewsCount = parseInt(viewsInstr);
  const formatter = new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short"
  })
  const views = formatter.format(viewsCount)
  return views.toString();
}


export function FormatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(date);
}


export function FormatDownloadSize(contentLen: string): string {
  const len = parseInt(contentLen)
  return new Intl.NumberFormat("en", {
    style: "unit",
    unit: "megabyte",
    unitDisplay: "short",
    maximumFractionDigits: 1,
  }).format(len / (1024 * 1024));
}

export function FormatBitrate(bitrate: number) {
  return bitrate ? `${new Intl.NumberFormat().format(Math.round(bitrate / 1000))} kbps` : "Unknown";
};

