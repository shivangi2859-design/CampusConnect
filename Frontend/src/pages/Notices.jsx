import { useState, useEffect } from 'react'
function Notices() {
    const [noticeTitle, setNoticeTitle] = useState('')
    const [notices, setNotices] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        fetch('http://localhost:5000/api/notices')
            .then((res) => res.json())
            .then((data) => setNotices(data))
            .catch((error) => console.log(error))
    }, [])
    const filteredNotices = notices.filter((notice) =>
        notice.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const addNotice = async () => {
        if (noticeTitle.trim() === '') {
            alert('Please enter a notice title!')
            return
        }

        try {
            const response = await fetch('http://localhost:5000/api/notices', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: noticeTitle,
                    message: noticeTitle
                })
            })

            if (!response.ok) {
                throw new Error('Failed to add notice')
            }

            const newNotice = await response.json()
            setNotices([...notices, newNotice])
            setNoticeTitle('')
            alert('Notice added successfully!')
        } catch (error) {
            console.log(error)
            alert('Unable to add notice!')
        }
    }
    const deleteNotice = async (noticeId) => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/notices/${noticeId}`,
                {
                    method: 'DELETE'
                }
            )

            if (!response.ok) {
                throw new Error('Failed to delete notice')
            }

            setNotices(notices.filter((notice) => notice._id !== noticeId))
            alert('Notice deleted successfully!')
        } catch (error) {
            console.log(error)
            alert('Unable to delete notice!')
        }
    }
    return (
        <div className="notices-page">

            {/* Page Header */}
            <section className="notices-hero">
                <span className="notices-tag">CAMPUS INFORMATION CENTRE</span>

                <h1>
                    Latest <span>Announcements.</span>
                </h1>

                <p>
                    Stay informed, stay prepared. Find important academic
                    updates, workshops and student activities in one place.
                </p>
            </section>

            {/* Add New Notice */}
            <section className="add-notice-section">
                <h2>Add a New Notice</h2>

                <input
                    type="text"
                    placeholder="Enter notice title..."
                    value={noticeTitle}
                    onChange={(e) => setNoticeTitle(e.target.value)}
                />

                <button onClick={addNotice}>
                    Add Notice
                </button>
            </section>
            {/* Introduction */}
            {/* Search Notices */}
            <section className="search-notice-section">
                <input
                    type="text"
                    placeholder="Enter notice title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </section>
            {/* Display Added Notices */}
            {notices.length > 0 && (
                <section className="added-notices">
                    <h2>Recently Added Notices</h2>

                    {filteredNotices.length > 0 ? (
                        filteredNotices.map((notice) => (
                            <div className="added-notice-card" key={notice._id}>
                                <span>{notice.title}</span>

                                <button onClick={() => deleteNotice(notice._id)}>
                                    Delete
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No matching notices found.</p>
                    )}
                </section>
            )}
            <section className="notices-intro">
                <div>
                    <span>STAY UPDATED</span>
                    <h2>What's happening on campus?</h2>
                    <p>
                        Explore different categories of campus information
                        and never miss an important update.
                    </p>
                </div>
                <div className="notices-intro-icon">CC.</div>
            </section>

            {/* Announcement Categories */}
            <section className="notice-categories">

                <div className="notices-heading">
                    <span>EXPLORE UPDATES</span>
                    <h2>Browse by Category</h2>
                    <p>Find the information that matters to you.</p>
                </div>

                <div className="notices-grid">

                    <div className="notice-card">
                        <div className="notice-card-icon">01</div>
                        <span className="notice-label">ACADEMICS</span>
                        <h3>Academic Updates</h3>
                        <p>
                            Get information about examinations,
                            schedules, results and academic activities.
                        </p>
                        <span className="notice-card-link">Academic Information →</span>
                    </div>

                    <div className="notice-card">
                        <div className="notice-card-icon">02</div>
                        <span className="notice-label">LEARNING</span>
                        <h3>Workshops & Training</h3>
                        <p>
                            Explore workshops, technical sessions
                            and skill-development opportunities.
                        </p>
                        <span className="notice-card-link">Learning Opportunities →</span>
                    </div>

                    <div className="notice-card">
                        <div className="notice-card-icon">03</div>
                        <span className="notice-label">CAMPUS LIFE</span>
                        <h3>Student Activities</h3>
                        <p>
                            Discover student clubs, competitions
                            and other campus activities.
                        </p>
                        <span className="notice-card-link">Student Activities →</span>
                    </div>

                </div>
            </section>

            {/* Bottom Information */}
            <section className="notices-bottom">
                <h2>Stay connected with CampusConnect.</h2>
                <p>
                    Your campus updates, all in one place.
                </p>
                <p>
                    From academic announcements to workshops and student activities,
                    stay informed and never miss what's happening around your campus.
                </p>
            </section>

        </div>
    )
}

export default Notices