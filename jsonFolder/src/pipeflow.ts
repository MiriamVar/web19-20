import * as _ from "lodash";

interface Country{
    name: string;
    region: string;
    population: number;
    area: string;
    languages: Array<Language>;
    subregion: string;
    currencies: Array<Currency>;
}

interface Language{
 iso639_1: string; 
 iso639_2: string;
 name: string;
 nativeName: string;
}

interface Currency{
 code: string;
 name: string;
 symbol: string;
}

export class Pipeflow {

    static excercise8a(input: Array<Country>): any{
        

        const addPopulation = (
            languages: Array<Language>, 
            population: number
            ): Array<{language: string, population:number}> => {
            return languages
            .map(({name}) => ({language: name, population}));
        };

        const languageToCountArray = (input): any => {
        return input
        .map(({population,languages}) => addPopulation(languages, population))
        .flat();
        
    }
        const languageToCountObject = (input):any =>{
        return input.reduce((acc, {language, population}) => {
            return {
                ...acc,  
                [language]: (acc[language] || 0) + population }
        }, {});
    }

    const arrayOfLanguages = (input):any => {
        return Object.entries(input)
        .map(([languages, count]) => ({
            languages,
            count
        }));


    }

    const sortArray = (input):any => {
        return input.sort((a,b) => b.count - a.count);
    }

    const topTen = (input):any => {
        return input.filter((value, index) => {
            return index <= 9
        })
    }

    const humanReadable = (input):any => {
        return input.map(({languages, count}) => ({languages, count: (count/1000000000).toFixed(3) + " mld"}))
    }

    const toString = (input): string =>{
        return input
        .reduce((acc, input) => { 
            return acc+=input.languages+": "+input.count+" \n" },"");
    }

      //  return toString(humanReadable(topTen(sortArray(arrayOfLanguages(languageToCountObject(languageToCountArray(input)))))))
    
        const pipe = (...fns) => fns.reduceRight((f,g) => (...args) => f(g(...args)));
    
        return pipe(
            languageToCountArray,
            languageToCountObject,
            arrayOfLanguages,
            sortArray,
            topTen,
            humanReadable,
            toString
        )(input);

    }



} 