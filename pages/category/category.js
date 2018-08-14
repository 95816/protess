// pages/category/category.js
import {
  Category
} from 'category-model.js';
var category = new Category(); //实例化 home 的推荐页面
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentMenuIndex: 0,
    transClassArr: ['tanslate0', 'tanslate1', 'tanslate2', 'tanslate3', 'tanslate4', 'tanslate5'],
    loadingHidden: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this._loadData();
  },


  _loadData: function(callback) {
    var that = this;
    category.getCategoryType((categoryData) => {
      that.setData({
        categoryTypeArr: categoryData,
        loadingHidden: true
      });

      //在回调方法里调用获得首屏商品数据
      that.getProductsByCategory(categoryData[0].id, (data) => {
        var dataObj = {
          products: data,
          topImgUrl: categoryData[0].img.url,
          title: categoryData[0].name
        };
        that.setData({
          loadingHidden: true,
          categoryInfo0: dataObj
        });
        callback && callback();
      });
    });
  },
  /*切换分类*/
  changeCategory: function(event) {
    var index = category.getDataSet(event, 'index'),
      id = category.getDataSet(event, 'id');
    this.setData({
      currentMenuIndex: index
    });

    if (!this.isLoadedData(index)) {
      var that = this;
      this.getProductsByCategory(id, (data) => {
        that.setData(that.getDataObjForBind(index, data));
      });
    }
  },
  isLoadedData: function(index) {
    if (this.data['categoryInfo' + index]) {
      return true;
    }
    return false;
  },
  getDataObjForBind: function(index, data) {
    var obj = {},
      arr = [0, 1, 2, 3, 4, 5],
      baseData = this.data.categoryTypeArr[index];

    for (var item in arr) {
      if (item == arr[index]) {
        obj['categoryInfo' + item] = {
          products: data,
          topImgUrl: baseData.img.url,
          title: baseData.name
        };

        return obj;
      }
    }
  },

  getProductsByCategory: function(id, callback) {
    category.getProductsByCategory(id, (data) => {
      callback && callback(data);
    });
  },

  onProductsItemTap: function(event) {
    console.log(event);
    var id = null;
    id = category.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../product/product?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /*下拉刷新页面*/
  onPullDownRefresh: function() {
    this._loadData(() => {
      wx.stopPullDownRefresh()
    });
  },

  //分享效果
  onShareAppMessage: function() {
    return {
      title: '零食商贩 Pretty Vendor',
      path: 'pages/category/category'
    }
  }
})