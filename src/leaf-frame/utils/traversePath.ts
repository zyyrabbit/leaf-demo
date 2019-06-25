/**
 * 遍历树结构
 * @param node 需遍历数组
 * @param childKey 递归遍历字段
 * @param key 源目标字段
 * @param target 目标字段值
 * @param onlyValue 是否只输出对应的字段值而不是整个对象
 * @param list 结果数组
 */
const traversePath = (node: any, childKey: string, key: string, target: any, onlyValue: boolean, list: any[] = []) => {
  if (!node) {
    return [];
  }
  // 存储遍历节点
  list.push(onlyValue ? node[key] : node);
  if (node[key] === target) {
    return;
  }
  // 递归遍历子节点
  if (node[childKey] && node[childKey].length) {
    const nodes = node[childKey];
    nodes.forEach((node: any) => {
      traversePath(node, childKey, key, target, onlyValue, list);
    });
  }
  const last = onlyValue ? list[list.length - 1] : list[list.length - 1][key];
  // 末节点非目标值时，从路径列表中删除
  if (last !== target) {
    list.pop();
  }
};

export const getTreePath = (array: any, childKey: string, key: string, target: any, onlyValue: boolean = true) => {
  const r: any[] = [];
  for (let i = 0, len = array.length; i < len; i++) {
    traversePath(array[i], childKey, key, target, onlyValue, r);
    if (r.length !== 0) {
      break;
    }
  }
  return r;
};
