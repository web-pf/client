const apiPrefix = '/api/v1'
const apiList = {
  user: {
    register: '/user',
    login: '/user/authenticate',
    current: '/user/current',
  },
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