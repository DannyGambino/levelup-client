import React, { useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager.js"
import { useNavigate } from 'react-router-dom'

export const EventList = (props) => {
    const navigate = useNavigate()
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            <div>
                <h2>
                    <button className="btn btn-2 btn-sep icon-create"
                    onClick={() => {
                        navigate({ pathname: "/events/new" })
                    }}
                    >Register New Event</button>
                </h2>
            </div>
            {
                events.map(event => {
                    return <>
                    <section key={`event--${event.id}`} className="event">
                        <div className="event__title">{event.event_name}</div>
                        <div className="event__date">Date: {event.date}</div>
                        <div className="event__time">Time: {event.time}</div>
                        <div className="event__organizer">Host: {event.organizer}</div>
                        <div className="event__attendee">Attending: {event.attendee}</div>
                        <div className="event__game">Game: {event.game}</div>
                    </section>
                    </>
                })
            }
        </article>
    )
}