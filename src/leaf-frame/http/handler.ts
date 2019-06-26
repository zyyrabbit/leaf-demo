import { Message, MessageBox } from 'element-ui';
import leaf from '../index';
type index = { [index: string]: (response: any) => void};

export let handlers: index = {
  200: response => {
    if (response.data.code !== 0) {
      Message.error(response.data.msg);
      return Promise.reject(response.data.msg);
    }
    return response;
  },
  401: () => {
    leaf.router.push({
      name: 'login'
    })
  },
  402: () => {
    MessageBox.alert('会话已过期, 请重新登录!', '提示', {
      confirmButtonText: '确定',
      type: 'warning',
      showClose: false,
      callback: _ => {
        setTimeout(() => {
          MessageBox.close();
          leaf.router.push({
            name: 'login'
          })
        }, 0);
      },
    });
  },
  403: () => {
    Message({
      message: '当前用户无权限访问该资源',
      type: 'warning',
    });
  },
  others: (error) => {
    Message.error(
      (error.response.data && error.response.data.msg) || `服务器异常`,
    );
    return Promise.reject(error);
  }
}

export default function handlerMatch(response: any): any {
  let hanlders = leaf._handlers as any;
  let fn = hanlders[response.status];
  let isMatch = fn ? true : false;
  return isMatch ? fn(response) : hanlders.others(response);
}