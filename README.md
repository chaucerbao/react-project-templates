# React Project Template

A starter template for building a front-end web application with [React]. The
goal of this project is to pre-configure an optimized toolset and structure so
you can begin developing your application quickly, with linters, code
formatters, and a test suite already in place.

## Development

### Tasks
- `start` compiles the source, starts a development server, and waits for changes
- `build` compiles the source with production optimizations
- `clean` removes the directory where the generated files are placed
- `beautify` standardizes the formatting style
- `test` runs the test suite against the source code
- `test:watch` runs the test suite and waits for changes

### Directory structure
```
src/
├─ Application/ (Root component for the application)
├─ components/  (Main building blocks of the application)
├─ dll/         (List of third-party libraries to bundle separately)
├─ pages/       (Components mounted by the router)
│
├─ Router.jsx   (Routes for the application)
├─ index.html   (HTML skeleton)
└─ index.js     (Bootstraps the application)
```

[React]: https://facebook.github.io/react/
