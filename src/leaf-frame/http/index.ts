import http from 'axios';
import handlerMatch from './handler';
export * from './handler';
const instance = http.create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json;charset=UTF-8',
    'If-modified-Since': 0,
    'Cache-Control': 'nocache',
  },
});

instance.interceptors.request.use();
instance.interceptors.response.use(
    response => {
      return handlerMatch(response);
    },
    error => {
      return handlerMatch(error.response);
    },
  );

export default instance;
