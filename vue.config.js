module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  "lintOnSave": false,
  "devServer": {
    "hotOnly": true,
    "disableHostCheck": true,
    "clientLogLevel": 'warning',
    "inline": true,
    "headers": {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
  }

}