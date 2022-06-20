/* eslint-disable prefer-const */
import { LoaderContext } from 'webpack';

let classes: Record<string, string> = {};

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const hashCode = (value: string, salt = 0, offset = 5): number => {
    let hash = salt;

    if (value.length === 0) {
        return hash;
    }

    for (let i = 0; i < value.length; i++) {
        const chr = value.charCodeAt(i);

        hash = ((hash << offset) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

const getValueByHash = (value: number, length: number): string => {
    let result = '';
    let val = value;

    for (let i = 0; i < length; i++) {
        result += alphabet[Math.abs(val) % (alphabet.length - 1)];
        val <<= 3;
    }

    return result;
};

const parseLocalIdentName = (localIdentName: string): [number, number] => {
    const pattern = /^\d_\d$/;

    if (!pattern.test(localIdentName)) {
        throw new Error('Invalid localIdentName');
    }

    const data = localIdentName.split('_');

    return [ parseInt(data[0], 10), parseInt(data[1], 10) ];
};

const getCssClassName = (time: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const helper = (context: LoaderContext<any>, localIdentName: string, localName: string): string => {
        const salt = (time << 5) % 127635;

        let i = 0;
        const MAX_RETRY = 10;
        let shortClassName = '';
        let isMatched = false;

        const path = context.resourcePath.split('/');

        const folder = path[path.length - 2];
        const className = localName;

        const [ firstLength, secondLength ] = parseLocalIdentName(localIdentName);

        let offset = 3;

        const fullClassName = `${path.join('_')}__${className}`;

        while (i < MAX_RETRY) {
            const folderHash = hashCode(folder, salt, offset);
            const classNameHash = hashCode(className, salt, offset);

            const firstValue = getValueByHash(folderHash, firstLength);
            const secondValue = getValueByHash(classNameHash, secondLength);

            shortClassName = `${firstValue}_${secondValue}`;

            if (!classes[shortClassName] || classes[shortClassName] === fullClassName) {
                isMatched = true;
                break;
            }

            i += 1;
            offset += 2;
        }

        if (!isMatched) {
            const message = 'Cannot create short className for class "' + className + '" in folder "' + folder + '"';

            throw new Error(message);
        }

        classes[shortClassName] = fullClassName;

        return shortClassName;
    };

    return helper;
};

export default getCssClassName;
