import { useState, useEffect } from 'react'
function StudentHub() {
    const [item, setItem] = useState('')
    const [question, setQuestion] = useState('')

    const [questions, setQuestions] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/api/help-desk')
            .then((res) => res.json())
            .then((data) => setQuestions(data))
            .catch((error) => console.log(error))
    }, [])

    const addQuestion = async () => {
        if (question.trim() === '') {
            alert('Please enter your question!')
            return
        }

        try {
            const response = await fetch('http://localhost:5000/api/help-desk', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    question: question
                })
            })

            if (!response.ok) throw new Error('Failed to submit question')

            const newQuestion = await response.json()
            setQuestions([...questions, newQuestion])
            setQuestion('')
            alert('Query submitted successfully!')
        } catch (error) {
            console.log(error)
            alert('Unable to submit query!')
        }
    }
    const deleteQuestion = async (questionId) => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/help-desk/${questionId}`,
                {
                    method: 'DELETE'
                }
            )

            if (!response.ok) throw new Error('Failed to delete question')

            setQuestions(questions.filter((q) => q._id !== questionId))
            alert('Query deleted successfully!')
        } catch (error) {
            console.log(error)
            alert('Unable to delete query!')
        }
    }




    const [items, setItems] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/api/lost-items')
            .then((res) => res.json())
            .then((data) => setItems(data))
            .catch((error) => console.log(error))
    }, [])

    const addItem = async () => {
        if (item.trim() === '') {
            alert('Please enter item details!')
            return
        }

        try {
            const response = await fetch('http://localhost:5000/api/lost-items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    description: item
                })
            })

            if (!response.ok) throw new Error('Failed to report item')

            const newItem = await response.json()
            setItems([...items, newItem])
            setItem('')
            alert('Item reported successfully!')
        } catch (error) {
            console.log(error)
            alert('Unable to report item!')
        }
    }
    const deleteItem = async (itemId) => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/lost-items/${itemId}`,
                {
                    method: 'DELETE'
                }
            )

            if (!response.ok) throw new Error('Failed to delete item')

            setItems(items.filter((oneItem) => oneItem._id !== itemId))
            alert('Item deleted successfully!')
        } catch (error) {
            console.log(error)
            alert('Unable to delete item!')
        }
    }


    const [joinedClubs, setJoinedClubs] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('token')

        fetch('http://localhost:5000/api/clubs', {
            headers: token
                ? { 'Authorization': `Bearer ${token}` }
                : {}
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Unable to fetch clubs')
                }
                return res.json()
            })
            .then((data) => {
                const myClubs = data
                    .filter((club) => club.isJoined)
                    .map((club) => club.name)

                setJoinedClubs(myClubs)
            })
            .catch((error) => console.log(error))
    }, [])

    const clubs = [
        'Coding Club',
        'Robotics Club',
        'Literary Club',
        'Cultural Club'
    ]

    const joinClub = async (club) => {
        try {
            const token = localStorage.getItem('token')

            if (!token) {
                alert('Please login first to join a club!')
                return
            }

            const response = await fetch('http://localhost:5000/api/clubs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: club
                })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Failed to join club')
            }

            setJoinedClubs((previous) => [...previous, club])
            alert('Successfully joined ' + club + '!')

        } catch (error) {
            alert(error.message)
        }
    }
    return (
        <div className="student-hub-page">

            {/* Hero Section */}
            <section className="hub-hero">
                <span className="hub-tag">YOUR CAMPUS • YOUR COMMUNITY</span>

                <h1>
                    Your Student <span>Hub.</span>
                </h1>

                <p>
                    Everything you need for a better campus experience.
                    Discover student services, helpful resources and
                    communities — all in one place.
                </p>

                <div className="hub-hero-note">
                    <span>CC.</span>
                    <div>
                        <h3>One Hub. Endless Possibilities.</h3>
                        <p>Explore, connect and make the most of student life.</p>
                    </div>
                </div>
            </section>
            {/* Lost & Found Section */}
            <section className="lost-found-section">
                <h2>Lost & Found</h2>
                <p>Lost something? Report it here so other students can help.</p>

                <input
                    type="text"
                    placeholder="Enter lost or found item details..."
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                />

                <button onClick={addItem}>Report Item</button>

                {items.length > 0 && (
                    <div className="reported-items">
                        <h3>Reported Items</h3>

                        {items.map((oneItem) => (
                            <div className="reported-item-card" key={oneItem._id}>
                                <span>{oneItem.description}</span>
                                <button className="delete-btn" onClick={() => deleteItem(oneItem._id)}>
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>
            {/* Campus Help Desk */}
            <section className="help-desk-section">
                <h2>Campus Help Desk</h2>
                <p>Have a campus-related question? Submit it here.</p>

                <input
                    type="text"
                    placeholder="Enter your question..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />

                <button onClick={addQuestion}>Submit Query</button>

                {questions.length > 0 && (
                    <div>
                        <h3>Submitted Queries</h3>

                        {questions.map((q) => (
                            <div className="help-query-card" key={q._id}>
                                <span>{q.question}</span>
                                <button className="delete-btn" onClick={() => deleteQuestion(q._id)}>
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>
            {/* Services */}
            <section className="hub-services">

                <div className="hub-heading">
                    <span>STUDENT SERVICES</span>
                    <h2>Everything in One Place</h2>
                    <p>Choose a service and explore what CampusConnect offers.</p>
                </div>

                <div className="hub-service-grid">

                    <div className="hub-service-card">
                        <div className="hub-service-icon">🔎</div>
                        <span className="hub-service-number">SERVICE 01</span>
                        <h3>Lost & Found</h3>
                        <p>
                            Report lost belongings or find items
                            reported by other students.
                        </p>
                        <span className="hub-service-link">Explore Service →</span>
                    </div>

                    <div className="hub-service-card">
                        <div className="hub-service-icon">💬</div>
                        <span className="hub-service-number">SERVICE 02</span>
                        <h3>Campus Help Desk</h3>
                        <p>
                            Find guidance and get help with
                            common campus-related queries.
                        </p>
                        <span className="hub-service-link">Explore Service →</span>
                    </div>

                    <div className="hub-service-card">
                        <div className="hub-service-icon">👥</div>
                        <span className="hub-service-number">SERVICE 03</span>
                        <h3>Clubs & Communities</h3>
                        <p>
                            Discover student clubs and connect
                            with people who share your interests.
                        </p>
                        <span className="hub-service-link">Explore Service →</span>
                    </div>

                    <div className="hub-service-card">
                        <div className="hub-service-icon">📚</div>
                        <span className="hub-service-number">SERVICE 04</span>
                        <h3>Student Resources</h3>
                        <p>
                            Explore useful academic resources
                            and learning information.
                        </p>
                        <span className="hub-service-link">Explore Service →</span>
                    </div>

                </div>
            </section>
            {/* Clubs & Communities */}
            <section className="clubs-section">
                <h2>Clubs & Communities</h2>
                <p>Find your interests and become part of a community.</p>

                <div className="clubs-grid">
                    {clubs.map((club, index) => (
                        <div className="club-card" key={index}>
                            <h3>{club}</h3>

                            <button
                                onClick={() => joinClub(club)}
                                disabled={joinedClubs.includes(club)}
                            >
                                {joinedClubs.includes(club) ? 'Joined ✓' : 'Join Club'}
                            </button>
                        </div>
                    ))}
                </div>
            </section>
            {/* Student Resources */}
            <section className="resources-section">
                <h2>Student Resources</h2>
                <p>Useful resources to support your learning journey.</p>

                <div className="resources-grid">
                    <div className="resource-card">
                        <h3>Programming Practice</h3>
                        <p>Improve your coding skills.</p>
                        <a href="https://www.w3schools.com/" target="_blank" rel="noreferrer">
                            Explore Resources →
                        </a>
                    </div>

                    <div className="resource-card">
                        <h3>Technical Learning</h3>
                        <p>Learn web development and technology.</p>
                        <a href="https://developer.mozilla.org/" target="_blank" rel="noreferrer">
                            Explore Resources →
                        </a>
                    </div>

                    <div className="resource-card">
                        <h3>Coding Challenges</h3>
                        <p>Practice programming problems.</p>
                        <a href="https://leetcode.com/" target="_blank" rel="noreferrer">
                            Explore Resources →
                        </a>
                    </div>
                </div>
            </section>
            {/* Bottom Banner */}
            <section className="hub-bottom">
                <h2>Campus life is better when we're connected.</h2>
                <p>Learn together. Grow together. Stay connected.</p>
            </section>

        </div>
    )
}

export default StudentHub