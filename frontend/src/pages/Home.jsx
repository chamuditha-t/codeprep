import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Badge, Navbar, Nav, ProgressBar } from 'react-bootstrap';
import {
    Rocket,
    GraphUp,
    Building,
    CodeSlash,
    CheckCircle,
    People,
    PlayCircle,
    Lightning,
    Laptop,
    Clock,
    Shield,
    Cpu,
    JournalBookmark,
    BarChart,
    Bullseye,
    ChevronRight,
    Github,
    Linkedin,
    Twitter,
    Envelope,
    Phone,
    GeoAlt,
    Heart,
    ArrowRight
} from 'react-bootstrap-icons';
import 'animate.css/animate.min.css';
import { Fade, Zoom, Slide } from 'react-awesome-reveal';
import './Home.css';

export function Home() {

    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState(null);
    const [activeFeature, setActiveFeature] = useState(0);
    const [activePopup, setActivePopup] = useState(0);

    // Features for the interactive showcase
    const features = [
        {
            icon: <Cpu size={40} />,
            title: "Smart Code Execution",
            description: "Run code in 14 languages with instant feedback. Docker-secured environment ensures safety.",
            color: "primary",
            stats: "0.5s avg execution time"
        },
        {
            icon: <Bullseye size={40} />,
            title: "Personalized Recommendations",
            description: "AI-powered suggestions based on your performance. Focus on weak areas efficiently.",
            color: "success",
            stats: "94% accuracy rate"
        },
        {
            icon: <JournalBookmark size={40} />,
            title: "Detailed Explanations",
            description: "Step-by-step solutions with complexity analysis. Learn patterns, not just answers.",
            color: "info",
            stats: "500+ curated solutions"
        },
        {
            icon: <Shield size={40} />,
            title: "Interview Simulation",
            description: "Timed mock interviews with video recording. Get feedback on both code and communication.",
            color: "warning",
            stats: "50+ mock interviews"
        }
    ];

    // Popup features for "How We Help You Succeed"
    const popupFeatures = [
        {
            icon: <CodeSlash size={48} />,
            title: "Real Coding Environment",
            description: "Practice in a browser-based IDE with syntax highlighting, auto-completion, and 14+ language support.",
            color: "primary",
            points: ["Live code execution", "Multiple language support", "Syntax highlighting"]
        },
        {
            icon: <Clock size={48} />,
            title: "Timed Practice Sessions",
            description: "Simulate real interview pressure with countdown timers and performance tracking.",
            color: "warning",
            points: ["Countdown timers", "Performance analytics", "Mock interviews"]
        },
        {
            icon: <People size={48} />,
            title: "Peer Learning Community",
            description: "Discuss solutions, share approaches, and learn from Sri Lankan student community.",
            color: "success",
            points: ["Discussion forums", "Code reviews", "Group study"]
        },
        {
            icon: <BarChart size={48} />,
            title: "Progress Analytics",
            description: "Detailed insights into your strengths, weaknesses, and improvement over time.",
            color: "info",
            points: ["Progress tracking", "Weakness analysis", "Performance graphs"]
        }
    ];

    // Sri Lankan companies - clean design
    const companies = [
        { name: "WSO2", logo: "W", color: "#FF6B35", solved: 2345 },
        { name: "99x", logo: "9", color: "#00B4D8", solved: 1890 },
        { name: "Virtusa", logo: "V", color: "#7209B7", solved: 3120 },
        { name: "IFS", logo: "I", color: "#FF9E00", solved: 1567 },
        { name: "CodeGen", logo: "C", color: "#38B000", solved: 890 },
        { name: "DirectFN", logo: "D", color: "#FF0054", solved: 1234 }
    ];

    // Auto-rotate features
    useEffect(() => {
        checkSession();
        // const interval = setInterval(() => {
        //     setActiveFeature((prev) => (prev + 1) % features.length);
        // }, 4000);
        // return () => clearInterval(interval);

    });



    const checkSession = async () => {
        try {
            const res = await fetch("http://localhost:8080/backend_war_exploded/sessionUser", {
                method: 'GET',
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });

            if (res.ok) {
                const json = await res.json();
                if (json.status) {
                    const email = json.email;
                    const name = json.name;
                    setUser(email);
                    setUserName(name);
                    console.log("User Found " + email);
                } else {
                    console.log("User Not Found");
                    setUser(null);
                }
            } else {
                setUser(null);
                console.log("No user found");
            }
        } catch (err) {
            setUser(null);
            console.log("Connection error", err);
        }
    };
    //Navigate
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(`/${path}`);
    };

    return (
        <>
            <title>CodePrep - Ace Your Tech Interview</title>
            <link rel="icon" href="code-slash.svg" />

            <div className="modern-home-page">
                {/* Clean Navigation */}
                <Navbar bg="white" expand="lg" fixed="top" className="py-3 shadow-sm border-bottom">
                    <Container>
                        <Navbar.Brand as="div" className="d-flex align-items-center cursor-pointer">
                            <div className="logo-wrapper me-3">
                                <CodeSlash size={28} className="text-primary" />
                            </div>
                            <div>
                                <h5 className="mb-0 fw-bold text-dark">CodePrep</h5>
                                <small className="text-muted">Interview Excellence</small>
                            </div>
                        </Navbar.Brand>

                        <Navbar.Toggle aria-controls="navbar-nav" />

                        <Navbar.Collapse id="navbar-nav">
                            <Nav className="mx-auto">
                                {['Problems', 'Learn', 'Discuss', 'Interview', 'About'].map((item) => (
                                    <Nav.Link
                                        key={item}
                                        as="button"
                                        onClick={() => handleNavigation(item)}
                                        className="mx-3 fw-medium nav-link-custom"
                                    >
                                        {item}
                                    </Nav.Link>
                                ))}
                            </Nav>

                            <div className="d-flex gap-2 align-items-center">
                                {user ? (
                                    <>
                                        <span className="fw-semibold">Hi, {userName}</span>
                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                        // onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            className="btn btn-outline-dark btn-sm px-3"
                                            onClick={() => navigate("/signin")}
                                        >
                                            Sign In
                                        </button>
                                        <button
                                            className="btn btn-primary btn-sm px-3"
                                            onClick={() => navigate("/signup")}
                                        >
                                            Get Started
                                        </button>
                                    </>
                                )}
                            </div>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                {/* Hero Section with Visible Background */}
                <section className="hero-section py-5 mt-5">
                    {/* Visible Background */}
                    <div className="hero-background">
                        <div className="code-grid"></div>
                        <div className="gradient-particles">
                            {Array.from({ length: 20 }).map((_, i) => (
                                <div key={i} className="particle" style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 5}s`
                                }}></div>
                            ))}
                        </div>
                    </div>

                    <Container>
                        <Row className="align-items-center py-5">
                            <Col lg={6} className="mb-5 mb-lg-0">
                                <Fade direction="left" triggerOnce>
                                    {/* Updated Badge with Bounce Effect */}
                                    <Badge
                                        bg="primary"
                                        className="px-3 py-2 mb-3 rounded-pill badge-professional floating-badge"
                                    >
                                        <Rocket className="me-2 floating-rocket" />
                                        New • Sri Lankan Focus
                                    </Badge>

                                    <h1 className="display-4 fw-bold mb-4">
                                        Ace Your <span className="text-primary">Tech Interview</span>
                                    </h1>

                                    <p className="lead text-dark-emphasis mb-4">
                                        The only platform that prepares you specifically for Sri Lankan tech interviews.
                                        Practice real questions, track progress, and land your dream job.
                                    </p>

                                    <div className="d-flex flex-wrap gap-3 mb-4">
                                        <Button
                                            variant="primary"
                                            size="lg"
                                            className="px-4 py-3 btn-action-primary"
                                            onClick={() => handleNavigation('register')}
                                        >
                                            <PlayCircle className="me-2" />
                                            Start Free Trial
                                            <ArrowRight className="ms-2" />
                                        </Button>
                                        <Button
                                            variant="outline-primary"
                                            size="lg"
                                            className="px-4 py-3 btn-action-outline"
                                            onClick={() => handleNavigation('demo')}
                                        >
                                            <Laptop className="me-2" />
                                            View Demo
                                        </Button>
                                    </div>

                                    <div className="d-flex gap-4">
                                        <div>
                                            <div className="h4 mb-0 fw-bold text-primary">500+</div>
                                            <small className="text-muted">Problems</small>
                                        </div>
                                        <div>
                                            <div className="h4 mb-0 fw-bold text-success">2.5K+</div>
                                            <small className="text-muted">Students Placed</small>
                                        </div>
                                        <div>
                                            <div className="h4 mb-0 fw-bold text-warning">98%</div>
                                            <small className="text-muted">Satisfaction</small>
                                        </div>
                                    </div>
                                </Fade>
                            </Col>

                            <Col lg={6}>
                                <Zoom delay={300} triggerOnce>
                                    <div className="feature-showcase p-4 rounded-4 shadow-lg border-0 bg-white">
                                        <div className="text-center mb-4">
                                            <h4 className="fw-bold mb-3 text-dark">
                                                <Lightning className="me-2 text-warning" />
                                                Platform Features
                                            </h4>
                                            <p className="text-muted">See what makes us different</p>
                                        </div>

                                        <div className="feature-display">
                                            <div className="feature-content p-4 rounded-3 border bg-white">
                                                <div className="d-flex align-items-center mb-3">
                                                    {/* Remove the bg-color-subtle class */}
                                                    <div className="feature-icon-wrapper me-3">
                                                        <div className={`text-${features[activeFeature].color}`}>
                                                            {features[activeFeature].icon}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h5 className="fw-bold mb-0 text-dark">{features[activeFeature].title}</h5>
                                                        <small className="text-muted">{features[activeFeature].stats}</small>
                                                    </div>
                                                </div>
                                                <p className="mb-0 text-dark-emphasis">{features[activeFeature].description}</p>
                                            </div>

                                            {/* Carousel dots remain the same */}
                                            <div className="feature-dots mt-4">
                                                {features.map((_, idx) => (
                                                    <button
                                                        key={idx}
                                                        className={`feature-dot ${idx === activeFeature ? 'active' : ''}`}
                                                        onClick={() => setActiveFeature(idx)}
                                                        aria-label={`Show feature ${idx + 1}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <Button
                                            variant="primary"
                                            className="w-100 mt-4 py-3 btn-action-primary"
                                            onClick={() => handleNavigation('features')}
                                        >
                                            Explore All Features
                                            <ArrowRight className="ms-2" />
                                        </Button>
                                    </div>
                                </Zoom>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* Clean Sri Lankan Companies Section with Updated Logo Style */}
                {/* Clean Sri Lankan Companies Section */}
                <section className="py-5 bg-light-subtle">
                    <Container>
                        <Fade triggerOnce>
                            <div className="text-center mb-5">
                                <h2 className="display-5 fw-bold mb-3 text-dark">
                                    <Building className="me-3 text-primary" />
                                    Prepare for Top Companies
                                </h2>
                                <p className="lead text-muted mb-5">
                                    Curated content from actual Sri Lankan tech interviews
                                </p>
                            </div>
                        </Fade>

                        <Row className="g-4 justify-content-center">
                            {companies.map((company, idx) => (
                                <Col lg={2} md={4} sm={6} key={company.name}>
                                    <Slide direction="up" delay={idx * 100} triggerOnce>
                                        <div className="company-card text-center p-4">
                                            {/* Modern Logo Design */}
                                            <div className="company-logo-container mx-auto mb-3">
                                                <div className="company-logo-outer">
                                                    <div
                                                        className="company-logo-inner"
                                                        style={{
                                                            background: `linear-gradient(135deg, ${company.color} 0%, ${company.color}40 100%)`,
                                                            border: `2px solid ${company.color}30`
                                                        }}
                                                    >
                                                        <span className="company-initial fw-bold">
                                                            {company.logo}
                                                        </span>
                                                    </div>
                                                    <div className="company-logo-glow" style={{ backgroundColor: company.color }}></div>
                                                </div>
                                            </div>
                                            <h6 className="fw-bold mb-2 text-dark">{company.name}</h6>
                                            <div className="text-muted small">
                                                <CheckCircle className="me-1 text-success" size={12} />
                                                {company.solved.toLocaleString()} solved
                                            </div>
                                        </div>
                                    </Slide>
                                </Col>
                            ))}
                        </Row>

                        <Fade triggerOnce>
                            <div className="text-center mt-5">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="px-5 py-3 btn-company-problems"
                                    onClick={() => handleNavigation('company-problems')}
                                >
                                    <Building className="me-2" />
                                    View Company Problems
                                    <ChevronRight className="ms-2" />
                                </Button>
                            </div>
                        </Fade>
                    </Container>
                </section>

                {/* How We Help You Succeed - Popup Style */}
                <section className="py-5">
                    <Container>
                        <Fade triggerOnce>
                            <div className="text-center mb-5">
                                <h2 className="display-5 fw-bold mb-3 text-dark">How We Help You Succeed</h2>
                                <p className="lead text-muted">Click on each feature to learn more</p>
                            </div>
                        </Fade>

                        <div className="popup-features-container">
                            <Row className="g-4 justify-content-center">
                                {popupFeatures.map((feature, idx) => (
                                    <Col lg={3} md={6} key={idx}>
                                        <Zoom delay={idx * 100} triggerOnce>
                                            <div
                                                className={`popup-feature-card ${activePopup === idx ? 'active' : ''}`}
                                                onClick={() => setActivePopup(idx)}
                                                role="button"
                                                tabIndex={0}
                                                onKeyDown={(e) => e.key === 'Enter' && setActivePopup(idx)}
                                            >
                                                <div className="popup-icon-wrapper">
                                                    <div className={`text-${feature.color}`}>
                                                        {feature.icon}
                                                    </div>
                                                </div>
                                                <h5 className="fw-bold mb-3 text-dark">{feature.title}</h5>
                                                <p className="text-muted small">{feature.description}</p>

                                                <div className="popup-details">
                                                    <ul className="list-unstyled">
                                                        {feature.points.map((point, pointIdx) => (
                                                            <li key={pointIdx} className="mb-2">
                                                                <CheckCircle className="text-success me-2" size={14} />
                                                                {point}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </Zoom>
                                    </Col>
                                ))}
                            </Row>

                            {/* Active Popup Content */}
                            <Fade triggerOnce>
                                <div className="active-popup-content mt-5 p-5 rounded-4 shadow-lg bg-white">
                                    <Row className="align-items-center">
                                        <Col md={3} className="text-center mb-4 mb-md-0">
                                            <div className={`popup-active-icon bg-${popupFeatures[activePopup].color}-subtle`}>
                                                <div className={`text-${popupFeatures[activePopup].color}`}>
                                                    {popupFeatures[activePopup].icon}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <h3 className="fw-bold mb-3">{popupFeatures[activePopup].title}</h3>
                                            <p className="text-dark-emphasis mb-4">{popupFeatures[activePopup].description}</p>
                                            <Row>
                                                {popupFeatures[activePopup].points.map((point, idx) => (
                                                    <Col md={6} key={idx}>
                                                        <div className="d-flex align-items-center mb-3">
                                                            <CheckCircle className="text-success me-3" size={18} />
                                                            <span>{point}</span>
                                                        </div>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </Col>
                                        <Col md={3} className="text-end">
                                            <Button
                                                variant="primary"
                                                className="btn-action-primary"
                                                onClick={() => handleNavigation('learn-more')}
                                            >
                                                Learn More
                                                <ArrowRight className="ms-2" />
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Fade>
                        </div>
                    </Container>
                </section>

                {/* Your Personalized Learning Path */}
                <section className="py-5 bg-light-subtle">
                    <Container>
                        <Fade triggerOnce>
                            <div className="text-center mb-5">
                                <h2 className="display-5 fw-bold mb-3 text-dark">
                                    <GraphUp className="me-3 text-primary" />
                                    Your Personalized Learning Path
                                </h2>
                                <p className="lead text-muted">Smart recommendations based on your goals</p>
                            </div>
                        </Fade>

                        <Row className="g-4">
                            {[
                                {
                                    title: "Beginner's Journey",
                                    description: "For 1st-2nd year students",
                                    progress: 75,
                                    color: "success",
                                    icon: "🎓",
                                    stats: "150 problems"
                                },
                                {
                                    title: "Sri Lankan Intern Prep",
                                    description: "Targeting local companies",
                                    progress: 60,
                                    color: "warning",
                                    icon: "🇱🇰",
                                    stats: "WSO2, 99x, Virtusa"
                                },
                                {
                                    title: "Advanced Algorithms",
                                    description: "Master complex patterns",
                                    progress: 40,
                                    color: "danger",
                                    icon: "⚡",
                                    stats: "DP, Graphs, System Design"
                                },
                                {
                                    title: "Interview Ready",
                                    description: "Complete preparation",
                                    progress: 85,
                                    color: "info",
                                    icon: "🎯",
                                    stats: "Mock interviews included"
                                }
                            ].map((path, idx) => (
                                <Col lg={3} md={6} key={idx}>
                                    <Slide direction="up" delay={idx * 100} triggerOnce>
                                        <Card className="border-0 shadow-sm h-100 learning-path-card hover-lift">
                                            <Card.Body className="p-4">
                                                <div className="text-center mb-4">
                                                    <div className="path-icon display-4 mb-3">{path.icon}</div>
                                                    <Card.Title className="h5 fw-bold mb-2 text-dark">{path.title}</Card.Title>
                                                    <Card.Text className="text-muted small mb-3">
                                                        {path.description}
                                                    </Card.Text>
                                                </div>

                                                <div className="mb-4">
                                                    <div className="d-flex justify-content-between mb-2">
                                                        <small className="text-muted">Progress</small>
                                                        <small className="fw-bold text-dark">{path.progress}%</small>
                                                    </div>
                                                    <ProgressBar
                                                        now={path.progress}
                                                        variant={path.color}
                                                        className="rounded-pill progress-stylish"
                                                        style={{ height: '8px' }}
                                                    />
                                                </div>

                                                <div className="text-center">
                                                    <small className="text-muted">{path.stats}</small>
                                                </div>

                                                <Button
                                                    variant="outline-primary"
                                                    className="w-100 mt-3 btn-action-outline"
                                                // onClick={() => handleNavigation('learning-path')}
                                                >
                                                    Continue Path
                                                    <ArrowRight className="ms-2" />
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Slide>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </section>

                {/* Footer */}
                <footer className="footer-section py-5 bg-dark text-white">
                    <Container>
                        <Row>
                            <Col lg={4} className="mb-4 mb-lg-0">
                                <div className="d-flex align-items-center mb-4">
                                    <div className="logo-wrapper me-3">
                                        <CodeSlash size={28} className="text-white" />
                                    </div>
                                    <div>
                                        <h4 className="mb-0 fw-bold">CodePrep</h4>
                                        <small className="text-white-60">Interview Excellence</small>
                                    </div>
                                </div>
                                <p className="text-white-60 mb-4">
                                    The ultimate platform for Sri Lankan students to master coding interviews
                                    and land their dream tech jobs.
                                </p>
                                <div className="social-links d-flex gap-3">
                                    <Button
                                        variant="outline-light"
                                        size="sm"
                                        className="social-link"
                                        onClick={() => window.open('https://github.com', '_blank')}
                                    >
                                        <Github size={20} />
                                    </Button>
                                    <Button
                                        variant="outline-light"
                                        size="sm"
                                        className="social-link"
                                        onClick={() => window.open('https://linkedin.com', '_blank')}
                                    >
                                        <Linkedin size={20} />
                                    </Button>
                                    <Button
                                        variant="outline-light"
                                        size="sm"
                                        className="social-link"
                                        onClick={() => window.open('https://twitter.com', '_blank')}
                                    >
                                        <Twitter size={20} />
                                    </Button>
                                    <Button
                                        variant="outline-light"
                                        size="sm"
                                        className="social-link"
                                        onClick={() => window.location.href = 'mailto:hello@codeprep.lk'}
                                    >
                                        <Envelope size={20} />
                                    </Button>
                                </div>
                            </Col>

                            <Col lg={2} md={4} className="mb-4">
                                <h5 className="fw-bold mb-4">Platform</h5>
                                <ul className="list-unstyled">
                                    <li className="mb-3">
                                        <Button
                                            variant="link"
                                            className="footer-link p-0 text-start"
                                            onClick={() => handleNavigation('problems')}
                                        >
                                            Problems
                                        </Button>
                                    </li>
                                    <li className="mb-3">
                                        <Button
                                            variant="link"
                                            className="footer-link p-0 text-start"
                                            onClick={() => handleNavigation('learn')}
                                        >
                                            Learn
                                        </Button>
                                    </li>
                                    <li className="mb-3">
                                        <Button
                                            variant="link"
                                            className="footer-link p-0 text-start"
                                            onClick={() => handleNavigation('discuss')}
                                        >
                                            Discuss
                                        </Button>
                                    </li>
                                    <li className="mb-3">
                                        <Button
                                            variant="link"
                                            className="footer-link p-0 text-start"
                                            onClick={() => handleNavigation('interview')}
                                        >
                                            Interview
                                        </Button>
                                    </li>
                                    <li>
                                        <Button
                                            variant="link"
                                            className="footer-link p-0 text-start"
                                            onClick={() => handleNavigation('contests')}
                                        >
                                            Contests
                                        </Button>
                                    </li>
                                </ul>
                            </Col>

                            <Col lg={2} md={4} className="mb-4">
                                <h5 className="fw-bold mb-4">Company</h5>
                                <ul className="list-unstyled">
                                    <li className="mb-3">
                                        <Button
                                            variant="link"
                                            className="footer-link p-0 text-start"
                                            onClick={() => handleNavigation('about')}
                                        >
                                            About Us
                                        </Button>
                                    </li>
                                    <li className="mb-3">
                                        <Button
                                            variant="link"
                                            className="footer-link p-0 text-start"
                                            onClick={() => handleNavigation('careers')}
                                        >
                                            Careers
                                        </Button>
                                    </li>
                                    <li className="mb-3">
                                        <Button
                                            variant="link"
                                            className="footer-link p-0 text-start"
                                            onClick={() => handleNavigation('privacy')}
                                        >
                                            Privacy Policy
                                        </Button>
                                    </li>
                                    <li className="mb-3">
                                        <Button
                                            variant="link"
                                            className="footer-link p-0 text-start"
                                            onClick={() => handleNavigation('terms')}
                                        >
                                            Terms of Service
                                        </Button>
                                    </li>
                                    <li>
                                        <Button
                                            variant="link"
                                            className="footer-link p-0 text-start"
                                            onClick={() => handleNavigation('contact')}
                                        >
                                            Contact
                                        </Button>
                                    </li>
                                </ul>
                            </Col>

                            <Col lg={4} md={4} className="mb-4">
                                <h5 className="fw-bold mb-4">Contact Info</h5>
                                <ul className="list-unstyled">
                                    <li className="mb-3 d-flex align-items-start">
                                        <GeoAlt className="me-3 mt-1 text-primary" size={18} />
                                        <span className="text-white-60">Colombo, Sri Lanka</span>
                                    </li>
                                    <li className="mb-3 d-flex align-items-start">
                                        <Phone className="me-3 mt-1 text-primary" size={18} />
                                        <span className="text-white-60">+94 77 123 4567</span>
                                    </li>
                                    <li className="d-flex align-items-start">
                                        <Envelope className="me-3 mt-1 text-primary" size={18} />
                                        <Button
                                            variant="link"
                                            className="footer-link p-0 text-start"
                                            onClick={() => window.location.href = 'mailto:hello@codeprep.lk'}
                                        >
                                            hello@codeprep.lk
                                        </Button>
                                    </li>
                                </ul>

                                <div className="newsletter mt-4">
                                    <h6 className="fw-bold mb-3">Stay Updated</h6>
                                    <div className="input-group">
                                        <input
                                            type="email"
                                            className="form-control footer-input"
                                            placeholder="Your email"
                                        />
                                        <Button
                                            variant="primary"
                                            className="btn-footer-subscribe"
                                            onClick={() => handleNavigation('subscribe')}
                                        >
                                            Subscribe
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <hr className="my-5 border-white-10" />

                        <Row className="align-items-center">
                            <Col md={6}>
                                <p className="mb-0 text-white-60">
                                    © 2024 CodePrep. Made with <Heart className="text-danger" size={14} /> in Sri Lanka.
                                </p>
                            </Col>
                            <Col md={6} className="text-md-end">
                                <p className="mb-0 text-white-60">
                                    Designed for Sri Lankan students by Sri Lankan developers
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </footer>
            </div>
        </>
    );
};