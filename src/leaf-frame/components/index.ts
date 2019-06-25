import { VueConstructor } from 'vue';

interface CompsList {
  [key: string]: VueConstructor;
}

import ViewContainer from './Layout/ViewContainer.vue';
import SpinLoader from './Spin/SpinLoader.vue';
import CountTo from './Count/CountTo.vue';
import SvgIcon from './Icon/SvgIcon.vue';

export const Comps: CompsList = {
  ViewContainer,
  SpinLoader,
  CountTo,
  SvgIcon
};
