# ESLint config for Vue projects
ESLint configuration for Vue 3 + TS, and for Vue 3 + TS + Feature-Sliced Design projects.
## Installation
```
npm install eslint-config-aurora-vue --save-dev
```
## Usage
For Vue 3 projects:
```js
// .eslintrc.js
module.exports = {
  extends: [
    "aurora-vue/base"
  ],
};
```
For Vue 3 projects with Feature-Sliced Design:
```js
// .eslintrc.js
module.exports = {
  extends: [
    "aurora-vue/fsd"
  ],
};
```
## Contributing
If you would like to contribute to the project, please follow these guidelines.

### Issues
Before opening a new issue, please check if the problem has already been reported. If not, provide detailed information about the issue, including steps to reproduce it.

### Pull Requests
1. Fork the repository and create a new branch for your feature or bug fix.
2. Make your changes and ensure that the existing tests pass.
3. Add new tests if necessary and ensure that all tests are passing.
4. Update the documentation if your changes impact it.
5. Open a pull request with a clear title and description of your changes.

Thank you for contributing to the project!
