"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [maxReadyTime, setMaxReadyTime] = useState("");

    const cuisines = [
        "African", "Asian", "American", "British", "Cajun", "Caribbean", "Chinese",
        "Eastern European", "European", "French", "German", "Greek", "Indian", "Irish",
        "Italian", "Japanese", "Jewish", "Korean", "Latin American", "Mediterranean",
        "Mexican", "Middle Eastern", "Nordic", "Southern", "Spanish", "Thai", "Vietnamese"
    ];

    const handleSubmit = () => {
        const params = new URLSearchParams();
        if (query) params.append("query", query);
        if (cuisine) params.append("cuisine", cuisine);
        if (maxReadyTime) params.append("maxReadyTime", maxReadyTime);
        const queryString = params.toString();
        console.log("Redirecting to: ", `/recipes?${queryString}`); // Перевірка URL
        router.push(`/recipes?${queryString}`);
    };


    const isFormValid = query || cuisine || maxReadyTime;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-6 text-gray-500">Recipe Finder</h1>
                <input
                    type="text"
                    placeholder="Enter recipe (e.g., pasta)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full mb-4 p-2 border border-gray-300 rounded text-gray-500"
                />
                <select
                    value={cuisine}
                    onChange={(e) => setCuisine(e.target.value)}
                    className="w-full mb-4 p-2 border border-gray-300 rounded text-gray-500"
                >
                    <option value="">Select Cuisine</option>
                    {cuisines.map((cuisineOption, index) => (
                        <option key={index} value={cuisineOption}>
                            {cuisineOption}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    placeholder="Max prep time (min)"
                    value={maxReadyTime}
                    onChange={(e) => setMaxReadyTime(e.target.value)}
                    className="w-full mb-4 p-2 border border-gray-300 rounded text-gray-500"
                />
                <button
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                    className={`w-full py-2 bg-blue-500 text-white rounded ${
                        !isFormValid ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    Search Recipes
                </button>
            </div>
        </div>
    );
}
