export const classes = (...args) =>
  args
    .map((x) => (Array.isArray(x) ? getClassFromModule(x[0], x[1]) : x))
    .filter(Boolean)
    .join(' ')

const getClassFromModule = (module, className) => {
  if (!module[className]) {
    throw new Error(`class name ${className} does not exist`)
  }
  return [className, module[className]].join(' ')
}
