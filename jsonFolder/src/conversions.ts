import * as _ from "lodash";
import { pipeline } from "stream";

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

interface CurrencyOccurence{
    currency: string;
    countries: Array<string>;
    count: number;
}


export class Conversions {
    // Vratte  pole s nazvami vsetkych krajin
    static excercise1(input: Array<Country>): Array<string>{  //static aby som nemusela vytvarat instanciu
        return input.map(country => country.name);
    }
    // Vratte  pole s nazvami vsetkych europskych krajin
    static excercise2(input: Array<Country>): Array<string>{
        return input
        .filter(country => country.region)  // .filter(({region})) => region === "Europe"
        .map(country => country.name);
    }
    //Vráťte pole objektov s vlastnosťami name a area, popisujúce krajiny s počtom obyvateľov nad 100 miliónov
    static excercise3(input: Array<Country>): Array<{name:string, area:string}>{
        return input
        .filter(country => country.population > 100000000)
        .map(({name, area}) => ({name, area: area +"km2"}));

    }
    //Vráťte pole všetkých jazykov, ktoré sa používajú Južnej Amerike bez duplicít
    static excercise4(input: Array<Country>): any{
        return input
        .filter(({subregion}) => subregion === "South America")
        .map(({languages}) => languages )
        .flat()
        .reduce((acc, lang) => {
            return acc
            .some(value=> lang.name === value.name) ? acc : [...acc,lang];
        } , []);
    }
    //Vráťte objekt, kde vlastnosti sú jazyky z Južnej Ameriky a ich hodnotami polia krajín z Južnej Ameriky, v ktorých sa nimi hovori
    static excercise5(input: Array<Country>): {[key: string]: Array<string>}{

        const addCountry = (
            languages: Array<Language>, 
            country: string
            ): Array<{language: string, country:string}> => {
            return languages
            .map(({name}) => ({language: name, country}));
        };

        return input
        .filter(({subregion}) => subregion === "South America")
        .map(({name,languages}) => addCountry(languages, name))
        .flat()
        .reduce((acc, pair) => {
            return {
                ...acc, 
                [pair.language]: [...(acc[pair.language] || []), pair.country] }
        }, {});
    }

//Vráťte pole objektov s dvoma vlastnosťami, jazyk z Južnej Ameriky a krajiny z Južnej Ameriky, v ktorých sa ním hovorí
static excercise6(
    input: Array<Country>
    ): Array<{language: string; countries: Array<string>}>{
   return Object.entries(Conversions.excercise5(input)).map(
       //([ language, countries])=> ({language, countries}));
       pair => ({ language: pair[0], countries:pair[1]})
   );
};
//Vráťte pre každú menu, ktorá sa používa aspoň v 5 krajinách, krajiny, v ktorých sa ňou platí a ich počet. 
//Výsledkom je usporiadané pole od najmenej používaných po najviac používané meny
// static excercise7(input: Array<Country>): any {
//     return input
//     .map(({currencies}) => currencies) 
// }
static excercise7(input: Array<Country>): any{

    const addCountryAndCourency = (currencies: Array<Currency>, country: string) => {
        return currencies.map(({name}) => ({currency: name, country}));
    };

    const middleStep = (input: Array<Country>): Array<{currency: string, country: string}> => {
        return input
        .map(({name,currencies}) => addCountryAndCourency(currencies, name))
        .flat();
    };


   const CurAndCounArr = (input: Array<{currency: string; country: string}>): {[key: string]: Array<string>} => {
      return input
       .reduce((acc, pair) => {
            return {
                ...acc,
               [pair.currency]: [...(acc[pair.currency] || []), pair.country],
            }
   } , {});
   }
    
    const test = (input: {[key: string]: Array<string>}): Array<CurrencyOccurence> =>{
    return Object.entries(input)
        .map(([currency, countries]) => ({ 
            currency, 
            countries, 
            count: countries.length
        }));
    };

    const finalFive = (input: Array<CurrencyOccurence>): Array<CurrencyOccurence> =>{
        return input.sort((a,b) => a.count+b.count);
    }

    // return finalFive((test(CurAndCounArr(middleStep(input)))))

    // return _.flow([
    //     middleStep,
    //     CurAndCounArr,
    //     test,
    //     finalFive
    // ])(input);

    const pipe = (...fns) => fns.reduceRight((f,g) => (...args) => f(g(...args)));
    
    return pipe(
        middleStep,
        CurAndCounArr,
        test,
        finalFive
    )(input);


}




}