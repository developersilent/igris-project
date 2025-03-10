import { createNewRoute, publicProcedure } from "@/server/rpc/init";
import { z } from "zod"
import ytld from "@distube/ytdl-core";
import { GetMediasInfo, GetVideoInfo } from "@/helpers/video-content-helpers";

export const inputData = z.object({
  ytURL: z.string().url()
})
export const YtRoute = createNewRoute({
  getVideoInfo: publicProcedure.input(inputData).mutation(async ({ c, input }) => {
    const info = await ytld.getInfo(input.ytURL)
    const VideoInfo = GetVideoInfo(info)
    const Formats = GetMediasInfo(info)
    return c.superjson({
      Message: "Info found...",
      VideoInfo,
      Formats
    })
  }),
  audio: publicProcedure.input(inputData).mutation(async ({ c, input }) => {
    const res = await fetch(input.ytURL);
    const Resblob = await res.blob();
    console.log(Resblob)
    return c.superjson({
      BlobData: Resblob
    })
  })
})
