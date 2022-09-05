import { Db } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { stringify } from "querystring";
import { connectToDatabase } from "../../lib/mongodb";
import { uuidv4 } from "./votes/[cocktailId]";
import fsPromises from 'fs/promises';
import path from 'path';

type Data = {
    name: string
}

interface Import {
    drinks: Drink[];
}

interface Drink {
    idDrink: string;
    strDrink: string;
    strCategory: string;
    strAlcoholic: string;
    strGlass: string;
    strInstructions: string;
    strIngredient1: string;
    strIngredient2: string;
    strIngredient3: string;
    strIngredient4: string;
    strIngredient5: string;
    strIngredient6: string;
    strIngredient7: string;
    strIngredient8: string;
    strIngredient9: string;
    strIngredient10: string;
    strIngredient11: string;
    strIngredient12: string;
    strIngredient13: string;
    strIngredient14: string;
    strIngredient15: string;
    strMeasure1: string;
    strMeasure2: string;
    strMeasure3: string;
    strMeasure4: string;
    strMeasure5: string;
    strMeasure6: string;
    strMeasure7: string;
    strMeasure8: string;
    strMeasure9: string;
    strMeasure10: string;
    strMeasure11: string;
    strMeasure12: string;
    strMeasure13: string;
    strMeasure14: string;
    strMeasure15: string;
}

interface Cocktail {
    id: string;
    name: string;
    owner: string;
    description: string;
    ingredients: Ingredient[];
    votes: number;
    createdAt: Date;
    category: string;
    glassType: string;
    isAlcoholic: boolean;
    searchableIngredients: string;
}

interface Ingredient {
    name: string;
    amount: number;
    unitOfMeasure: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    return importCocktails(req, res);
}


