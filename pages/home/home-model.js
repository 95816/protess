import {
  Base
} from '../../utils/base.js';

class Home extends Base {
  constructor() {
    super();
  }
  //获取banner
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
  //获取主题数据
  getThemeData(ids, callback) {
    var params = {
      url: 'theme?ids=' + ids,
      sCallback: function(data) {
        callback && callback(data);
      }
    }
    this.request(params);
  }

  //获取最近新品
  getProductsData(callback) {
    var params = {
      url: 'product/recent',
      sCallback: function(data) {
        callback && callback(data);
      }
    }
    this.request(params);
  }

}

export {
  Home
};