export const importSvgIcons = (requireContext: any) =>
  requireContext.keys().map(requireContext);

export const svgs = require.context('./assets/img/svg', true, /\.svg$/);

