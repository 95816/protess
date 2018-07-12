// pages/home/home.js
import {
  Home
} from './home-model.js';
var home = new Home();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._loadData();
  },

  _loadData: function() {
    //首页banner位
    var id = 1;
    home.getBannerData(id, (res) => {
      this.setData({
        'bannerArr': res
      })
    });
    //首页主题
    var ids = '1,2,3';
    home.getThemeData(ids, (res) => {
      this.setData({
        'themeArr': res
      })
    });
    //首页最近新品
    home.getProductsData((res) => {
      this.setData({
        'productsArr': res
      })
    });

  },

  onProductsItemTap: function(event) {
    var id = null;
    id = home.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../product/product?id=' + id,
    })
  },

  onThemesItemTap: function(event) {
    var id = home.getDataSet(event, 'id');
    var name = home.getDataSet(event, 'name');
    console.log(id);
    wx.navigateTo({
      url: '../theme/theme?id=' + id + '&name=' + name,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})