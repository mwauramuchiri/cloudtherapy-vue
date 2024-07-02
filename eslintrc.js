module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  extends: ["plugin:vue/essential", "@vue/airbnb"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/no-unused-vars": "warn",
    "max-len": [
      "error",
      {
        code: 250
      }
    ]
  }
};
