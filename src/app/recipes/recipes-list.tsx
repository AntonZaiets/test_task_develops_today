"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function RecipesList() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("query");
    const cuisine = searchParams.get("cuisine");
    const maxReadyTime = searchParams.get("maxReadyTime");

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRecipes = async () => {
            const controller = new AbortController(); // Для скасування запиту
            const timeoutId = setTimeout(() => controller.abort(), 5000); // Таймаут 5 секунд

            // Формування параметрів запиту
            const apiQuery = query ? `query=${query}` : "";
            const apiCuisine = cuisine ? `cuisine=${cuisine}` : "";
            const apiMaxReadyTime = maxReadyTime ? `maxReadyTime=${maxReadyTime}` : "";

            // Перевірка, чи є хоча б один параметр
            if (!apiQuery && !apiCuisine && !apiMaxReadyTime) {
                setError("Please provide at least one search parameter.");
                setLoading(false);
                return;
            }

            // Формуємо повний URL з передачею параметрів
            const url = `https://api.spoonacular.com/recipes/complexSearch?${apiQuery}${apiQuery && apiCuisine ? "&" : ""}${apiCuisine}${(apiQuery || apiCuisine) && apiMaxReadyTime ? "&" : ""}${apiMaxReadyTime}&apiKey=80682c490ee144edb66ea070337ccbb6`;

            try {
                const res = await fetch(url, { signal: controller.signal });

                if (!res.ok) {
                    throw new Error(`API Error: ${res.status} ${res.statusText}`);
                }

                const data = await res.json();

                if (data.results && data.results.length > 0) {
                    setRecipes(data.results);
                } else {
                    setError("No recipes found. Try a different search.");
                }
            } catch (err) {
                setError(err.message || "Failed to load recipes");
            } finally {
                clearTimeout(timeoutId); // Очищаємо таймаут
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [query, cuisine, maxReadyTime]); // Залежності від параметрів пошуку

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
                <div
                    key={recipe.id}
                    className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
                    onClick={() => router.push(`/recipes/${recipe.id}`)}
                >
                    <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-100 object-cover rounded"
                    />
                    <h2 className="mt-2 text-lg font-semibold text-gray-500">{recipe.title}</h2>
                </div>
            ))}
        </div>
    );
}
