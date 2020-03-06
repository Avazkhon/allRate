module.exports = {
  "extends": "react-app",
  "extends": ["react-app", "plugin:you-dont-need-momentjs/recommended"],
  "rules": {
    "no-unused-vars": ["warn", { "args": 'after-used', ignoreRestSiblings: true, }],
    "camelcase": 0,
    "comma-dangle": 0,
    "eqeqeq": [1, "smart"],
    "function-paren-newline": 0,
    "global-require": 1,
    "import/extensions": ["error", { "scss": "always" }],
    // "import/no-unresolved": 2,
    "import/prefer-default-export": 1,
    "jsx-a11y/no-autofocus": 0,
    "jsx-a11y/anchor-has-content": 0,
    "jsx-a11y/anchor-is-valid": 1,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/label-has-for": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "max-len": [1, 120, {
      "ignoreTemplateLiterals": true,
      "ignoreTrailingComments": true,
      "ignoreComments": true,
      "ignoreStrings": true,
    }],
    "new-cap": [1, { "capIsNewExceptionPattern": "(.*HOC$)|(^CRM.*$)" }],
    "no-continue": 1,
    "no-fallthrough": [2, { "commentPattern": "break[\\s\\w]*omitted" }],
    "indent": ["error", 2, { "MemberExpression": "off", "SwitchCase": 1 }],
    "no-irregular-whitespace": [1, {"skipStrings": true, "skipTemplates": true, "skipComments": true }],
    // "no-mixed-operators": [
    //   "error",
    //   {
    //     "groups": [
    //       ["+", "-"],
    //       ["*", "/", "%", "**"],
    //       ["&", "|", "^", "~", "<<", ">>", ">>>"],
    //       ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
    //       // ["&&", "||"],
    //       ["in", "instanceof"]
    //     ],
    //     "allowSamePrecedence": true
    //   }
    // ],
    "no-param-reassign": 1,
    "no-plusplus": [2, { "allowForLoopAfterthoughts": true }],
    "no-restricted-syntax": 1,
    "no-return-assign": 1,
    // "no-shadow": 1,
    "no-underscore-dangle": ["warn",  { "allow": ["_isMounted", ] }],
    "no-use-before-define": 1,
    "object-curly-newline": [2, {"consistent": true}],
    "prefer-destructuring": [1, {
      "VariableDeclarator": {
        "array": false,
        "object": true
      },
      "AssignmentExpression": {
        "array": false,
        "object": false
      }
    }, {
      "enforceForRenamedProperties": false
    }],
    "radix": 0,
    "react/jsx-filename-extension": 0,
    "react/no-array-index-key": 1,
    "react/no-danger": 0,
    "react/no-multi-comp": [1, { "ignoreStateless": true }],
    "react/require-default-props": 0,
    "react/self-closing-comp": 1,
    "react/no-unused-state": 2,
    "react/no-unused-prop-types": 2,
    "react/prop-types": 1,
    // react/sort-comp берется из конфига airbnb https://github.com/airbnb/javascript/blob/685f37be39fd01bcfdd349de9acdcd5a50414520/packages/eslint-config-airbnb/rules/react.js#L233
  }
}
