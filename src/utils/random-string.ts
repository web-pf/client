export const randomString = () =>
  Math.random()
    .toString(32)
    .slice(2, 10)
