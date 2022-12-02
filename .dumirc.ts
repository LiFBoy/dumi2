import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  outputPath: 'docs-dist',
  mfsu: false,
  themeConfig: {
    name: 'test',
  },
  locales: [
    { id: 'en-US', name: 'English', suffix: '' },
    { id: 'zh-CN', name: '中文', suffix: '-cn' },
  ],
  resolve: {
    docDirs: [{ type: 'doc', dir: 'docs' }],
    atomDirs: [
      { type: 'component', dir: 'src/components/compose-form/mod' },
      { type: 'component', dir: 'src/components' },
    ],
    codeBlockMode: 'passive',
  },
  // alias: {
  //   'antd/lib': path.join(__dirname, 'components'),
  //   'antd/es': path.join(__dirname, 'components'),
  //   'antd/locale': path.join(__dirname, 'components/locale'),
  //   // Change antd from `index.js` to `.dumi/theme/antd.js` to remove deps of root style
  //   antd: require.resolve('./.dumi/theme/antd.js'),
  // },
  // extraRehypePlugins: [rehypeAntd],
  alias: {
    '@': path.resolve(__dirname, 'src'),
    data: path.resolve(__dirname, 'data'),
  },
});
