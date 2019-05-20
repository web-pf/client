export const randomString = () =>
  'slot_' + Math.random()
    .toString(32)
    .slice(2, 10)
