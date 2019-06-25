from fabric.tasks import execute
from fabric.api import *

env.hosts = [
    'ctgcdt@192.168.90.98'
]

env.passwords = {
    'ctgcdt@192.168.90.98:22': 'CtgcDt#1225'
}


def publish():
    source_dir = './dist'
    target_dir = '/home/ctgcdt/desktop/clouddesktop-www'

    print("user:%s,host_string:%s" % (env.user, env.host_string))
    run('rm -rf %s/static/desktop/*' % target_dir)

    with settings(warn_only=True):
        result = put('%s/*' % source_dir, '%s' % target_dir)
    if result.failed and not confirm('put file failed,Continue[Y/N]?'):
        abort('Abort file put task!')


if __name__ == '__main__':
    execute(publish)
