import mdxLoader from '@bluejsx/vite-plugin-bluemdx';
import { UserConfig } from 'vite';

declare type MDXConfig = Parameters<typeof mdxLoader>[0];
declare function withBlueJSX(config: UserConfig & {
    bluejsx?: {
        hmr?: boolean;
    };
    mdxOptions?: MDXConfig;
}): UserConfig;

export { withBlueJSX as default };
