import { useState, useEffect } from 'react'

function Events() {
    const [eventTitle, setEventTitle] = useState('')
    const [events, setEvents] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedEvent, setSelectedEvent] = useState('')
    useEffect(() => {
        fetch('http://localhost:5000/api/events')
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .catch((error) => console.log(error))
    }, [])
    const eventDetails = {
        'Campus Hackathon': 'Work in teams, solve real-world problems and build creative technology solutions.',
        'Cultural Fest': 'Enjoy music, dance, performances and celebrate student creativity.',
        'Project Exhibition': 'Showcase your projects and share innovative ideas with other students.',
        'Sports Tournament': 'Participate in sports activities and develop teamwork.'
    }
    // Add Event Function
    const addEvent = async () => {
        if (eventTitle.trim() === '') {
            alert('Please enter an event title!')
            return
        }

        try {
            const response = await fetch('http://localhost:5000/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: eventTitle,
                    description: eventTitle
                })
            })

            if (!response.ok) throw new Error('Failed to add event')

            const newEvent = await response.json()
            setEvents([...events, newEvent])
            setEventTitle('')
            alert('Event added successfully!')
        } catch (error) {
            console.log(error)
            alert('Unable to add event!')
        }
    }
    useEffect(() => {
        localStorage.setItem('campusEvents', JSON.stringify(events))
    }, [events])
    const filteredEvents = events.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const deleteEvent = async (eventId) => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/events/${eventId}`,
                {
                    method: 'DELETE'
                }
            )

            if (!response.ok) throw new Error('Failed to delete event')

            setEvents(events.filter((event) => event._id !== eventId))
            alert('Event deleted successfully!')
        } catch (error) {
            console.log(error)
            alert('Unable to delete event!')
        }
    }
    return (
        <div className="events-page">

            {/* Hero Section */}
            <section className="events-hero">
                <span className="events-tag">DISCOVER • PARTICIPATE • GROW</span>

                <h1>
                    Explore Campus <span>Events.</span>
                </h1>

                <p>
                    From technical competitions to cultural celebrations,
                    discover experiences that make your college life memorable.
                </p>

                <div className="events-hero-stats">
                    <div>
                        <h3>01</h3>
                        <span>Learn</span>
                    </div>
                    <div>
                        <h3>02</h3>
                        <span>Participate</span>
                    </div>
                    <div>
                        <h3>03</h3>
                        <span>Connect</span>
                    </div>
                </div>
            </section>

            {/* Event Categories */}
            <section className="events-content">

                <div className="events-heading">
                    <span>FIND YOUR INTEREST</span>
                    <h2>Discover What's Happening</h2>
                    <p>Explore activities and opportunities around campus.</p>
                </div>
                {/* Add New Event */}
                <section className="add-event-section">
                    <h2>Add a New Event</h2>

                    <input
                        type="text"
                        placeholder="Enter event title..."
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                    />

                    <button onClick={addEvent}>Add Event</button>
                </section>
                {/* Search Events */}
                <section className="search-event-section">
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </section>
                {/* Display Added Events */}
                {events.length > 0 && (
                    <div className="added-events">
                        <h2>Recently Added Events</h2>

                        {filteredEvents.length > 0 ? (
                            filteredEvents.map((event) => (
                                <div className="added-event-card" key={event._id}>
                                    <span>{event.title}</span>

                                    <button onClick={() => deleteEvent(event._id)}>
                                        Delete
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No matching events found.</p>
                        )}
                    </div>
                )}
                <div className="events-grid">

                    <div className="event-box" onClick={() => setSelectedEvent('Campus Hackathon')}>
                        <div className="event-box-top">
                            <span>01</span>
                            <span className="event-type">TECHNICAL</span>
                        </div>
                        <div className="event-emoji">💻</div>
                        <h3>Campus Hackathon</h3>
                        <p>
                            Work in teams, solve real-world problems
                            and build creative technology solutions.
                        </p>
                        <div className="event-bottom">Innovation & Technology</div>
                    </div>
                    {selectedEvent && (
                        <section className="event-details">
                            <h2>{selectedEvent}</h2>
                            <p>{eventDetails[selectedEvent]}</p>
                            <button onClick={() => setSelectedEvent('')}>
                                Close Details
                            </button>
                        </section>
                    )}

                    <div className="event-box" onClick={() => setSelectedEvent('Cultural Fest')}>
                        <div className="event-box-top">
                            <span>02</span>
                            <span className="event-type">CULTURAL</span>
                        </div>
                        <div className="event-emoji">🎭</div>
                        <h3>Cultural Fest</h3>
                        <p>
                            Celebrate creativity, music, dance
                            and the diverse talents of students.
                        </p>
                        <div className="event-bottom">Art & Celebration</div>
                    </div>

                    <div className="event-box" onClick={() => setSelectedEvent('Project Exhibition')}>
                        <div className="event-box-top">
                            <span>03</span>
                            <span className="event-type">PROJECTS</span>
                        </div>
                        <div className="event-emoji">🚀</div>
                        <h3>Project Exhibition</h3>
                        <p>
                            Showcase your projects, share innovative
                            ideas and learn from other creators.
                        </p>
                        <div className="event-bottom">Ideas & Innovation</div>
                    </div>

                    <div className="event-box" onClick={() => setSelectedEvent('Sports Tournament')}>
                        <div className="event-box-top">
                            <span>04</span>
                            <span className="event-type">SPORTS</span>
                        </div>
                        <div className="event-emoji">🏆</div>
                        <h3>Sports Tournament</h3>
                        <p>
                            Participate in sports, develop teamwork
                            and enjoy healthy campus competition.
                        </p>
                        <div className="event-bottom">Teamwork & Sports</div>
                    </div>

                </div>
            </section>

            {/* Bottom Banner */}
            <section className="events-banner">
                <h2>Make Every Campus Moment Count.</h2>
                <p>Discover new experiences. Build new connections.</p>
            </section>

        </div>
    )
}

export default Events