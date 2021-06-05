module.exports = {
    env: {
        es2021: true,
        node: true
    },
    extends: 'airbnb-base',
    parserOptions: {
        ecmaVersion: 2021
    },
    rules: {
        camelcase: 0,
        indent: ['error', 4],
        'comma-dangle': ['error', 'never'],
        semi: ['error', 'never'],
        'max-len': 0
    }
}
