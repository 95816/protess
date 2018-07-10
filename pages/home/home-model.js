class Home {
  constructor() {

  }

  getBannerData(id, callBack) {
    wx.request({
      url: 'https://www.aiqihui.xin/api/v1/banner/' + id,
      method: 'GET',
      success: function(res) {
        callBack(res);
      }
    })
  }
}

export {
  Home
};