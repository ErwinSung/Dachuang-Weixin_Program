//获取应用实例(最南的地方)
const app = getApp()

Page({
  data: {
    motto: 'Hello 大创',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  imgHeight: function (e) {
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
    var imgh = e.detail.height;//图片高度
    var imgw = e.detail.width;//图片宽度
    var swiperH = winWid * imgh / imgw + "px"//等比设置swiper的高度。 即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度  ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
    this.setData({
      Height: swiperH//设置高度
    })
  },
  ClickOn: function () {
   /* if (app.globalData.userInfo.nickName != '李行')
      return;*/
    var that=this;
    this.setData({ motto: "wait..." });
    wx.request({
      url: 'https://api.heclouds.com/devices/41144620/datapoints',
      header:{
        'api-key': '换成你自己的api-key'//333
      },
      method:"POST",
      data:{
      "datastreams": [{
        "id": "源流",//改端口名称
        "datapoints": [{
          "at": "2024-02-07T20:17:49",
          "value": "1"
        },       
        ]
      }]
      },
      // data:{
      //   'led_pi':'1'
        
      // },
      success: function (res) {
        // 操作json数据
        //console.log(res.statusCode);        
        if(res.statusCode==200)
          that.setData({ motto: "开始" })
        else
          that.setData({ motto: "404 not found" })
      }
    })    
    
  },
  ClickOff: function () {
    /*if (app.globalData.userInfo.nickName != '李行')
      return;*/
    var that=this;
    this.setData({ motto: "wait..." })
    wx.request({
      url: 'https://api.heclouds.com/devices/41144620/datapoints?type=3',
      header: {
        'api-key': '换成你自己的api-key'//111
      },
      method: "POST",
      data: {
        '源流': '0'
      },
      success: function (res) {
        // 操作json数据
        //console.log(res.statusCode);
        if (res.statusCode == 200)
          that.setData({ motto: "关闭" })
        else
          that.setData({ motto: "404 not found" })
      }
    })
  },
  ClickGet: function () {
    this.setData({ motto: "wait" })
    wx.request({
      url: 'https://api.heclouds.com/devices/41144620/datapoints?datastream_id=led_pi',
      header: {
        'api-key': '换成你自己的api-key'///222
      },
      method: "GET",      
      success(res) {
        console.log(res.data)
      }
    })
    
  },
  onLoad: function () {     
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
