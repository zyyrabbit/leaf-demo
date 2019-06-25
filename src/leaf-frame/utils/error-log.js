import settings from '@/settings'

const { errorLog: needErrorLog } = settings;
if (needErrorLog) {
  Vue.config.errorHandler = function(err, vm, info, a) {
    console.error(err, info, window.location.href)
  }
}

  