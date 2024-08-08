export const letterToColor = (letter: string): string => {
    const colors: { [key: string]: string } = {
        A: '#f44336',
        B: '#e91e63', 
        C: '#9c27b0',
        D: '#32a852',
        E: '#32a852',
        F: '#e69635',
        G: '#f2271f',
        H: '#a07ddb',
        I: '#87edcd',
        J: '#f5ef42',
        K: '#fa82f2',
        L: '#ccfa82',
        M: '#2a1b7d',
        N: '#44424f',
        O: '#461a75',
        P: '#032a63',
        Q: '#b7cced',
        R: '#eb6642',
        S: '#362824',
        T: '#851e6b',
        U: '#851e6b',
        V: '#381c02',
        W: '#de141e',
        X: '#54de14',
        Y: '#1439de',
        Z: '#171717'
    };
    return colors[letter.toUpperCase()] || "defaultColor";
};