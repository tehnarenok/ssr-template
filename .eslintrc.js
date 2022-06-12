const OFF = 'off';
const ERROR = 'error';

module.exports = {
    root: true,
    globals: {
        React: true,
        google: true,
        mount: true,
        mountWithRouter: true,
        shallow: true,
        shallowWithRouter: true,
        context: true,
        expect: true,
        jsdom: true,
        JSX: true,
        document: true,
        require: true,
        console: true,
        window: true,
        process: true,
        URL: true,
        URLSearchParams: true,
    },
    overrides: [
        {
            files: [ '*.js' ],
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
            },
            extends: [
                'eslint:recommended',
                './default-config.eslintrc.js'
            ],
            env: {
                node: true,
                es6: true,
            },
            plugins: [ 'jest', 'eslint-plugin-import', 'prettier' ],
        },
        {
            files: [ '*.tsx', '*.ts' ],
            extends: [
                'eslint:recommended',
                'plugin:jest/recommended',
                'plugin:react/recommended',
                'plugin:@typescript-eslint/eslint-recommended',
                'plugin:@typescript-eslint/recommended',
                './default-config.eslintrc.js'
            ],
            parser: '@typescript-eslint/parser',
            plugins: [
                'jest',
                'react',
                'react-hooks',
                '@typescript-eslint',
                'eslint-plugin-import'
            ],
            rules: {
                '@typescript-eslint/no-non-null-asserted-optional-chain': OFF,
                '@typescript-eslint/no-unused-vars': ERROR,
                '@typescript-eslint/no-explicit-any': [ ERROR, { ignoreRestArgs: false, fixToUnknown: false, } ],
                '@typescript-eslint/ban-ts-ignore': OFF,
                '@typescript-eslint/naming-convention': [
                    ERROR,
                    {
                        selector: 'interface',
                        format: [ 'PascalCase' ],
                        custom: {
                            regex: '^I[A-Z]',
                            match: true,
                        },
                    }
                ],
                '@typescript-eslint/no-namespace': [ OFF ],
                '@typescript-eslint/no-empty-interface': OFF,
                'react/prop-types': OFF,
                'react/display-name': OFF,
                'react/jsx-no-target-blank': OFF,
                'react/react-in-jsx-scope': OFF,
                'react-hooks/rules-of-hooks': ERROR,
                'react-hooks/exhaustive-deps': ERROR,
                'react/sort-comp': [ ERROR, {
                    order: [
                        'static-variables',
                        'static-methods',
                        'instance-variables',
                        'getters',
                        'setters',
                        'lifecycle',
                        'rendering',
                        '/^handle.+$/',
                        '/^on.+$/',
                        'instance-methods',
                        'everything-else'
                    ],
                    groups: {
                        lifecycle: [
                            'displayName',
                            'propTypes',
                            'defaultProps',
                            'contextTypes',
                            'childContextTypes',
                            'mixins',
                            'statics',
                            'constructor',
                            'getDefaultProps',
                            'getInitialState',
                            'state',
                            'getChildContext',
                            'getDerivedStateFromProps',
                            'componentWillMount',
                            'UNSAFE_componentWillMount',
                            'componentDidMount',
                            'componentWillReceiveProps',
                            'UNSAFE_componentWillReceiveProps',
                            'shouldComponentUpdate',
                            'componentWillUpdate',
                            'UNSAFE_componentWillUpdate',
                            'getSnapshotBeforeUpdate',
                            'componentDidUpdate',
                            'componentDidCatch',
                            'componentWillUnmount'
                        ],
                        rendering: [
                            'render',
                            '/^render.+$/',
                            '/^maybeRender.+$/'
                        ],
                    },
                } ],
                'max-len': [ ERROR, 120, 4, {
                    ignoreComments: true,
                    ignoreUrls: true,
                } ],
                eqeqeq: [ ERROR, 'always', { null: 'ignore', } ],
                'no-console': ERROR,
                'no-implicit-coercion': ERROR,
                'no-else-return': ERROR,
                curly: [ ERROR, 'all' ],
                'max-depth': [ ERROR, { max: 3, } ],
                'id-match': [ ERROR, '^[\\w$]+$' ],
                'react/jsx-uses-react': 1,
                'react/jsx-uses-vars': 1,
            },
        }
    ],
};
