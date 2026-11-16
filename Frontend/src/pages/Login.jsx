import { useState } from 'react'

function Login() {
    const [isLogin, setIsLogin] = useState(true)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const endpoint = isLogin ? 'login' : 'register'

            const body = isLogin
                ? { email, password }
                : { name, email, password }

            const response = await fetch(
                `http://localhost:5000/api/auth/${endpoint}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong')
            }

            if (isLogin) {
                localStorage.setItem('token', data.token)
                localStorage.setItem('student', JSON.stringify(data.student))

                alert('Login successful!')
                window.location.href = '/student-hub'
            } else {
                alert('Registration successful! Please login.')

                setIsLogin(true)
                setName('')
                setPassword('')
            }

        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>{isLogin ? 'Welcome Back!' : 'Create Account'}</h1>

                <p>
                    {isLogin
                        ? 'Login to access your student community.'
                        : 'Join CampusConnect and explore your campus.'}
                </p>

                <div className="auth-tabs">
                    <button
                        type="button"
                        className={isLogin ? 'active' : ''}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>

                    <button
                        type="button"
                        className={!isLogin ? 'active' : ''}
                        onClick={() => setIsLogin(false)}
                    >
                        Register
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    )}

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="auth-submit">
                        {isLogin ? 'Login' : 'Create Account'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login