async function importCocktails(
    req: NextApiRequest,
    res: NextApiResponse
) {
    return res.json({});

    await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=z`)
        .then((res) => res.json())
        .then(async (data: Import) => {
            try {
                // connect to the database
                let { db } = await connectToDatabase();

                for (let i = 7; i < Math.min(data.drinks.length, 14); i++) {
                    const existingCocktail = await db
                        .collection('cocktails')
                        .findOne({ name: data.drinks[i].strDrink });

                    if (!existingCocktail) {
                        await importDrink(data.drinks[i], db);
                    }
                }

                // return a message
                return res.json({
                    message: 'Cocktail Successfully Created',
                    success: true,
                });
            }
            catch (e: any) {
                return res.json({
                    message: 'error',
                    e: new Error(e).message,
                })
            }
        }).catch(e => {
            // return an error
            return res.json({
                //@ts-ignore
                message: new Error(error).message,
                success: false,
            });
        });
}

const importDrink = async (drink: Drink, db: Db) => {
    const cocktail = {} as Cocktail;

    cocktail.createdAt = new Date();
    cocktail.id = uuidv4();
    cocktail.name = drink.strDrink;
    cocktail.isAlcoholic = drink.strAlcoholic == 'Alcoholic';
    cocktail.category = drink.strCategory;
    cocktail.glassType = drink.strGlass;
    cocktail.description = drink.strInstructions;
    cocktail.votes = 0;
    cocktail.owner = 'CocktailRecipeCo';
    cocktail.ingredients = [];
    cocktail.searchableIngredients = "";

    if (!!drink.strIngredient1) {
        const ingredient = {
            name: drink.strIngredient1,
            amount: parseMeasurement(drink.strMeasure1),
            unitOfMeasure: parseUnit(drink.strMeasure1)
        } as Ingredient;

        cocktail.ingredients.push(ingredient);
        cocktail.searchableIngredients += ingredient.name + " | ";
    }

    if (!!drink.strIngredient2) {
        const ingredient = {
            name: drink.strIngredient2,
            amount: parseMeasurement(drink.strMeasure2),
            unitOfMeasure: parseUnit(drink.strMeasure2)
        } as Ingredient;

        cocktail.ingredients.push(ingredient);
        cocktail.searchableIngredients += ingredient.name + " | ";
    }

    if (!!drink.strIngredient3) {
        const ingredient = {
            name: drink.strIngredient3,
            amount: parseMeasurement(drink.strMeasure3),
            unitOfMeasure: parseUnit(drink.strMeasure3)
        } as Ingredient;

        cocktail.ingredients.push(ingredient);
        cocktail.searchableIngredients += ingredient.name + " | ";
    }

    if (!!drink.strIngredient4) {
        const ingredient = {
            name: drink.strIngredient4,
            amount: parseMeasurement(drink.strMeasure4),
            unitOfMeasure: parseUnit(drink.strMeasure4)
        } as Ingredient;

        cocktail.ingredients.push(ingredient);
        cocktail.searchableIngredients += ingredient.name + " | ";
    }

    if (!!drink.strIngredient5) {
        const ingredient = {
            name: drink.strIngredient5,
            amount: parseMeasurement(drink.strMeasure5),
            unitOfMeasure: parseUnit(drink.strMeasure5)
        } as Ingredient;

        cocktail.ingredients.push(ingredient);
        cocktail.searchableIngredients += ingredient.name + " | ";
    }

    if (!!drink.strIngredient6) {
        const ingredient = {
            name: drink.strIngredient6,
            amount: parseMeasurement(drink.strMeasure6),
            unitOfMeasure: parseUnit(drink.strMeasure6)
        } as Ingredient;

        cocktail.ingredients.push(ingredient);
        cocktail.searchableIngredients += ingredient.name + " | ";
    }

    if (!!drink.strIngredient7) {
        const ingredient = {
            name: drink.strIngredient7,
            amount: parseMeasurement(drink.strMeasure7),
            unitOfMeasure: parseUnit(drink.strMeasure7)
        } as Ingredient;

        cocktail.ingredients.push(ingredient);
        cocktail.searchableIngredients += ingredient.name + " | ";
    }

    if (!!drink.strIngredient8) {
        const ingredient = {
            name: drink.strIngredient8,
            amount: parseMeasurement(drink.strMeasure8),
            unitOfMeasure: parseUnit(drink.strMeasure8)
        } as Ingredient;

        cocktail.ingredients.push(ingredient);
        cocktail.searchableIngredients += ingredient.name + " | ";
    }

    if (!!drink.strIngredient9) {
        const ingredient = {
            name: drink.strIngredient9,
            amount: parseMeasurement(drink.strMeasure9),
            unitOfMeasure: parseUnit(drink.strMeasure9)
        } as Ingredient;

        cocktail.ingredients.push(ingredient);
        cocktail.searchableIngredients += ingredient.name + " | ";
    }

    if (!!drink.strIngredient10) {
        const ingredient = {
            name: drink.strIngredient10,
            amount: parseMeasurement(drink.strMeasure10),
            unitOfMeasure: parseUnit(drink.strMeasure10)
        } as Ingredient;

        cocktail.ingredients.push(ingredient);
        cocktail.searchableIngredients += ingredient.name + " | ";
    }

    if (!!drink.strIngredient11) {
        const ingredient = {
            name: drink.strIngredient11,
            amount: parseMeasurement(drink.strMeasure11),
            unitOfMeasure: parseUnit(drink.strMeasure11)
        } as Ingredient;

        cocktail.ingredients.push(ingredient);
        cocktail.searchableIngredients += ingredient.name + " | ";
    }

    if (!!drink.strIngredient12) {
        const ingredient = {
            name: drink.strIngredient12,
            amount: parseMeasurement(drink.strMeasure12),
            unitOfMeasure: parseUnit(drink.strMeasure12)
        } as Ingredient;

        cocktail.ingredients.push(ingredient);
        cocktail.searchableIngredients += ingredient.name + " | ";
    }

    if (!!drink.strIngredient13) {
        const ingredient = {
            name: drink.strIngredient13,
            amount: parseMeasurement(drink.strMeasure13),
            unitOfMeasure: parseUnit(drink.strMeasure13)
        } as Ingredient;

        cocktail.ingredients.push(ingredient);
        cocktail.searchableIngredients += ingredient.name + " | ";
    }

    if (!!drink.strIngredient14) {
        const ingredient = {
            name: drink.strIngredient14,
            amount: parseMeasurement(drink.strMeasure14),
            unitOfMeasure: parseUnit(drink.strMeasure14)
        } as Ingredient;

        cocktail.ingredients.push(ingredient);
        cocktail.searchableIngredients += ingredient.name + " | ";
    }

    if (!!drink.strIngredient15) {
        const ingredient = {
            name: drink.strIngredient15,
            amount: parseMeasurement(drink.strMeasure15),
            unitOfMeasure: parseUnit(drink.strMeasure15)
        } as Ingredient;

        cocktail.ingredients.push(ingredient);
        cocktail.searchableIngredients += ingredient.name + " | ";
    }

    // add the post
    await db.collection('cocktails').insertOne(cocktail);
}

const parseUnit = (input: string): string => {
    if (!input)
        return "";

    const inputClean = input.trim();
    const parts = inputClean.split(" ");

    for (const part of parts) {
        const isPartial = checkForPartial(part);
        const isNumber = checkForInteger(part);

        if (!isPartial && !isNumber)
            return part;
    }

    return "";
}

const parseMeasurement = (input: string): number => {
    if (!input)
        return 1;

    const inputClean = input.trim();
    const parts = inputClean.split(" ");

    let value = 0;

    for (const part of parts) {
        value += parsePart(part);
    }

    return value;
}

const parsePart = (input: string): number => {
    const isPartial = checkForPartial(input);
    let value = 0;

    if (isPartial) {
        value = parseHalfMeasure(input);
    } else {
        if (checkForInteger(input)) {
            value = Number.parseInt(input);
        }
    }

    return value;
}

const checkForPartial = (input: string) => {
    let found = input.indexOf(`/`) != -1;

    return found;
}

const checkForInteger = (input: string) => {
    try {
        const test = Number.parseInt(input);
        return !isNaN(test);
    } catch {
        return false;
    }
}

const parseHalfMeasure = (input: string) => {
    const parts = input.split('/');

    if (parts.length != 2) {
        return 0.25;
    }

    const firstPart = Number.parseFloat(parts[0]);
    const secondPart = Number.parseFloat(parts[1]);

    if (isNaN(firstPart) || isNaN(secondPart))
        return 0.25;

    return firstPart / secondPart;
}
