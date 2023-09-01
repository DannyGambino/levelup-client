import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createEvent, getEvents } from '../../managers/EventManager.js'


export const EventForm = () => {
    const navigate = useNavigate()
    const [events, setEvents] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        organizer: 0,
        date: "",
        time: "",
        attendee: [],
        eventName: "",
        game: 0
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getEvents()
        .then(eventData => setEvents(eventData))
    }, [])

    const changeEventState = (domEvent) => {
        // TODO: Complete the onChange function
        const newEventState = { ...currentEvent }
        newEventState [domEvent.target.name] = domEvent.target.value
        setCurrentEvent(newEventState)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eventName">Name: </label>
                    <input type="text" name="eventName" required autoFocus className="form-control"
                        value={currentEvent.eventName}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="organizer">Host: </label>
                    <input type="text" name="organizer" required autoFocus className="form-control"
                        value={currentEvent.organizer}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game: </label>
                    <input type="text" name="game" required autoFocus className="form-control"
                        value={currentEvent.game}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        organizer: parseInt(currentEvent.organizer),
                        date: currentEvent.date,
                        time: currentEvent.time,
                        attendee: parseInt(currentEvent.attendee),
                        event_name: currentEvent.eventName,
                        game: parseInt(currentEvent.game)
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}