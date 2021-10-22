module.exports = {
  lintOnSave: true,
  crossorigin: 'anonymous',
  integrity: true,
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Github User Finder',
    },
  },
  devServer: {
    disableHostCheck: true,
    useLocalIp: false,
  },
};
