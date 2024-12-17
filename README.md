# css-module-classes ![npm](https://img.shields.io/npm/v/css-module-classes.svg)

In CSS Module, all selectors are transformed, meaning that parent components cannot know the class names of child components. As a result, they cannot directly set styles across levels and have to instead control child component styles by passing props, which leads to coupling between styles and logic.

We can achieve both ensuring the uniqueness of selectors and directly setting styles for child components by simply setting both the original class name and the transformed class name together.

In js, your can set class names like this.

- type definition

```typescript
type CSSModuleClasses = { readonly [key: string]: string };

declare const classes: (
  ...args: ([CSSModuleClasses, string] | string | undefined | null)[]
) => string;

export { classes };
```

- Child.tsx

```typescriptreact
import cls from './child.module.css'
import { classes } from 'css-module-classes'

export const Child = () => (
  <div className={classes([cls, 'child'])}>
    <div className={classes([cls, 'header'])}></div>
  </div>
)
```

Class names of child are `child _child_c3f52_1`.

Class names of header are `header _header_c3f52_6`.

- Parent.tsx

```typescriptreact
import { Child } from './child'
import cls from './parent.module.css'
import { classes } from 'css-module-classes'

export const Parent = () => (
  <div className={classes([cls, 'parent'])}>
    <Child></Child>
  </div>
)
```

In css, use `:global` to target child components.

- child.module.css

```css
.child {
  width: 100px;
  height: 100px;
}

.header {
  height: 10px;
  background-color: red;
}
```

- parent.module.css

```css
.parent > :global(.child) > :global(.header) {
  height: 100px;
}
```
