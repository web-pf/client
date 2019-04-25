export const trimParamterPrefix = (params: object) => {
  const result: any = {}
  Object.keys(params).forEach(param => {
    const paramTeardown = param.split('')
    if(paramTeardown.shift() === '_') {
      result[paramTeardown.join('')] = params[param]
    } else {
      result[param] = params[param]
    }
  })

  return result
}