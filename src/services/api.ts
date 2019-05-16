const apiPrefix = '/api/v1'
const apiList = {
  user: {
    register: '/user/register',
    checkStatus: '/user/status',
    login: '/user/login',
    current: '/user/current',
  },
  website: {
    register: '/website',
    list: '/website/list'
  },
  perf: {
    trending: '/perf/trending'
  }
}
const proxyObject = (obj: object) =>
  new Proxy<typeof obj>(obj, {
    get: (target, locator) => {
      const selectedObj = target[locator]
      if (typeof selectedObj === 'object') return proxyObject(selectedObj)
      else return apiPrefix + target[locator]
    },
  })
export const api: typeof apiList = proxyObject(apiList)
