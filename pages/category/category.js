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
    currentMenuIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._loadData();
  },

  _loadData: function() {
    category.getCategoryType((categoryData) => {
      this.setData({
        categoryTypeArr: categoryData
      });

      //在回调方法里调用获得首屏商品数据
      category.getProductsByCategory(categoryData[0].id, (data) => {
        var dataObj = {
          products: data,
          topImgUrl: categoryData[0].img.url,
          title: categoryData[0].name
        }
        this.setData({
          categoryProducts: dataObj
        })
      });


    });



  },

  onProductsItemTap: function (event) {
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

})