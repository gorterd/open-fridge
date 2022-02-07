const recipeScraper = require("recipe-scraper");
const Parser = require('ingredientparser');
const axios = require('axios').default;
const { writeFileSync } = require('fs');
const { EventEmitter } = require('events');

const BATCH_SIZE = 10;

EventEmitter.defaultMaxListeners = BATCH_SIZE * 2;
scrapeRecipes(__dirname + '/test/recipes_01.json', 1);

async function scrapeRecipes(destinationFile, pageStart, pageEnd) {
  pageEnd = pageEnd || pageStart;
  let recipes = [];
  for (let pageNum = pageStart; pageNum <= pageEnd; pageNum++) {
    let pageRecipes = await scrapePage(pageNum);
    recipes.push(...pageRecipes);
  }
  let recipesJson = JSON.stringify(recipes, null, 2);
  writeFileSync(destinationFile, recipesJson);
}

async function scrapePage(pageNum) {
  const indexUrl = `https://www.yummly.com/sitemap-en-US-${pageNum}.html`;
  const { data } = await axios.get(indexUrl, { responseType: 'text' });
  return batchScrape(data);
}

async function batchScrape(htmlText) {
  const urlRegex = /href="(https:\/\/www\.yummly\.com\/recipe[^"]*)"/g;
  let urls = Array.from(htmlText.matchAll(urlRegex)).map(match => match[1]);

  const recipes = [];
  let batchStart = 0;
  while (batchStart < urls.length) {
    const scrapePromises = urls
      .slice(batchStart, batchStart + BATCH_SIZE)
      .map(url => scrapeRecipe(url));
    const recipeBatch = (await Promise.all(scrapePromises)).filter(Boolean);
    recipes.push(...recipeBatch);
    batchStart += BATCH_SIZE;
  }

  return recipes;
}

async function scrapeRecipe(recipeUrl) {
  try {
    const recipe = await recipeScraper(recipeUrl);
    const ingredients = recipe.ingredients.map(ingredient => ({
      ...Parser.parse(ingredient),
      fullName: ingredient
    }));

    return {
      ...recipe,
      ingredients,
      time: { total: recipe.time.total },
      url: recipeUrl
    };
  } catch (e) {
    console.log(`Failed to parse ${recipeUrl}\n`, e.message);
    return null;
  }
}