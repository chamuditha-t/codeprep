import React, { useState } from 'react';
import { loginUser } from '../../services/authService';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import {
    CodeSlash,
    ArrowRight,
    CheckCircle,
    Github,
    Rocket,
    Shield,
    Award,
    GraphUp,
    PlayCircle,
    Key,
    PersonCircle,
    Eye,
    EyeSlash
} from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Fade, Zoom } from 'react-awesome-reveal';
import './Signin.css';

export function Signin() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
            console.log('Login submitted:', formData);
        }, 1500);
    };

    return (
        <div className="signin-page">
            {/* Modern Gradient Background */}
            <div className="modern-background">
                <div className="gradient-blur gradient-1"></div>
                <div className="gradient-blur gradient-2"></div>
                <div className="gradient-blur gradient-3"></div>

                {/* Floating Tech Elements */}
                <div className="tech-elements">
                    {Array.from({ length: 15 }).map((_, i) => (
                        <div
                            key={i}
                            className="tech-element"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                background: `radial-gradient(circle, rgba(59, 130, 246, ${Math.random() * 0.1 + 0.05}) 0%, transparent 70%)`
                            }}
                        ></div>
                    ))}
                </div>
            </div>

            <Container fluid className="p-0">
                <Row className="g-0">
                    {/* Left Side - Modern Info Section */}
                    <Col lg={6} className="d-none d-lg-block modern-side p-0">
                        <div className="modern-container">
                            {/* Animated Background Lines */}
                            <div className="grid-lines">
                                <div className="line vertical"></div>
                                <div className="line horizontal"></div>
                                <div className="line diagonal-1"></div>
                                <div className="line diagonal-2"></div>
                            </div>

                            {/* Floating Elements */}
                            <div className="floating-elements">
                                <div className="floating-circle circle-1"></div>
                                <div className="floating-circle circle-2"></div>
                                <div className="floating-circle circle-3"></div>
                            </div>

                            <div className="modern-content">
                                <Fade direction="down" triggerOnce>
                                    <div className="brand-section mb-5">
                                        <div className="brand-wrapper">
                                            <div className="logo-glow">
                                                <CodeSlash size={42} className="text-white" />
                                            </div>
                                            <div className="brand-text ms-4">
                                                <h1 className="brand-name mb-1">CodePrep</h1>
                                                <p className="brand-tagline">Welcome Back</p>
                                            </div>
                                        </div>
                                    </div>
                                </Fade>

                                <div className="features-showcase">
                                    <Fade triggerOnce delay={200}>
                                        <div className="showcase-header mb-4">
                                            <h3 className="text-white mb-3">
                                                <Key className="me-2 text-warning" size={28} />
                                                Continue Your Journey
                                            </h3>
                                            <p className="text-white-60">
                                                Pick up where you left off and ace your tech interviews
                                            </p>
                                        </div>

                                        <div className="feature-cards">
                                            <div className="feature-card glass-card">
                                                <div className="card-icon">
                                                    <GraphUp size={24} className="text-primary" />
                                                </div>
                                                <div className="card-content">
                                                    <h5 className="text-white mb-2">Track Your Progress</h5>
                                                    <p className="text-white-60 mb-0">
                                                        Resume your personalized learning path
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="feature-card glass-card">
                                                <div className="card-icon">
                                                    <Award size={24} className="text-success" />
                                                </div>
                                                <div className="card-content">
                                                    <h5 className="text-white mb-2">Access Premium Content</h5>
                                                    <p className="text-white-60 mb-0">
                                                        Company-specific questions & mock interviews
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="feature-card glass-card">
                                                <div className="card-icon">
                                                    <Rocket size={24} className="text-warning" />
                                                </div>
                                                <div className="card-content">
                                                    <h5 className="text-white mb-2">AI Recommendations</h5>
                                                    <p className="text-white-60 mb-0">
                                                        Smart practice based on your performance
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="feature-card glass-card">
                                                <div className="card-icon">
                                                    <Shield size={24} className="text-info" />
                                                </div>
                                                <div className="card-content">
                                                    <h5 className="text-white mb-2">Secure & Private</h5>
                                                    <p className="text-white-60 mb-0">
                                                        Your data is encrypted and protected
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Fade>

                                    <Fade direction="up" triggerOnce delay={400}>
                                        <div className="stats-panel mt-5">
                                            <div className="stats-grid">
                                                <div className="stat-box">
                                                    <div className="stat-number glow-text">2.5K+</div>
                                                    <div className="stat-label">Active Today</div>
                                                </div>
                                                <div className="stat-divider"></div>
                                                <div className="stat-box">
                                                    <div className="stat-number glow-text">85%</div>
                                                    <div className="stat-label">Success Rate</div>
                                                </div>
                                                <div className="stat-divider"></div>
                                                <div className="stat-box">
                                                    <div className="stat-number glow-text">4.8★</div>
                                                    <div className="stat-label">User Rating</div>
                                                </div>
                                            </div>
                                        </div>
                                    </Fade>

                                    <Fade direction="up" triggerOnce delay={600}>
                                        <div className="cta-section mt-5">
                                            <Button
                                                variant="outline-light"
                                                className="w-100 py-2 mb-3 glass-button"
                                                onClick={() => window.open('#demo', '_blank')}
                                            >
                                                <PlayCircle className="me-2" />
                                                Watch Quick Tutorial
                                            </Button>

                                            <div className="trust-badge">
                                                <CheckCircle className="me-2 text-success" size={16} />
                                                <span className="text-white-60">Join 10,000+ successful candidates</span>
                                            </div>
                                        </div>
                                    </Fade>
                                </div>
                            </div>
                        </div>
                    </Col>

                    {/* Right Side - Signin Form */}
                    <Col lg={6} className="form-side p-4 p-md-5">
                        <div className="form-container">
                            <div className="form-top-content">
                                {/* Mobile Logo */}
                                <div className="d-block d-lg-none mb-4 text-center">
                                    <div className="d-flex align-items-center justify-content-center mb-3">
                                        <PersonCircle size={32} className="text-primary me-3" />
                                        <div>
                                            <h3 className="fw-bold mb-0">CodePrep</h3>
                                            <small className="text-muted">Welcome Back</small>
                                        </div>
                                    </div>
                                </div>

                                <Fade direction="left" triggerOnce>
                                    <div className="form-header mb-4">
                                        <h2 className="display-6 fw-bold text-dark mb-2">Welcome Back</h2>
                                        <p className="text-muted mb-0">
                                            Sign in to continue your interview preparation
                                        </p>
                                    </div>

                                    {isSubmitted ? (
                                        <Zoom triggerOnce>
                                            <div className="success-message text-center py-5">
                                                <div className="success-icon mb-4">
                                                    <CheckCircle size={64} className="text-success" />
                                                </div>
                                                <h3 className="fw-bold mb-3">Welcome Back!</h3>
                                                <p className="text-muted mb-4">
                                                    You have successfully signed in.
                                                </p>
                                                
                                            </div>
                                        </Zoom>
                                    ) : (
                                        <Form onSubmit={handleSubmit} className="mb-4">
                                            {/* Email Field */}
                                            <Form.Group className="mb-4">
                                                <Form.Label className="fw-semibold text-dark mb-1">
                                                    Email Address
                                                </Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="your.email@example.com"
                                                    className="form-control-custom"
                                                    isInvalid={!!errors.email}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.email}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            {/* Password Field */}
                                            <Form.Group className="mb-4">
                                                <Form.Label className="fw-semibold text-dark mb-1 d-flex justify-content-between">
                                                    <span>Password</span>
                                                    <Link to="/forgot-password" className="text-primary fw-semibold small">
                                                        Forgot Password?
                                                    </Link>
                                                </Form.Label>
                                                <div className="password-input-group">
                                                    <Form.Control
                                                        type={showPassword ? "text" : "password"}
                                                        name="password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        placeholder="Enter your password"
                                                        className="form-control-custom"
                                                        isInvalid={!!errors.password}
                                                    />
                                                    <Button
                                                        variant="link"
                                                        className="password-toggle"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                                                    </Button>
                                                </div>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.password}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            {/* Remember Me & Forgot Password */}
                                            <Form.Group className="mb-4">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <Form.Check
                                                        type="checkbox"
                                                        name="rememberMe"
                                                        checked={formData.rememberMe}
                                                        onChange={handleChange}
                                                        id="rememberMe"
                                                        label="Remember me"
                                                        className="text-muted"
                                                    />
                                                </div>
                                            </Form.Group>

                                            {/* Submit Button */}
                                            <Button
                                                type="submit"
                                                variant="primary"
                                                size="lg"
                                                className="w-100 py-3 mb-3 btn-signin"
                                                disabled={isLoading}
                                                onClick={() => {
                                                    loginUser(formData);
                                                }}
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <Spinner
                                                            as="span"
                                                            animation="border"
                                                            size="sm"
                                                            role="status"
                                                            aria-hidden="true"
                                                            className="me-2"
                                                        />
                                                        Signing In...
                                                    </>
                                                ) : (
                                                    <>
                                                        Sign In
                                                        <ArrowRight className="ms-2" />
                                                    </>
                                                )}
                                            </Button>

                                            {/* Divider */}
                                            <div className="divider-with-text my-4">
                                                <span className="text-muted bg-white px-3">Or continue with</span>
                                            </div>

                                            {/* Social Signin */}
                                            <div className="social-signin d-flex gap-3 mb-4">
                                                <Button
                                                    variant="outline-dark"
                                                    className="flex-grow-1 py-2"
                                                    onClick={() => console.log('Google signin')}
                                                >
                                                    <svg className="me-2" width="20" height="20" viewBox="0 0 24 24">
                                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                                    </svg>
                                                    Google
                                                </Button>
                                                <Button
                                                    variant="outline-dark"
                                                    className="flex-grow-1 py-2"
                                                    onClick={() => console.log('GitHub signin')}
                                                >
                                                    <Github className="me-2" />
                                                    GitHub
                                                </Button>
                                            </div>

                                            {/* Signup Link */}
                                            <div className="text-center pt-3 border-top">
                                                <p className="text-muted mb-0 small">
                                                    Don't have an account?{' '}
                                                    <Link to="/signup" className="text-primary fw-semibold">
                                                        Create Account
                                                        <ArrowRight className="ms-1" size={14} />
                                                    </Link>
                                                </p>
                                            </div>
                                        </Form>
                                    )}
                                </Fade>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}