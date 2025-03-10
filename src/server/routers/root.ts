import { j } from "@/server/rpc/init";
import { YtRoute } from "@/server/routers/yt";

const app = j.router().basePath("/api").use(j.defaults.cors).onError(j.defaults.errorHandler)


const appRouter = j.mergeRouters(app, {
  Yt: YtRoute,
})

export type AppRouter = typeof appRouter

export default appRouter
