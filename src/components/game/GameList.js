import React, { useEffect, useState } from "react"
import { getGames } from "../../managers/GameManager.js"
import { useNavigate } from 'react-router-dom'



export const GameList = (props) => {
    const navigate = useNavigate()
    const [ games, setGames ] = useState([])

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (
        <article className="games">
            <div>
                <h2>
                    <button className="btn btn-2 btn-sep icon-create"
                    onClick={() => {
                        navigate({ pathname: "/games/new" })
                    }}
                    >Register New Game</button>
                </h2>
            </div>
            {
                games.map(game => {
                    return <>
                    <h>
                        <button
                        onClick={() => {
                            navigate({ pathname: "/games/update" })
                        }}
                        >Update Game</button>
                    </h>
                    <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.name}</div>
                        <div className="game__players">{game.players_needed} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                    </section>
                    </>
                })
            }
        </article>
    )
}