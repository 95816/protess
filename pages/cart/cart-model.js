import {
  Base
} from '../../utils/base.js';

class Cart extends Base {
  constructor() {
    super();
    this._storageKeyName = 'cart';
  };

  add(item, counts) {
    var cartData = this.getCartDataFromLocal();
    if (!cartData) {
      cartData = [];
    }
    var isHadInfo = this._isHasThatOne(item.id, cartData);
    //新商品
    if (isHadInfo.index == -1) {
      item.counts = counts;
      item.selectStatus = true;  //默认在购物车中为选中状态
      cartData.push(item);
    }
    //已有商品
    else {
      cartData[isHadInfo.index].counts += counts;
    }
    this.execSetStorageSync(cartData);  //更新本地缓存
    //return cartData;
  };

  /*本地缓存 保存／更新*/
  execSetStorageSync(data) {
    wx.setStorageSync(this._storageKeyName, data);
  };

  //从缓存里获取当前购物车数据
  getCartDataFromLocal() {
    var res = wx.getStorageSync(this._storageKeyName);
    if (!res) {
      res = [];
    }
    return res;
  };

  //检测新增商品是否在购物车,并且返回这个商品在数组重的序号和信息
  _isHasThatOne(id, arr) {
    var item,
      result = {
        index : -1
      };
    for (let i = 0; i < arr.length; i++) {
      item = arr[i];
      if (item.id == id) {
        result = {
          index : i,
          data: item
        };
        break;
      }
    }
    return result;
  }

}

export {
  Cart
};