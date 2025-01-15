'use client'

// I use Axios for data fetching
import { useState, useEffect } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import axios from 'axios'

// Define the type structure for Pokémon data
type Pokemon = {
    id: number
    name: string
    height: number
    weight: number
    sprites: {
        front_default: string // URL for the Pokémon's front sprite
    }
}

export default function Activity6() {
    // State to store the list of Pokémon data
    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    // State to manage loading status
    const [loading, setLoading] = useState(true)
    // State to manage any errors during data fetching
    const [error, setError] = useState('')

    useEffect(() => {
        // Fetch data from the PokeAPI
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=10') // Step 1: Fetch basic Pokémon data
            .then(async (response) => {
                // Extract Pokémon detail URLs and fetch detailed data
                const pokemonDetails = await Promise.all(
                    response.data.results.map((pokemon: { url: string }) => axios.get(pokemon.url))
                )
                // Store detailed Pokémon data in state
                setPokemons(pokemonDetails.map((res) => res.data))
                setLoading(false) // Set loading to false after data is fetched
            })
            .catch(() => {
                // Handle errors during fetching
                setError('Failed to fetch Pokémon data.')
                setLoading(false)
            })
    }, []) // Empty dependency array ensures this runs only once

    // Display loading state
    if (loading) return <p>Loading...</p>
    // Display error message if fetching fails
    if (error) return <p>{error}</p>

    return (
        <main
            // Main container for centering content and applying background
            className="flex flex-col items-center justify-center min-h-screen bg-muted py-10"
        >
            <h1 className="text-3xl font-bold mb-8 text-center">Pokémon Card List</h1>
            {/* Grid container to display Pokémon cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 w-full max-w-7xl">
                {pokemons.map((pokemon: Pokemon) => (
                    // Card for each Pokémon
                    <Card
                        key={pokemon.id} // Unique key for each card
                        className="shadow-lg hover:shadow-xl transition-shadow rounded-lg overflow-hidden"
                    >
                        <CardHeader className="flex justify-center bg-gray-100 p-4">
                            {/* Avatar displaying the Pokémon sprite */}
                            <Avatar className="w-28 h-28">
                                <AvatarImage src={pokemon.sprites.front_default} alt={pokemon.name} />
                                {/* Fallback if sprite image is unavailable */}
                                <AvatarFallback className="text-xl bg-gray-300">
                                    {pokemon.name[0].toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </CardHeader>
                        <CardContent className="p-4">
                            {/* Pokémon name */}
                            <h2 className="text-2xl font-bold text-center capitalize mb-4">
                                {pokemon.name}
                            </h2>
                            {/* Pokémon height and weight */}
                            <p className="text-gray-600 text-center">Height: {pokemon.height}</p>
                            <p className="text-gray-600 text-center">Weight: {pokemon.weight}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </main>
    )
}
