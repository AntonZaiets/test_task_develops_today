import { Suspense } from "react";
import RecipesList from "./recipes-list";

export default function RecipesPage({ searchParams }) {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Recipes</h1>
            <Suspense fallback={<p>Loading recipes...</p>}>
                <RecipesList searchParams={searchParams} />
            </Suspense>
        </div>
    );
}
