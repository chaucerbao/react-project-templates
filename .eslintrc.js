module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "plugins": [
    "react"
  ],
  "settings": {
    "import/resolver": {
      "webpack": true
    }
  },
  "rules": {
    "react/react-in-jsx-scope": "off"
  },
  "globals": {
    "React": true
  },
  "env": {
    "browser": true
  }
};
