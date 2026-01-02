import React, { useState } from 'react';
import { registerUser } from '../../services/authService';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import {
    CodeSlash,
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    Github,
    Rocket,
    Lightning,
    Shield,
    Award,
    GraphUp,
    PlayCircle
} from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Fade, Zoom } from 'react-awesome-reveal';
import './Signup.css';

export function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

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

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.termsAccepted) {
            newErrors.termsAccepted = 'You must accept the terms and conditions';
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
            console.log('Form submitted:', formData);
        }, 1500);
    };

    return (
        <>
            <div className="signup-page">
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
                                                    <p className="brand-tagline">Next-Gen Interview Platform</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Fade>

                                    <div className="features-showcase">
                                        <Fade triggerOnce delay={200}>
                                            <div className="showcase-header mb-4">
                                                <h3 className="text-white mb-3">
                                                    <Lightning className="me-2 text-warning" size={28} />
                                                    Why Choose CodePrep?
                                                </h3>
                                                <p className="text-white-60">
                                                    The smartest way to prepare for Sri Lankan tech interviews
                                                </p>
                                            </div>

                                            <div className="feature-cards">
                                                <div className="feature-card glass-card">
                                                    <div className="card-icon">
                                                        <Rocket size={24} className="text-primary" />
                                                    </div>
                                                    <div className="card-content">
                                                        <h5 className="text-white mb-2">AI-Powered Practice</h5>
                                                        <p className="text-white-60 mb-0">
                                                            Smart recommendations based on your performance
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="feature-card glass-card">
                                                    <div className="card-icon">
                                                        <Shield size={24} className="text-success" />
                                                    </div>
                                                    <div className="card-content">
                                                        <h5 className="text-white mb-2">Company-Specific Prep</h5>
                                                        <p className="text-white-60 mb-0">
                                                            Real questions from WSO2, Virtusa, 99x, and more
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="feature-card glass-card">
                                                    <div className="card-icon">
                                                        <Award size={24} className="text-warning" />
                                                    </div>
                                                    <div className="card-content">
                                                        <h5 className="text-white mb-2">Interview Simulations</h5>
                                                        <p className="text-white-60 mb-0">
                                                            Realistic mock interviews with detailed feedback
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="feature-card glass-card">
                                                    <div className="card-icon">
                                                        <GraphUp size={24} className="text-info" />
                                                    </div>
                                                    <div className="card-content">
                                                        <h5 className="text-white mb-2">Progress Analytics</h5>
                                                        <p className="text-white-60 mb-0">
                                                            Track your improvement with detailed insights
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Fade>

                                        <Fade direction="up" triggerOnce delay={400}>
                                            <div className="stats-panel mt-5">
                                                <div className="stats-grid">
                                                    <div className="stat-box">
                                                        <div className="stat-number glow-text">10K+</div>
                                                        <div className="stat-label">Active Students</div>
                                                    </div>
                                                    <div className="stat-divider"></div>
                                                    <div className="stat-box">
                                                        <div className="stat-number glow-text">500+</div>
                                                        <div className="stat-label">Problems Solved</div>
                                                    </div>
                                                    <div className="stat-divider"></div>
                                                    <div className="stat-box">
                                                        <div className="stat-number glow-text">94%</div>
                                                        <div className="stat-label">Success Rate</div>
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
                                                    Watch Platform Demo
                                                </Button>

                                                <div className="trust-badge">
                                                    <CheckCircle className="me-2 text-success" size={16} />
                                                    <span className="text-white-60">Trusted by 10,000+ Sri Lankan students</span>
                                                </div>
                                            </div>
                                        </Fade>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        {/* Right Side - Signup Form (No Changes) */}
                        <Col lg={6} className="form-side p-4 p-md-5">
                            <div className="form-container">
                                <div className="form-top-content">
                                    {/* Mobile Logo */}
                                    <div className="d-block d-lg-none mb-4 text-center">
                                        <div className="d-flex align-items-center justify-content-center mb-3">
                                            <CodeSlash size={32} className="text-primary me-3" />
                                            <div>
                                                <h3 className="fw-bold mb-0">CodePrep</h3>
                                                <small className="text-muted">Create Your Account</small>
                                            </div>
                                        </div>
                                    </div>

                                    <Fade direction="left" triggerOnce>
                                        <div className="form-header mb-4">
                                            <h2 className="display-6 fw-bold text-dark mb-2">Join CodePrep</h2>
                                            <p className="text-muted mb-0">
                                                Start your journey to ace tech interviews
                                            </p>
                                        </div>

                                        {isSubmitted ? (
                                            <Zoom triggerOnce>
                                                <div className="success-message text-center py-5">
                                                    <div className="success-icon mb-4">
                                                        <CheckCircle size={64} className="text-success" />
                                                    </div>
                                                    <h3 className="fw-bold mb-3">Welcome to CodePrep!</h3>
                                                    <p className="text-muted mb-4">
                                                        Your account has been created successfully.
                                                    </p>
                                                    
                                                </div>
                                            </Zoom>
                                        ) : (
                                            <Form onSubmit={handleSubmit} className="mb-4">
                                                {/* Name Field */}
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="fw-semibold text-dark mb-1">
                                                        Full Name
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        placeholder="Enter your full name"
                                                        className="form-control-custom"
                                                        isInvalid={!!errors.name}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.name}
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                {/* Email Field */}
                                                <Form.Group className="mb-3">
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

                                                {/* Password Fields */}
                                                <Row className="mb-4">
                                                    <Col md={6}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold text-dark mb-1">
                                                                Password
                                                            </Form.Label>
                                                            <Form.Control
                                                                type="password"
                                                                name="password"
                                                                value={formData.password}
                                                                onChange={handleChange}
                                                                placeholder="Min. 8 characters"
                                                                className="form-control-custom"
                                                                isInvalid={!!errors.password}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.password}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold text-dark mb-1">
                                                                Confirm Password
                                                            </Form.Label>
                                                            <Form.Control
                                                                type="password"
                                                                name="confirmPassword"
                                                                value={formData.confirmPassword}
                                                                onChange={handleChange}
                                                                placeholder="Re-enter password"
                                                                className="form-control-custom"
                                                                isInvalid={!!errors.confirmPassword}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.confirmPassword}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>

                                                {/* Terms and Conditions */}
                                                <Form.Group className="mb-4">
                                                    <div className="d-flex align-items-start">
                                                        <Form.Check
                                                            type="checkbox"
                                                            name="termsAccepted"
                                                            checked={formData.termsAccepted}
                                                            onChange={handleChange}
                                                            id="terms"
                                                            className="me-3 mt-1"
                                                            isInvalid={!!errors.termsAccepted}
                                                        />
                                                        <Form.Label htmlFor="terms" className="text-muted small">
                                                            I agree to the{' '}
                                                            <a href="/terms" className="text-primary fw-semibold">Terms</a>
                                                            {' '}and{' '}
                                                            <a href="/privacy" className="text-primary fw-semibold">Privacy Policy</a>
                                                        </Form.Label>
                                                    </div>
                                                    {errors.termsAccepted && (
                                                        <Alert variant="danger" className="mt-2 py-2 small">
                                                            {errors.termsAccepted}
                                                        </Alert>
                                                    )}
                                                </Form.Group>

                                                {/* Submit Button */}
                                                <Button
                                                    type="submit"
                                                    variant="primary"
                                                    size="lg"
                                                    className="w-100 py-3 mb-3 btn-signup"
                                                    disabled={isLoading}
                                                    onClick={() => {
                                                        registerUser(formData); 
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
                                                            Creating Account...
                                                        </>
                                                    ) : (
                                                        <>
                                                            Create Account
                                                            <ArrowRight className="ms-2" />
                                                        </>
                                                    )}
                                                </Button>

                                                {/* Divider */}
                                                <div className="divider-with-text my-4">
                                                    <span className="text-muted bg-white px-3">Or continue with</span>
                                                </div>

                                                {/* Social Signup */}
                                                <div className="social-signup d-flex gap-3 mb-4">
                                                    <Button
                                                        variant="outline-dark"
                                                        className="flex-grow-1 py-2"
                                                        onClick={() => console.log('Google signup')}
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
                                                        onClick={() => console.log('GitHub signup')}
                                                    >
                                                        <Github className="me-2" />
                                                        GitHub
                                                    </Button>
                                                </div>

                                                {/* Login Link */}
                                                <div className="text-center pt-3 border-top">
                                                    <p className="text-muted mb-0 small">
                                                        Already have an account?{' '}
                                                        <Link to="/login" className="text-primary fw-semibold">
                                                            <ArrowLeft className="me-1" size={14} />
                                                            Sign In
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

        </>

    );
}