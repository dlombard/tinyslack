const path = require('path')
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: () => [
    autoprefixer({to: path.resolve(__dirname, '/dist/')}),
  ],
}
