import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  unocss: true,
  rules: {
    'no-console': 0,
    'react/prop-types': 0,
    'ts/no-namespace': 0,
    'ts/ban-ts-comment': 0,
    'ts/prefer-ts-expect-error': 0,
    'eslint-comments/no-unlimited-disable': 0,
  },
})
