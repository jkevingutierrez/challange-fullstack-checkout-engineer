export default abstract class BaseApi {
  constructor(protected api: (path?: string, options?: RequestInit) => Promise<any>) {}
}
