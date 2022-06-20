import { Configuration } from 'webpack';

export type Platform = 'desktop' | 'mobile';

export interface ICommonConfigProps {
    platform?: Platform;
    publicPath?: string;
}

export interface IConfigProps {
    client?: ICommonConfigProps;
    server?: ICommonConfigProps;
}

export interface ILoaderOptions {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
}

interface ILoaderProps {
    options?: ILoaderOptions
}

export interface ICssLoaderProps extends ILoaderOptions{
}

export interface IConfiguration {
    client?: Configuration;
    server?: Configuration;
}

export interface IConfigurationOverrides {
    [key: string]: IConfiguration
}

export interface ISpec {
    [key: string]: {
        name: string;
        entries: {
            client: string;
            server: string;
        };
        config: IConfigProps;
        configOverrides: IConfiguration
    }
}

export interface IEntries {
    [key: string]: string;
}

export type IEnv = 'production' | 'development' | 'testing';
export type ITarget = 'web' | 'node'

export interface IAssetsPluginProps {
    env: IEnv;
    path: string;
    bundleName: string;
}

export interface ICompressionPluginProps {
    algorithm?: string;
}

export interface IDefinePluginProps {
    env: 'production' | 'development' | 'testing';
    platform: string;
    browser: boolean;
    useMobileOptimizedAssets: boolean;
    bundleName?: string;
}

export interface IExtractCssProps {
    env: IEnv;
    bundleName: string;
}

export interface ILoadablePluginProps {
    bundleName: string;
    path: string;
}

export interface IProvidePluginProps {
    target: ITarget;
}

export interface ISourceMapDevToolPluginProps {
    sourceMapsPath?: string;
}

export interface ICssRuleProps {
    env: IEnv;
    discard?: boolean;
}

export interface IFontRuleProps {
    discard?: boolean;
}

export interface IHtmlRuleProps {
    discard?: boolean;
}

export interface IImageRuleProps {
    env: IEnv,
    urlLoaderOptions?: ILoaderOptions,
    discard?: boolean,
    publicPath?: string;
}

export interface IJsRuleProps {
    env?: IEnv,
    target?: ITarget,
    preventDidCatchWrapping?: boolean;
    hot?: boolean;
}

export interface ITsRuleProps {
    env?: IEnv,
    target?: ITarget,
    preventDidCatchWrapping?: boolean;
    hot?: boolean;
}

export interface IBabelLoaderProps {
    env?: IEnv,
    target?: ITarget,
    preventDidCatchWrapping?: boolean;
    hot?: boolean;
}

export interface IPostCssLoaderProps extends ILoaderProps {
}

export interface IExtractCssLoaderProps extends ILoaderProps {
}

export interface IImageWebpackLoaderProps extends ILoaderProps {
}

export interface IUrlLoaderProps extends ILoaderProps {
}

export interface IGetClientConfigsProps {
    bundleName?: string;
    bundlePath?: string;
    publicPath?: string;
    clientBuildDir?: string;
    serverBuildDir?: string;
    platform?: string;
    sourceMapsPath?: string;
    useMobileOptimizedAssets?: boolean;
    disableChunking?: boolean;
}

export interface IGetServerConfigProps {
    entries?: IEntries;
    serverBuildDir?: string,
    platform?: string;
    publicPath?: string;
    urlLoaderOptions?: ILoaderOptions;
    useMobileOptimizedAssets?: boolean;
}
