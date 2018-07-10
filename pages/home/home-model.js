import {
  Base
} from '../../utils/base.js';

class Home extends Base {
  constructor() {
    super();
  }

  getBannerData(id, callback) {
    var params = {
      url: 'banner/' + id,
      sCallback: function(res) {
        callback && callback(res.items);
      },
    }
    this.request(params);
    // wx.request({
    //   url: 'https://www.aiqihui.xin/api/v1/banner/' + id,
    //   method: 'GET',
    //   success: function(res) {
    //     callBack(res);
    //   }
    // })
  }

  getThemeData(ids, callback) {
    var params = {
      url: 'theme?ids=' + ids,
      sCallback: function(data) {
        callback && callback(data);
      }
    }
    console.log(params.url);
    this.request(params);
  }
}

export {
  Home
};