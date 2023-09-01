import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGame, getGameTypes, getGames } from '../../managers/GameManager.js'


export const GameForm = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])
    const [games, setGames] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: "",
        playersNeeded: 0,
        name: "",
        gameType: 0,
        gamerId: 0
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGameTypes()
            .then((gameTypeData) => {
                setGameTypes(gameTypeData)
            })
    }, [])

    useEffect(() => {
        getGames()
        .then(gameData => setGames(gameData))
    }, [])

    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        const newGameState = { ...currentGame }
        newGameState [domEvent.target.name] = domEvent.target.value
        setCurrentGame(newGameState)        
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentGame.name}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="playersNeeded">Number of Players: </label>
                    <input type="text" name="playersNeeded" required autoFocus className="form-control"
                        value={currentGame.playersNeeded}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="text" name="skillLevel" required autoFocus className="form-control"
                        value={currentGame.skillLevel}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select name="gameType" className="form-control"
                        value={currentGame.gameType}
                        onChange={changeGameState}>
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
                        name: currentGame.name,
                        players_needed: parseInt(currentGame.playersNeeded),
                        skill_level: currentGame.skillLevel,
                        game_type: parseInt(currentGame.gameType)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}