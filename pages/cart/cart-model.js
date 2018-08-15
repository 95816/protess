import {
  Base
} from '../../utils/base.js';

class Cart extends Base {
  constructor() {
    super();
    this._storageKeyName = 'cart';
  }

  add(item, counts) {
    var cartData = this.getCartDataFromLocal();

    var isHasInfo = this._isHasThatOne(item.id, cartData);
    if (!isHasInfo) {
      item.counts = counts;
      item.selectStatus = true; //设置选中状态
      cartData.push(item);

    } else {
      cartData[isHasInfo.index].counts += counts;
    }
    wx.setStorageSync(this._storageKeyName, cartData);
  }

  //从缓存里获取当前购物车数据
  getCartDataFromLocal() {
    var res = wx.getSystemInfoSync(this._storageKeyName);
    if (!res) {
      res = [];
    }
    return res;
  }

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