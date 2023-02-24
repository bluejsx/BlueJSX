import MarkdownIt from 'markdown-it';

/**
 * @returns {import('vite').PluginOption}
 */
declare function mdxToJS(options?: MarkdownIt.Options): {
    name: string;
    configResolved(resolvedConfig: any): void;
    transform(code: string, id: string): string;
};

export { mdxToJS as default };
