'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import axios from 'axios'

type Pokemon = {
    id: number
    name: string
    height: number
    weight: number
    sprites: {
        front_default: string
    }
}

export default function Activity6() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        // Step 1: Fetch data from PokeAPI
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=10')
            .then(async (response) => {
                // Step 2: Extract URLs for each Pokémon and fetch detailed data
                const pokemonDetails = await Promise.all(
                    response.data.results.map((pokemon: { url: string }) => axios.get(pokemon.url))
                )
                // Step 3: Save the detailed Pokémon data
                setPokemons(pokemonDetails.map((res) => res.data))
                setLoading(false)
            })
            .catch(() => {
                setError('Failed to fetch Pokémon data.')
                setLoading(false)
            })
    }, [])

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-muted py-10">
            <h1 className="text-3xl font-bold mb-8 text-center">Pokémon Card List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 w-full max-w-7xl">
                {pokemons.map((pokemon: Pokemon) => (
                    <Card key={pokemon.id} className="shadow-lg hover:shadow-xl transition-shadow rounded-lg overflow-hidden">
                        <CardHeader className="flex justify-center bg-gray-100 p-4">
                            <Avatar className="w-28 h-28">
                                <AvatarImage src={pokemon.sprites.front_default} alt={pokemon.name} />
                                <AvatarFallback className="text-xl bg-gray-300">
                                    {pokemon.name[0].toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </CardHeader>
                        <CardContent className="p-4">
                            <h2 className="text-2xl font-bold text-center capitalize mb-4">{pokemon.name}</h2>
                            <p className="text-gray-600 text-center">Height: {pokemon.height}</p>
                            <p className="text-gray-600 text-center">Weight: {pokemon.weight}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </main>
    )
}
