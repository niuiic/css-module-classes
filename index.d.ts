type CSSModuleClasses = { readonly [key: string]: string }

declare const classes: (
  ...args: ([CSSModuleClasses, string] | string | undefined | null)[]
) => string

export { classes }
