const buildConfig = () => {
  try{
    return require('./build.config')
  }catch(e){    
    return {}
  }
}

let vueConfig = {
  configureWebpack: {
    output: {
      filename: `app-${new Date().getTime()}.js`
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `        
        @import "@/assets/scss/_variables.scss";        
        @import "@/assets/scss/_modal.scss";
        `
      }        
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      },      
    }
  }  
}
vueConfig = Object.assign(vueConfig, buildConfig())
module.exports = vueConfig