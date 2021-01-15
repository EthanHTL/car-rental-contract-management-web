export default {
  UEDITOR_HOME_URL: `${process.env.BASE_URL}lib/UEditor/`,
  // 编辑器不自动被内容撑高
  autoHeightEnabled: true,
  // 初始容器高度
  initialFrameHeight: 340,
  // 初始容器宽度
  initialFrameWidth: '100%',
  // 上传文件接口
  // serverUrl: 'http://localhost:9090/api/v1/car/contract/upload',
  // 关闭自动保存
  enableAutoSave: false,
  elementPathEnable: false,
  wordCount: false,
  // 聚焦
  focus:true

}
