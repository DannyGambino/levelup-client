import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getGameTypes, getGames, updateGame } from "../../managers/GameManager"

export const UpdateGameForm = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])
    const [games, setGame] = useState([])
    const { gameId } = useParams()
    

    const [currentGame, setCurrentGame] = useState({
        id: gameId,
        skillLevel: "",
        playersNeeded: 0,
        name: "",
        gameType: 0,
    })

    useEffect(() => {
        getGameTypes()
            .then((gameTypeData) => {
                setGameTypes(gameTypeData)
            })
    }, [])

    useEffect(() => {
        getGames()
        .then(gameData => setGame(gameData.filter(game => parseInt(gameId) === parseInt(game.id))))
    }, [])

    const updateGameState = (domEvent) => {
        const updatedState = { ...currentGame }
        console.log(updatedState)
        updatedState [domEvent.target.name] = domEvent.target.value
        updatedState.id = currentGame.id
        setCurrentGame(updatedState)
    }

    return (
        <form className="gameForm">
            <article>
                {
                    games.map(game => {
                        return <>
                        <section key={`game--${game.id}`} className="game">
                            <h2 className="game__title">{game.name}</h2>
                        </section>
                        </>
                    })
                }
            </article>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentGame.name}
                        onChange={updateGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="playersNeeded">Number of Players: </label>
                    <input type="text" name="playersNeeded" required autoFocus className="form-control"
                        value={currentGame.playersNeeded}
                        onChange={updateGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="text" name="skillLevel" required autoFocus className="form-control"
                        value={currentGame.skillLevel}
                        onChange={updateGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameType">Game Type: </label>
                    <select name="gameType" className="form-control"
                        value={currentGame.gameType}
                        onChange={updateGameState}>
                        <option value="0">Select A Game Type</option>
                        {
                            gameTypes.map(gt => (
                                <option key={gt.id} value={gt.id}>
                                {gt.label}
                                </option>
                        ))
                    }
                    </select>
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        id: currentGame.id,
                        name: currentGame.name,
                        players_needed: parseInt(currentGame.playersNeeded),
                        skill_level: currentGame.skillLevel,
                        game_type: parseInt(currentGame.gameType),
                    }
console.log(game)
                    // Send POST request to your API
                    updateGame(game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}