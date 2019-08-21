import { Message, MessageBox } from 'element-ui';

let handlers = {
  200: response => response,
  401: (response, app) => {
    app.router.push({
      name: 'login'
    })
   // window.location = response.data.loginUrl;
  },
  402: (response, app) => {
    MessageBox.alert('会话已过期, 请重新登录!', '提示', {
      confirmButtonText: '确定',
      type: 'warning',
      showClose: false,
      callback: _ => {
        setTimeout(() => {
          MessageBox.close();
          app.router.push({
            name: 'login'
          })
        }, 0);
      },
    });
  },
  403: response => {
    Message({
      message: '当前用户无权限访问该资源',
      type: 'warning',
    });
    return Promise.reject(response);
  },
  default: (error, app) => {
    return Promise.reject(error);
  }
}

export default {
  config: {
    baseURL: '/',
    withCredentials: true
  },
  handlers,
}