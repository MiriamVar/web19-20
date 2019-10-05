"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pipeflow {
    static excercise8a(input) {
        const addPopulation = (languages, population) => {
            return languages
                .map(({ name }) => ({ language: name, population }));
        };
        const languageToCountArray = (input) => {
            return input
                .map(({ population, languages }) => addPopulation(languages, population))
                .flat();
        };
        const languageToCountObject = (input) => {
            return input.reduce((acc, { language, population }) => {
                return {
                    ...acc,
                    [language]: (acc[language] || 0) + population
                };
            }, {});
        };
        const arrayOfLanguages = (input) => {
            return Object.entries(input)
                .map(([languages, count]) => ({
                languages,
                count
            }));
        };
        const sortArray = (input) => {
            return input.sort((a, b) => b.count - a.count);
        };
        const topTen = (input) => {
            return input.filter((value, index) => {
                return index <= 9;
            });
        };
        const humanReadable = (input) => {
            return input.map(({ languages, count }) => ({ languages, count: (count / 1000000000).toFixed(3) + " mld" }));
        };
        const toString = (input) => {
            return input
                .reduce((acc, input) => {
                return acc += input.languages + ": " + input.count + " \n";
            }, "");
        };
        //  return toString(humanReadable(topTen(sortArray(arrayOfLanguages(languageToCountObject(languageToCountArray(input)))))))
        const pipe = (...fns) => fns.reduceRight((f, g) => (...args) => f(g(...args)));
        return pipe(languageToCountArray, languageToCountObject, arrayOfLanguages, sortArray, topTen, humanReadable, toString)(input);
    }
}
exports.Pipeflow = Pipeflow;
//# sourceMappingURL=pipeflow.js.map