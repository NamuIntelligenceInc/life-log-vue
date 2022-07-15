export const globalMixin = {
  data() {
    return {
      screenHeight: 0
    }
  },
  mounted() {
    this.screenHeight = window.innerHeight
  }
}