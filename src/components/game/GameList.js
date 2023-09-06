import React, { useEffect, useState } from "react"
import { deleteGame, getGames } from "../../managers/GameManager.js"
import { useNavigate } from 'react-router-dom'



export const GameList = (props) => {
    const navigate = useNavigate()
    const [ games, setGames ] = useState([])

    const setGameData = () => {
        getGames().then(data => setGames(data))
    }
    useEffect(() => {
        setGameData()
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
                        <button
                        onClick={() => {
                            navigate({ pathname: `/games/${game.id}` })
                        }}
                        >Update Game</button>
                        <button
                        onClick={() => {
                            deleteGame(game.id).then(() => setGameData())
                        }}
                        >Delete Game</button>
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