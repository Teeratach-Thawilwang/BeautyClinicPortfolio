declare namespace Deno {
  function serve(
    handler: (request: Request) => Response | Promise<Response>,
    options?: {
      port?: number
      hostname?: string
      signal?: AbortSignal
      onListen?: (params: {port: number; hostname: string}) => void
    },
  ): void

  namespace env {
    function get(key: string): string | undefined
    function set(key: string, value: string): void
    function has(key: string): boolean
  }
}
