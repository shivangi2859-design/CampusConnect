
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="home-page">

      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero-content">
          <span className="home-tag">
            YOUR DIGITAL CAMPUS COMPANION
          </span>

          <h1>
            Welcome to <span>CampusConnect.</span>
            <br />
            Your Campus, Your Community.
          </h1>

          <p>
            Discover campus opportunities, stay updated
            with important announcements and connect
            with your student community — all in one place.
          </p>

          <div className="home-buttons">
            <Link to="/notices" className="primary-btn">
              Explore Notices
            </Link>

            <Link to="/events" className="secondary-btn">
              Discover Events
            </Link>
          </div>
        </div>

        <div className="home-hero-card">
          <span>STUDENT LIFE, SIMPLIFIED</span>
          <h2>Everything you need, in one place.</h2>
          <p>
            Learn. Participate. Connect. Grow.
          </p>
          <div className="hero-decoration">CC.</div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="quick-access">
        <div className="home-section-heading">
          <span>EXPLORE CAMPUSCONNECT</span>
          <h2>Where would you like to go?</h2>
          <p>Access important student services quickly.</p>
        </div>

        <div className="quick-grid">

          <Link to="/notices" className="quick-card">
            <div className="quick-icon">01</div>
            <h3>Campus Notices</h3>
            <p>Stay informed about academic updates and announcements.</p>
            <span>View Notices →</span>
          </Link>

          <Link to="/events" className="quick-card">
            <div className="quick-icon">02</div>
            <h3>Campus Events</h3>
            <p>Discover activities, workshops and student events.</p>
            <span>Explore Events →</span>
          </Link>

          <Link to="/student-hub" className="quick-card">
            <div className="quick-icon">03</div>
            <h3>Student Hub</h3>
            <p>Explore student services and useful resources.</p>
            <span>Visit Hub →</span>
          </Link>

        </div>
      </section>

      {/* Campus Highlights */}
      <section className="campus-highlights">
        <div>
          <span className="home-tag">MAKE THE MOST OF COLLEGE LIFE</span>
          <h2>More than just a student portal.</h2>
          <p>
            Find opportunities to develop your skills,
            discover communities and turn your ideas
            into meaningful experiences.
          </p>
        </div>

        <div className="highlight-list">
          <div>
            <span>01</span>
            <h3>Learn Something New</h3>
            <p>Explore workshops and learning opportunities.</p>
          </div>

          <div>
            <span>02</span>
            <h3>Connect With Others</h3>
            <p>Discover clubs and student communities.</p>
          </div>

          <div>
            <span>03</span>
            <h3>Explore Opportunities</h3>
            <p>Stay connected with campus activities.</p>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home
