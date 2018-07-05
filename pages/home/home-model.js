
class Home {
  constructor() {

  }

  getBannerData(id) {
    wx.request({
      url: 'https://www.aiqihui.xin/api/v1/banner/' + id,
      method: 'GET',
      success: function (res) {
        console.log(res);
      }
    })
  }
}

export { Home };