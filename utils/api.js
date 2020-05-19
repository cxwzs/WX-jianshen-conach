//获取应用实例
const app = getApp()

let api = {
  // 获取验证码
  verify: app.dizhitou + 'Verify/getVerify',
  // 获取openid
  openid: app.dizhitou + 'CoachRegister/auth',
  // 注册
  register: app.dizhitou +'CoachRegister/Register',
  // 登录
  login: app.dizhitou + 'CoachRegister/Login',
  // 项目列表
  project: app.dizhitou + 'Project/ProjectList',
  // 项目分类
  projectClass: app.dizhitou + 'Project/ProjectClass',
  // 更新、添加项目
  projectUpdate: app.dizhitou + 'Project/ProjectUpdate',
  // 删除项目
  projectDelete: app.dizhitou + 'Project/ProjectDelete',
  // 上架 下架 项目
  projectStatus: app.dizhitou + 'Project/ProjectStatus',
  // 编辑项目 项目详情
  projectDetails: app.dizhitou + 'Project/ProjectDetails',
  // 个人信息
  my: app.dizhitou + 'CoachRegister/my',
  // 个人信息 钱包
  myWallet: app.dizhitou + 'Wallet/myWallet',
  // 个人信息 钱包 提现
  withdraw: app.dizhitou + 'Wallet/withdraw',
  // 个人信息 钱包 提现记录
  withdrawList: app.dizhitou + 'Wallet/withdrawList',
  // 我的评价
  evaluate: app.dizhitou + 'Wallet/evaluate',
  // 消息列表
  messageList: app.dizhitou + 'Wallet/news',
  // 消息详情
  messageDetails: app.dizhitou + 'Wallet/news_details',
  // 更新个人资料
  updateUserinfo: app.dizhitou + 'CoachRegister/Update',
  // 奖项列表
  icon: app.dizhitou + 'CoachRegister/Icon',
  // 我的订单
  orderList: app.dizhitou + 'OrderInfo/orderList',
  // 详情 订单详情 预约详情
  orderDetail: app.dizhitou + 'OrderInfo/orderDetail',
  // 我的订单 删除订单
  orderDel: app.dizhitou + 'OrderInfo/orderDel',
  // 预约列表
  appointmentList: app.dizhitou + 'Appointment/AppointmentList',
  // 预约列表 取消预约
  appointmentCancel: app.dizhitou + 'Appointment/AppointmentCancel',
  // 预约列表 完成预约
  appointmentComplete: app.dizhitou + 'Appointment/AppointmentComplete',
  // 验证 验证码
  checkVerify: app.dizhitou + 'Verify/checkVerify',
}

export default api