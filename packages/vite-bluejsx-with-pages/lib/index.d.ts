import { UserConfig } from 'vite';
import withBlueJSX from 'vite-with-bluejsx';

declare function withPages(config: Parameters<typeof withBlueJSX>[0]): UserConfig;

export { withPages as default };
