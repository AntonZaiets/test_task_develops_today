async function getRecipeDetails(recipeId) {
    const res = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=80682c490ee144edb66ea070337ccbb6`
    );
    return res.json();
}

export default async function RecipeDetails({ params }) {
    const recipe = await getRecipeDetails(params.id);

    if (!recipe) return <div>Recipe not found.</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">{recipe.title}</h1>
            <img src={recipe.image} alt={recipe.title} className="w-full h-60 object-cover rounded" />
            <div className="mt-4">
                <h3 className="text-lg font-semibold">Ingredients:</h3>
                <ul className="list-disc pl-6">
                    {recipe.extendedIngredients.map((ingredient) => (
                        <li key={ingredient.id}>{ingredient.original}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
