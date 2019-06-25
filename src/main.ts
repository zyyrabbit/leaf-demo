import '@/assets/index.scss';
import variables from '@/assets/variables.scss';
import Leaf from 'leaf-frame';
import mockMenu from '@/mocks/func-menu.ts';
import { HeaderItems } from '@/components/';
import setting from '@/setting';

import {
  dateFormat,
  pageData
} from 'leaf-frame/mixins';
const routers = require.context('@/views', true, /\.router\.ts$/);
const module = require.context('@/views', true, /\.module\.js$/);
const svgs = require.context('@/assets/svg', true, /\.svg$/);

Leaf.frameSet({
  mixins: [dateFormat, pageData],
  routers,
  module,
  svgs,
  menuData: mockMenu.data,
  variables,
  headerSlot: HeaderItems,
  setting
})

Leaf.run();
