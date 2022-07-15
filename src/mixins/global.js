
export default {
  data() {
    return {
      screenHeight: 0
    }
  },
  mounted() {
    this.screenHeight = window.innerHeight
  }
}