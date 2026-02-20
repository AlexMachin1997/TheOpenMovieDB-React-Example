---
description: How to diagnose common TypeScript and TSConfig errors in the monorepo
---

When encountering TypeScript compilation errors, missing types, or module resolution issues across packages, use this workflow to isolate the problem.

## 1. Trace Module Resolution (Debugging Imports & Aliases)

If a package cannot find a module, peer dependency, or a `~` path alias, trace the exact resolution steps.

Run this inside the package having the issue:

```cmd
npx tsc --noEmit --traceResolution | findstr /i "the-name-of-the-module"
```

_This verbosely outputs exactly where TypeScript is looking for the file and why it failed._

## 2. Diagnose "Ambiguous `rootDir`" Errors

If you see an error like `rootDir compiler option needs to be supplied to disambiguate the project root`:

- **The Fix:** Ensure `"rootDir": "src"` is explicitly defined in the local package's `tsconfig.json` (inside `compilerOptions`), even if it already extends a base config.
- **The Cause:** TypeScript gets confused when resolving export map entries if the source files are spread unpredictably or if `vite-plugin-dts` can't infer the project root.

## 3. Diagnose React 19 / `types/react` Mismatches

If you are seeing obscure type errors related to `React.Ref`, `HTMLAttributes`, or intrinsic elements:

1. Check if multiple versions of `@types/react` are installed using `pnpm ls @types/react -r`.
2. Look for overlapping or deeply nested dependencies bringing in React 18 types.
3. If necessary, you can flatten the versions by temporarily adding an `overrides` or `resolutions` to the root `package.json`:
   ```json
   "pnpm": {
     "overrides": {
       "@types/react": "19.x.x"
     }
   }
   ```

## 4. Diagnose "JSX flag is not provided" Errors

If you see `Cannot use JSX unless the '--jsx' flag is provided`:

1. Check that the file extension is `.tsx` (and not `.ts`).
2. Verify the `tsconfig.json` for that specific environment (e.g., Storybook vs standard Vite build) extends a base config containing `"jsx": "react-jsx"`.
3. **Important Check:** Make sure the `include` array array actually covers the file. If an `include` array is defined but misses your file, TS won't apply the `jsx` flag to it!

## 5. Clean Slate Type Check

Sometimes type errors persist due to cached `tsconfig.tsbuildinfo` files across the monorepo mapping out-of-date declarations. Run checking cleanly:

// turbo

```cmd
pnpm --filter="<your-package-name>" run check-types
```
