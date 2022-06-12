import patterns from './patterns';
import { IRoutePattern } from './types';

/**
 * Матчим роуты по регуляркам
 * @param path Исходный путь
 * @returns Найденный паттерн, или null
 */
const match = (path: string): IRoutePattern | null => {
    for (const pattern of patterns) {
        if (pattern.pattern.test(path)) {
            return pattern;
        }
    }

    return null;
};

export default match;
