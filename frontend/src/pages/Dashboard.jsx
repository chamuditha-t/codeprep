// pages/LearningPath.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Modal, ProgressBar, Alert, Form, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { moveToProblem } from '../services/moveToProblem';
import {
    CodeSlash,
    Cpu,
    Search,
    Bullseye,
    Book,
    CheckCircle,
    ArrowRight,
    Trophy,
    Clock,
    GraphUp,
    People,
    Award,
    ChevronRight,
    ChevronDown,
    Play,
    Star,
    Lightbulb,
    Rocket,
    Calendar,
    BarChart,
    PersonCircle,
    Laptop,
    FileEarmark,
    Folder,
    FolderFill,
    FileText,
    FileCode,
    Gear,
    ListTask,
    ClipboardCheck,
    Check,
    Flag,
    CalendarEvent,
    HourglassSplit,
    FileEarmarkText,
    FileEarmarkCode,
    FileEarmarkCheck
} from 'react-bootstrap-icons';

// Import language logos using the correct method
import { FaPython, FaJava, FaJsSquare } from 'react-icons/fa';
import { SiCplusplus, SiOutline } from 'react-icons/si';
import { FaCuttlefish } from 'react-icons/fa';

import styled from 'styled-components';

// Default file structure (fallback)
const defaultFileStructure = {
    name: "beginner-journey",
    type: "root",
    children: [
        {
            name: "Phase 1: Basic Programming Fundamentals",
            type: "phase",
            id: "phase1",
            problems: 12,
            description: "Master the fundamentals",
            color: "#4A6FFF",
            icon: <Book />,
            children: [
                {
                    name: "Variables & Data Types (4 problems)",
                    type: "module",
                    problems: 4,
                    children: [
                        { name: "Write a program that prints \"Hello, World!\" to the console.\n\nThis is your first program!", type: "problem", difficulty: "easy", id: "p1-13" },
                        { name: "Declare variables of different data types:\n- Integer\n- Float\n- String\n- Boolean\n\nPrint all variables.", type: "problem", difficulty: "easy", id: "p1-14" },
                        { name: "Swap two variables without using a third variable.\nInput: Two integers a and b\nOutput: Swapped values", type: "problem", difficulty: "easy", id: "p1-15" },
                        { name: "Perform type conversions:\n1. String to Integer\n2. Integer to Float\n3. Float to String\n\nInput: String \"123\", Integer 456, Float 78.9\nOutput: Converted values with types", type: "problem", difficulty: "easy", id: "p1-16" }
                    ]
                }
            ]
        }
    ]
};

// Transformation function to convert API response to fileStructure format
const transformApiResponse = (apiData) => {
    if (!apiData || !apiData.phases || !Array.isArray(apiData.phases)) {
        return defaultFileStructure; // Fallback to default structure
    }

    // Define phase colors
    const phaseColors = [
        "#4A6FFF", // Phase 1 - Blue
        "#00C9A7", // Phase 2 - Teal
        "#FFB800", // Phase 3 - Orange
        "#FF6B6B", // Phase 4 - Red
        "#9D4EDD", // Phase 5 - Purple
        "#20C997", // Phase 6 - Green
    ];

    // Define phase icons
    const phaseIcons = [
        <Book />,     // Phase 1
        <Cpu />,      // Phase 2
        <Search />,   // Phase 3
        <Bullseye />, // Phase 4
        <CodeSlash />, // Phase 5
        <GraphUp />,  // Phase 6
    ];

    // Define difficulty mapping
    const difficultyMap = {
        1: "easy",
        2: "medium",
        3: "hard"
    };

    // Transform each phase
    const transformedPhases = apiData.phases.map((phase, index) => {
        let totalProblems = 0;

        // Transform modules
        const transformedModules = phase.modules.map(module => {
            // Transform problems
            const transformedProblems = module.problems.map(problem => {
                return {
                    name: problem.name,
                    type: "problem",
                    difficulty: difficultyMap[problem.difficultyId] || "easy",
                    id: `p${phase.id}-${problem.id}`
                };
            });

            totalProblems += module.problems.length;

            return {
                name: `${module.name} (${module.problems.length} problems)`,
                type: "module",
                problems: module.problems.length,
                children: transformedProblems
            };
        });

        // Get phase description based on name
        const getPhaseDescription = (phaseName) => {
            const descriptions = {
                "Basic Programming Fundamentals": "Master the fundamentals of programming",
                "Control Flow": "Learn conditionals and loops",
                "Functions & Methods": "Master modular programming",
                "Basic Data Structures": "Introduction to data structures",
                "Object-Oriented Basics": "Learn OOP concepts"
            };
            return descriptions[phaseName] || "Advanced programming concepts";
        };

        return {
            name: `Phase ${phase.id}: ${phase.name}`,
            type: "phase",
            id: `phase${phase.id}`,
            problems: totalProblems,
            description: getPhaseDescription(phase.name),
            color: phaseColors[index] || "#4A6FFF",
            icon: phaseIcons[index] || <Book />,
            children: transformedModules
        };
    });

    return {
        name: "beginner-journey",
        type: "root",
        children: transformedPhases
    };
};

// Introduction paragraphs
const introduction = {
    overview: "Welcome to the Beginner's Journey – a carefully crafted learning path designed specifically for 1st and 2nd year Computer Science students. This comprehensive program transforms beginners into confident problem-solvers through structured, incremental learning.",
    benefits: [
        "Master essential data structures and algorithms from ground up",
        "Build strong problem-solving intuition through curated practice",
        "Develop coding fluency in your chosen programming language",
        "Prepare for technical interviews with industry-relevant problems",
        "Join a community of 2500+ students on the same journey"
    ],
    methodology: "Our pedagogical approach follows the 'Learn-Practice-Apply' cycle. Each phase introduces new concepts through carefully selected problems that build upon previous knowledge. The path progresses from basic arrays to complex data structures, ensuring solid fundamentals."
};

// Languages
const languages = [
    { id: 'python', name: 'Python', color: '#3776AB', logo: <FaPython />, description: 'Recommended for beginners' },
    { id: 'javascript', name: 'JavaScript', color: '#F7DF1E', logo: <FaJsSquare />, description: 'Web development focus' },
    { id: 'java', name: 'Java', color: '#007396', logo: <FaJava />, description: 'Enterprise applications' },
    { id: 'cpp', name: 'C++', color: '#00599C', logo: <FaCuttlefish />, description: 'Performance critical' }
];

// Recent achievements
const recentAchievements = [
    { id: 1, type: 'problem', name: 'Two Sum', time: '2 hours ago', phase: 'Phase 1', icon: <FileEarmarkCode className="text-primary" /> },
    { id: 2, type: 'module', name: 'Easy Arrays', time: '1 day ago', progress: '15/15 problems', icon: <FileEarmarkText className="text-success" /> },
    { id: 3, type: 'streak', name: '3-day streak', time: 'Today', icon: <Trophy className="text-warning" /> },
    { id: 4, type: 'milestone', name: '50 problems solved', time: '2 days ago', icon: <Award className="text-info" /> }
];

// Styled Components
const FileItem = styled.div`
  padding: 8px 12px;
  margin: 4px 0;
  border-radius: 6px;
  background: ${props => props.completed ? 'rgba(40, 167, 69, 0.1)' : 'transparent'};
  border-left: 3px solid ${props => props.completed ? '#28a745' : '#dee2e6'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.completed ? 'rgba(40, 167, 69, 0.15)' : 'rgba(0, 123, 255, 0.05)'};
  }

  .file-icon {
    color: ${props => {
        if (props.completed) return '#28a745';
        if (props.type === 'folder') return '#4A6FFF';
        if (props.type === 'phase') return '#FF6B6B';
        if (props.type === 'module') return '#FFB800';
        return '#6c757d';
    }};
    margin-right: 8px;
  }

  .problem-count {
    font-size: 12px;
    background: rgba(0, 0, 0, 0.05);
    padding: 2px 6px;
    border-radius: 10px;
    margin-left: 8px;
  }
`;

const ProgressCircle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${props => `conic-gradient(#4A6FFF ${props.percentage * 3.6}deg, #e9ecef 0deg)`};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  
  .inner-circle {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

const LanguageCard = styled.div`
  padding: 20px;
  border: 2px solid ${props => props.selected ? props.color : '#dee2e6'};
  border-radius: 12px;
  background: ${props => props.selected ? `${props.color}10` : 'white'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;

const LanguageLogo = styled.div`
  font-size: 48px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  
  &.python { color: #3776AB; }
  &.javascript { color: #F7DF1E; }
  &.java { color: #007396; }
  &.cpp { color: #00599C; }
`;

// Function to get all problems from structure
const getAllProblems = (node) => {
    let problems = [];
    if (node.children) {
        node.children.forEach(child => {
            if (child.type === 'problem') {
                problems.push(child);
            } else {
                problems = problems.concat(getAllProblems(child));
            }
        });
    }
    return problems;
};

// Function to calculate completion time
const calculateCompletionTime = (solved, total) => {
    const remaining = total - solved;
    const days = Math.ceil(remaining / 3);
    if (days < 7) return `${days} days`;
    if (days < 30) return `${Math.ceil(days / 7)} weeks`;
    return `${Math.ceil(days / 30)} months`;
};

export function Dashboard() {
    const [enrolled, setEnrolled] = useState(false);
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [showEnrollModal, setShowEnrollModal] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [expandedFolders, setExpandedFolders] = useState([]);
    const [completedProblems, setCompletedProblems] = useState(new Set());
    const [selectedPhase, setSelectedPhase] = useState(null);
    const [showLanguageSelection, setShowLanguageSelection] = useState(false);
    const [loading, setLoading] = useState(true);
    const [checkingUser, setCheckingUser] = useState(true);

    // Dynamic states
    const [dynamicFileStructure, setDynamicFileStructure] = useState(defaultFileStructure);
    const [stats, setStats] = useState({
        totalProblems: 150,
        totalPhases: 4,
        totalModules: 12,
        enrolledStudents: 2543,
        completionRate: '89%',
        avgPlacement: '78%',
        avgTime: '14 weeks'
    });

    const [userStats, setUserStats] = useState({
        totalSolved: 0,
        phaseProgress: {},
        streak: 0,
        accuracy: 0,
        estimatedCompletion: '14 weeks'
    });

    // Function to fetch data from API
    const getAllData = async () => {
        try {
            const response = await fetch("http://localhost:8080/backend_war_exploded/getData", {
                method: 'POST'
            });

            if (response.ok) {
                const json = await response.json();
                if (json.status) {
                    console.log("API Response:", json);
                    // Transform the API response
                    const transformedStructure = transformApiResponse(json);
                    console.log("Transformed Structure:", transformedStructure);
                    return transformedStructure;
                } else {
                    console.log("API returned false status");
                    return defaultFileStructure;
                }
            } else {
                console.log("Failed to fetch data");
                return defaultFileStructure;
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            return defaultFileStructure;
        }
    }

    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            const transformedData = await getAllData();
            setDynamicFileStructure(transformedData);

            // Calculate stats from transformed data
            const totalProblems = transformedData.children.reduce((sum, phase) =>
                sum + phase.problems, 0
            );

            setStats(prev => ({
                ...prev,
                totalProblems: totalProblems,
                totalPhases: transformedData.children.length,
                totalModules: transformedData.children.reduce((sum, phase) =>
                    sum + phase.children.length, 0
                )
            }));

            // Expand first phase by default
            if (transformedData.children.length > 0) {
                setExpandedFolders([transformedData.children[0].id]);
            }

            setLoading(false);
        };

        fetchData();
    }, []);

    // Calculate progress
    const calculateProgress = () => {
        const totalProblems = stats.totalProblems;
        const solved = completedProblems.size;
        const percentage = totalProblems > 0 ? Math.round((solved / totalProblems) * 100) : 0;

        // Calculate phase progress
        const phaseProgress = {};
        dynamicFileStructure.children.forEach(phase => {
            const phaseProblems = getAllProblems(phase);
            const solvedInPhase = phaseProblems.filter(p => completedProblems.has(p.id)).length;
            phaseProgress[phase.id] = {
                solved: solvedInPhase,
                total: phaseProblems.length,
                percentage: phaseProblems.length > 0 ? Math.round((solvedInPhase / phaseProblems.length) * 100) : 0
            };
        });

        const newStats = {
            ...userStats,
            totalSolved: solved,
            phaseProgress,
            streak: Math.floor(solved / 3),
            accuracy: solved > 0 ? Math.min(95, Math.floor(Math.random() * 20) + 80) : 0,
            estimatedCompletion: calculateCompletionTime(solved, totalProblems)
        };

        setUserStats(newStats);
        return newStats;
    };

    useEffect(() => {
        if (enrolled && completedProblems.size > 0) {
            calculateProgress();
        }
    }, [completedProblems, enrolled]);

    // Check user session and enrollment status
    useEffect(() => {
        checkUserAndEnrollment();
    }, []);

    const checkUserAndEnrollment = async () => {
        setCheckingUser(true);

        try {
            // First, check if user is logged in
            const res = await fetch("http://localhost:8080/backend_war_exploded/sessionUser", {
                method: 'GET',
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });

            if (res.ok) {
                const json = await res.json();
                console.log("Session response:", json);

                if (json.status && json.email) {
                    setUser(json.email);
                    const userEmail = json.email;
                    setUserId(userEmail);

                    console.log("Mock enrollment check for email:", userEmail);

                    try {
                        const enrollmentCheck = await fetch('http://localhost:8080/backend_war_exploded/checkUserPhase', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            },
                            body: JSON.stringify({
                                email: userEmail
                            })
                        });

                        if (enrollmentCheck.ok) {
                            const enrollmentData = await enrollmentCheck.json();
                            console.log("Enrollment check response:", enrollmentData);

                            if (enrollmentData.status === true || enrollmentData.status === 'true') {
                                console.log("Setting enrolled to TRUE");
                                setEnrolled(true);
                            } else {
                                console.log("Setting enrolled to FALSE");
                                setEnrolled(false);
                            }

                        } else {
                            console.log("Failed to check enrollment status");
                            setEnrolled(false);
                        }
                    } catch (enrollError) {
                        console.log("Enrollment check error:", enrollError);
                        setEnrolled(false);
                    }

                } else {
                    console.log("User Not Found in response");
                    setUser(null);
                    setUserId(null);
                }
            } else {
                console.log("No user found - response not OK");
                setUser(null);
                setUserId(null);
            }
        } catch (err) {
            console.log("Connection error", err);
            setUser(null);
            setUserId(null);
        } finally {
            setCheckingUser(false);
        }
    };

    const toggleFolder = (folderId) => {
        setExpandedFolders(prev =>
            prev.includes(folderId)
                ? prev.filter(id => id !== folderId)
                : [...prev, folderId]
        );
    };

    const toggleProblem = (problemId) => {
        setCompletedProblems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(problemId)) {
                newSet.delete(problemId);
            } else {
                newSet.add(problemId);
            }
            return newSet;
        });
    };

    const handleEnroll = () => {
        if (!selectedLanguage) {
            setShowLanguageSelection(true);
            return;
        }
        setShowEnrollModal(true);
    };

    const confirmEnroll = async () => {
        if (userId && selectedLanguage) {
            try {
                const enrollResponse = await fetch('http://localhost:8080/backend_war_exploded/enrollUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: userId,
                        language: selectedLanguage,
                        phaseId: 1
                    })
                });

                if (enrollResponse.ok) {
                    const result = await enrollResponse.json();

                    console.log(result);
                    if (result.status === "true") {
                        setEnrolled(true);
                        setShowEnrollModal(false);

                        if (dynamicFileStructure.children.length > 0) {
                            setExpandedFolders([dynamicFileStructure.children[0].id]);
                        }

                        setCompletedProblems(new Set());
                        setUserStats({
                            totalSolved: 0,
                            phaseProgress: {},
                            streak: 0,
                            accuracy: 0,
                            estimatedCompletion: '14 weeks'
                        });

                        alert('Successfully enrolled in the learning path!');

                        window.location.reload();
                    } else {
                        alert('Enrollment failed: ' + result.message);
                    }
                } else {
                    alert('Failed to enroll. Please try again.');
                }
            } catch (error) {
                console.error('Enrollment error:', error);
                alert('An error occurred during enrollment.');
            }
        }
    };

    const getIconForType = (type, completed = false) => {
        if (completed) return <FileEarmarkCheck size={16} className="text-success" />;

        switch (type) {
            case 'phase': return <FolderFill size={16} />;
            case 'module': return <Folder size={16} />;
            case 'problem': return <FileCode size={16} />;
            default: return <FileEarmark size={16} />;
        }
    };

    const renderFileStructure = (items, level = 0, parentPath = '') => {
        return items.map((item, index) => {
            const path = parentPath ? `${parentPath}.${index}` : `${index}`;
            const isExpanded = expandedFolders.includes(item.id || path);
            const isProblem = item.type === 'problem';
            const isCompleted = isProblem && completedProblems.has(item.id);

            return (
                <div key={item.id || path}>
                    <FileItem
                        completed={isCompleted}
                        type={item.type}
                        style={{ paddingLeft: `${level * 24 + 12}px` }}
                        onClick={() => {
                            if (item.children) {
                                toggleFolder(item.id || path);
                            } else if (isProblem) {
                                toggleProblem(item.id);
                            }
                        }}
                    >
                        <div className="d-flex align-items-center">
                            {getIconForType(item.type, isCompleted)}
                            <span className="ms-2 flex-grow-1">{item.name}</span>

                            {!isProblem && item.problems && (
                                <Badge bg="light" text="dark" className="ms-2">
                                    {item.problems} problems
                                </Badge>
                            )}

                            {isProblem && (
                                <Badge
                                    bg={item.difficulty === 'easy' ? 'success' : item.difficulty === 'medium' ? 'warning' : 'danger'}
                                    className="ms-2"
                                >
                                    {item.difficulty}
                                </Badge>
                            )}

                            {item.children && (
                                <ChevronRight
                                    size={12}
                                    className="ms-2"
                                    style={{ transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}
                                />
                            )}
                        </div>
                    </FileItem>

                    {item.children && isExpanded && renderFileStructure(item.children, level + 1, path)}
                </div>
            );
        });
    };

    // Show loading spinner while fetching data
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" variant="primary" />
                <span className="ms-3">Loading learning path...</span>
            </div>
        );
    }

    // Show loading spinner while checking user
    if (checkingUser) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" variant="primary" />
                <span className="ms-3">Checking user status...</span>
            </div>
        );
    }

    // If no user is logged in
    if (!user) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Alert variant="warning" className="text-center">
                    <h4>Please Sign In</h4>
                    <p>You need to be signed in to access the learning path.</p>
                    <Button variant="primary" onClick={() => window.location.href = "/signin"}>
                        Sign In
                    </Button>
                </Alert>
            </div>
        );
    }

    // If user is enrolled, show progress dashboard
    if (enrolled) {
        const totalSolved = completedProblems.size;
        const overallProgress = Math.round((totalSolved / stats.totalProblems) * 100);

        return (
            <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
                {/* Progress Header */}
                <div className="py-4" style={{
                    background: 'linear-gradient(135deg, #4A6FFF 0%, #00C9A7 100%)',
                    color: 'white'
                }}>
                    <Container>
                        <Row className="align-items-center">
                            <Col md={4} className="text-center mb-3 mb-md-0">
                                <ProgressCircle percentage={overallProgress}>
                                    <div className="inner-circle">
                                        {overallProgress}%
                                    </div>
                                </ProgressCircle>
                                <div className="mt-2">
                                    <small>Overall Progress</small>
                                </div>
                            </Col>
                            <Col md={8}>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Your Progress</span>
                                    <span>{totalSolved} / {stats.totalProblems} problems</span>
                                </div>
                                <ProgressBar
                                    now={overallProgress}
                                    variant="light"
                                    style={{ height: '10px' }}
                                    className="mb-3"
                                />
                                <Row>
                                    <Col xs={6} md={3} className="text-center">
                                        <div className="fw-bold">{userStats.streak}</div>
                                        <small>Day Streak</small>
                                    </Col>
                                    <Col xs={6} md={3} className="text-center">
                                        <div className="fw-bold">{userStats.accuracy}%</div>
                                        <small>Accuracy</small>
                                    </Col>
                                    <Col xs={6} md={3} className="text-center">
                                        <div className="fw-bold">{selectedLanguage.toUpperCase()}</div>
                                        <small>Language</small>
                                    </Col>
                                    <Col xs={6} md={3} className="text-center">
                                        <div className="fw-bold">{userStats.estimatedCompletion}</div>
                                        <small>Estimated Completion</small>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <Container className="py-5">
                    {/* Recent Achievements */}
                    <Row className="mb-5">
                        <Col lg={8}>
                            <Card className="border-0 shadow-sm h-100">
                                <Card.Body className="p-4">
                                    <h5 className="fw-bold mb-4">
                                        <Trophy className="me-3 text-warning" />
                                        Recent Achievements
                                    </h5>
                                    <div className="row g-3">
                                        {recentAchievements.map(achievement => (
                                            <Col md={6} key={achievement.id}>
                                                <div className="p-3 border rounded">
                                                    <div className="d-flex align-items-center">
                                                        <div className="me-3">
                                                            {achievement.icon}
                                                        </div>
                                                        <div>
                                                            <div className="fw-bold">{achievement.name}</div>
                                                            <small className="text-muted d-block">{achievement.time}</small>
                                                            {achievement.progress && (
                                                                <small className="text-success">{achievement.progress}</small>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        ))}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={4}>
                            <Card className="border-0 shadow-sm h-100">
                                <Card.Body className="p-4">
                                    <h5 className="fw-bold mb-4">
                                        <Bullseye className="me-3 text-primary" />
                                        Phase Progress
                                    </h5>
                                    {dynamicFileStructure.children.map(phase => {
                                        const progress = userStats.phaseProgress[phase.id] || { percentage: 0, solved: 0, total: phase.problems };
                                        return (
                                            <div key={phase.id} className="mb-3">
                                                <div className="d-flex justify-content-between mb-1">
                                                    <small>{phase.name.replace(/^Phase \d+: /, '')}</small>
                                                    <small>{progress.solved}/{progress.total}</small>
                                                </div>
                                                <ProgressBar
                                                    now={progress.percentage}
                                                    variant={phase.color === '#4A6FFF' ? 'primary' :
                                                        phase.color === '#00C9A7' ? 'success' :
                                                            phase.color === '#FFB800' ? 'warning' : 'danger'}
                                                    style={{ height: '6px' }}
                                                />
                                            </div>
                                        );
                                    })}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {/* Your Learning Path */}
                    <Card className="border-0 shadow-sm mb-5">
                        <Card.Body className="p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h3 className="fw-bold mb-0">
                                    <ListTask className="me-3" />
                                    Your Learning Path Structure
                                </h3>
                                <Badge bg="primary" className="px-3 py-2">
                                    {totalSolved} / {stats.totalProblems} Problems Solved
                                </Badge>
                            </div>
                            <div style={{
                                maxHeight: '400px',
                                overflowY: 'auto',
                                padding: '20px',
                                backgroundColor: '#f8f9fa',
                                borderRadius: '8px'
                            }}>
                                {renderFileStructure(dynamicFileStructure.children)}
                            </div>
                        </Card.Body>
                    </Card>

                    {/* Next Steps */}
                    <Row>
                        <Col lg={8}>
                            <Card className="border-0 shadow-sm">
                                <Card.Body className="p-4">
                                    <h5 className="fw-bold mb-4">
                                        <Rocket className="me-3 text-primary" />
                                        Continue Your Journey
                                    </h5>
                                    <div className="alert alert-info">
                                        <div className="d-flex align-items-start">
                                            <Lightbulb className="me-3 mt-1" />
                                            <div>
                                                <h6 className="fw-bold mb-2">
                                                    {totalSolved === 0 ? `Start with ${dynamicFileStructure.children[0]?.name || 'Phase 1'}` :
                                                        totalSolved < 35 ? 'Continue with your current phase' :
                                                            totalSolved < 75 ? 'Move to next phase' :
                                                                totalSolved < 110 ? 'Progress to advanced topics' :
                                                                    'Complete the learning path'}
                                                </h6>
                                                <p className="mb-0">
                                                    {totalSolved === 0 ? 'Begin with the first problem to build your foundation.' :
                                                        totalSolved < 35 ? 'Keep building momentum with your current problems.' :
                                                            totalSolved < 75 ? 'Start learning more complex concepts.' :
                                                                totalSolved < 110 ? 'Master essential algorithms and patterns.' :
                                                                    'Finish strong with advanced fundamentals.'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center mt-4">

                                        <Button
                                            variant="primary"
                                            size="lg"
                                            className="px-5"
                                            onClick={() => {
                                                window.location.href = "/problem";
                                            }}
                                        >
                                            <Play className="me-2" />
                                            {totalSolved === 0 ? 'Begin Learning Path' : 'Continue Solving'}
                                        </Button>

                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={4}>
                            <Card className="border-0 shadow-sm h-100">
                                <Card.Body className="p-4">
                                    <h5 className="fw-bold mb-4">
                                        <ClipboardCheck className="me-3 text-success" />
                                        Quick Stats
                                    </h5>
                                    <div className="mb-3">
                                        <div className="d-flex justify-content-between mb-1">
                                            <small>Today's Goal</small>
                                            <small>{Math.min(3, stats.totalProblems - totalSolved)} problems</small>
                                        </div>
                                        <ProgressBar
                                            now={Math.min((totalSolved % 3) * 33, 100)}
                                            variant="info"
                                            style={{ height: '6px' }}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <div className="d-flex justify-content-between">
                                            <small>Best Streak</small>
                                            <small>{userStats.streak} days</small>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="d-flex justify-content-between">
                                            <small>Avg Time/Problem</small>
                                            <small>15 mins</small>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <small>Language</small>
                                            <div className="d-flex align-items-center">
                                                {selectedLanguage === 'python' && <FaPython size={20} className="me-2" style={{ color: '#3776AB' }} />}
                                                {selectedLanguage === 'javascript' && <FaJsSquare size={20} className="me-2" style={{ color: '#F7DF1E' }} />}
                                                {selectedLanguage === 'java' && <FaJava size={20} className="me-2" style={{ color: '#007396' }} />}
                                                {selectedLanguage === 'cpp' && <FaCuttlefish size={20} className="me-2" style={{ color: '#00599C' }} />}
                                                <small className="fw-bold">{selectedLanguage.toUpperCase()}</small>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    // If user is logged in but not enrolled, show enrollment page
    if (!enrolled) {
        return (
            <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
                {/* Hero Section */}
                <div className="py-5" style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <Container>
                        <Row className="align-items-center">
                            <Col lg={7}>
                                <Badge bg="light" text="dark" className="px-3 py-2 mb-3">
                                    <Rocket className="me-2" />
                                    For 1st-2nd Year CS Students
                                </Badge>
                                <h1 className="display-4 fw-bold mb-4">
                                    Beginner's Journey: {stats.totalProblems} Problems
                                </h1>
                                <p className="lead mb-4" style={{ fontSize: '1.25rem' }}>
                                    A complete structured path to build strong coding fundamentals.
                                    Master programming concepts, data structures, algorithms, and problem-solving patterns.
                                </p>
                                <div className="d-flex flex-wrap gap-3 mb-4">
                                    <div className="d-flex align-items-center">
                                        <CheckCircle className="me-2" />
                                        <span>{stats.totalProblems} Curated Problems</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <Clock className="me-2" />
                                        <span>{stats.avgTime} Average Completion</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <Trophy className="me-2" />
                                        <span>{stats.completionRate} Success Rate</span>
                                    </div>
                                </div>
                                <Button
                                    variant="light"
                                    size="lg"
                                    className="px-5 py-3 fw-bold"
                                    onClick={handleEnroll}
                                >
                                    <Play className="me-2" />
                                    Start Learning Path
                                </Button>
                            </Col>
                            <Col lg={5} className="text-center">
                                <div style={{
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    borderRadius: '20px',
                                    padding: '40px',
                                    backdropFilter: 'blur(10px)'
                                }}>
                                    <div className="mb-4">
                                        <div className="display-3 fw-bold mb-2">{stats.totalProblems}</div>
                                        <div className="mb-3">Problems Total</div>
                                        <div className="row text-center">
                                            <div className="col-6 mb-3">
                                                <div className="fw-bold">{stats.totalPhases}</div>
                                                <small>Phases</small>
                                            </div>
                                            <div className="col-6 mb-3">
                                                <div className="fw-bold">{stats.totalModules}</div>
                                                <small>Modules</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <Container className="py-5">
                    {/* Introduction Section */}
                    <Card className="border-0 shadow-sm mb-5">
                        <Card.Body className="p-5">
                            <div className="text-center mb-5">
                                <h2 className="fw-bold mb-4">Your Journey to Coding Mastery</h2>
                                <div className="mx-auto" style={{ maxWidth: '800px' }}>
                                    <p className="lead mb-4">{introduction.overview}</p>

                                    <div className="mb-4">
                                        <h5 className="fw-bold mb-3">
                                            <Lightbulb className="me-2 text-warning" />
                                            What You'll Master:
                                        </h5>
                                        <div className="d-flex flex-column align-items-start">
                                            {introduction.benefits.map((benefit, idx) => (
                                                <div key={idx} className="d-flex align-items-start mb-3" style={{ width: '100%' }}>
                                                    <CheckCircle className="text-success me-2 mt-1" size={16} />
                                                    <span className="text-start">{benefit}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <h5 className="fw-bold mb-3">
                                            <Book className="me-2 text-primary" />
                                            Our Methodology:
                                        </h5>
                                        <p className="mb-0 text-start">{introduction.methodology}</p>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>

                    {/* Language Selection Prompt */}
                    {showLanguageSelection && (
                        <Alert variant="info" className="mb-4" onClose={() => setShowLanguageSelection(false)} dismissible>
                            <Alert.Heading>
                                <CodeSlash className="me-2" />
                                Choose Your Programming Language
                            </Alert.Heading>
                            <p>Please select a programming language to continue with your enrollment.</p>
                        </Alert>
                    )}

                    {/* Language Selection */}
                    <div className="mb-5">
                        <div className="text-center mb-4">
                            <h3 className="fw-bold mb-3">
                                <CodeSlash className="me-3 text-primary" />
                                Choose Your Programming Language
                            </h3>
                            <p className="text-muted">Select the language you want to practice with throughout the journey</p>
                        </div>

                        <Row className="g-4">
                            {languages.map(lang => (
                                <Col lg={3} md={6} key={lang.id}>
                                    <LanguageCard
                                        selected={selectedLanguage === lang.id}
                                        color={lang.color}
                                        onClick={() => setSelectedLanguage(lang.id)}
                                    >
                                        <div className="text-center mb-3">
                                            <LanguageLogo className={lang.id}>
                                                {lang.logo}
                                            </LanguageLogo>
                                        </div>
                                        <h5 className="fw-bold text-center mb-2">{lang.name}</h5>
                                        <p className="text-muted text-center small mb-3">{lang.description}</p>
                                        <div className="text-center">
                                            {selectedLanguage === lang.id ? (
                                                <Badge bg="success" className="px-3 py-2">
                                                    <Check className="me-2" />
                                                    Selected
                                                </Badge>
                                            ) : (
                                                <Button
                                                    variant="outline-primary"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedLanguage(lang.id);
                                                    }}
                                                >
                                                    Select
                                                </Button>
                                            )}
                                        </div>
                                    </LanguageCard>
                                </Col>
                            ))}
                        </Row>

                        {selectedLanguage && (
                            <div className="text-center mt-4">
                                <Alert variant="success" className="d-inline-block">
                                    <CheckCircle className="me-2" />
                                    You've selected <strong>{languages.find(l => l.id === selectedLanguage)?.name}</strong>
                                </Alert>
                            </div>
                        )}
                    </div>

                    {/* Progress Preview */}
                    <Card className="border-0 shadow-sm mb-5">
                        <Card.Body className="p-4">
                            <h5 className="fw-bold mb-4">
                                <GraphUp className="me-3 text-primary" />
                                Progress Tracking Preview
                            </h5>
                            <Row className="align-items-center">
                                <Col md={4} className="text-center mb-4 mb-md-0">
                                    <ProgressCircle percentage={0}>
                                        <div className="inner-circle">
                                            0%
                                        </div>
                                    </ProgressCircle>
                                    <div className="mt-2">
                                        <small>Overall Progress</small>
                                    </div>
                                </Col>
                                <Col md={8}>
                                    {dynamicFileStructure.children.map((phase, index) => (
                                        <div key={phase.id} className="mb-3">
                                            <div className="d-flex justify-content-between mb-1">
                                                <small>{phase.name}</small>
                                                <small>0/{phase.problems} problems</small>
                                            </div>
                                            <ProgressBar
                                                now={0}
                                                variant={phase.color === '#4A6FFF' ? 'primary' :
                                                    phase.color === '#00C9A7' ? 'success' :
                                                        phase.color === '#FFB800' ? 'warning' : 'danger'}
                                                style={{ height: '8px' }}
                                            />
                                        </div>
                                    ))}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                    {/* File Structure Visualization */}
                    <div className="mb-5">
                        <div className="text-center mb-5">
                            <h2 className="fw-bold mb-3">Complete Task List Structure</h2>
                            <p className="text-muted">Explore all {stats.totalProblems} problems organized in a file structure</p>
                        </div>

                        <Card className="border-0 shadow-sm">
                            <Card.Body className="p-4">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <div>
                                        <h4 className="fw-bold mb-0">
                                            <FileEarmark className="me-3" />
                                            beginner-journey/
                                        </h4>
                                        <p className="text-muted mb-0">Complete learning path structure</p>
                                    </div>
                                    <Badge bg="primary" className="px-3 py-2">
                                        {stats.totalProblems} Problems
                                    </Badge>
                                </div>

                                <div style={{
                                    maxHeight: '500px',
                                    overflowY: 'auto',
                                    padding: '20px',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '8px',
                                    border: '1px solid #dee2e6'
                                }}>
                                    {renderFileStructure(dynamicFileStructure.children)}
                                </div>

                                <div className="mt-4 d-flex flex-wrap gap-3">
                                    <div className="d-flex align-items-center">
                                        <div style={{
                                            width: '12px',
                                            height: '12px',
                                            backgroundColor: '#4A6FFF',
                                            borderRadius: '2px',
                                            marginRight: '8px'
                                        }}></div>
                                        <small>Phase Folder</small>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div style={{
                                            width: '12px',
                                            height: '12px',
                                            backgroundColor: '#FFB800',
                                            borderRadius: '2px',
                                            marginRight: '8px'
                                        }}></div>
                                        <small>Module Folder</small>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <FileEarmarkCheck className="text-success me-2" size={14} />
                                        <small>Solved Problem</small>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <FileCode className="text-muted me-2" size={14} />
                                        <small>Unsolved Problem</small>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>

                    {/* CTA Section with Language Check */}
                    <Card className="border-0 shadow-sm" style={{
                        background: 'linear-gradient(135deg, #4A6FFF 0%, #00C9A7 100%)',
                        color: 'white'
                    }}>
                        <Card.Body className="p-5 text-center">
                            <div className="mb-4">
                                <h2 className="fw-bold mb-3">Start Your Coding Journey Today</h2>
                                <p className="mb-4" style={{ fontSize: '1.1rem', opacity: 0.9 }}>
                                    {!selectedLanguage ? (
                                        "Choose your programming language and join thousands of successful students"
                                    ) : (
                                        `Ready to master ${languages.find(l => l.id === selectedLanguage)?.name}? Join ${stats.enrolledStudents}+ successful students`
                                    )}
                                </p>
                            </div>

                            {!selectedLanguage ? (
                                <Button
                                    variant="light"
                                    size="lg"
                                    className="px-5 py-3 fw-bold"
                                    onClick={() => setShowLanguageSelection(true)}
                                >
                                    <CodeSlash className="me-2" />
                                    Choose Language to Enroll
                                </Button>
                            ) : (
                                <Button
                                    variant="light"
                                    size="lg"
                                    className="px-5 py-3 fw-bold"
                                    onClick={handleEnroll}
                                >
                                    <Play className="me-2" />
                                    Enroll Now with {languages.find(l => l.id === selectedLanguage)?.name}
                                </Button>
                            )}

                            <p className="mt-3 mb-0" style={{ opacity: 0.8 }}>
                                No credit card required • Start learning immediately
                            </p>
                        </Card.Body>
                    </Card>
                </Container>

                {/* Enrollment Modal */}
                <Modal show={showEnrollModal} onHide={() => setShowEnrollModal(false)} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Enroll in Beginner's Journey</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="text-center mb-4">
                            <div className="p-3 rounded-circle d-inline-block mb-3" style={{
                                backgroundColor: 'rgba(74, 111, 255, 0.1)',
                                color: '#4A6FFF'
                            }}>
                                <Book size={48} />
                            </div>
                            <h4 className="fw-bold mb-2">Beginner's Journey: {stats.totalProblems} Problems</h4>
                            <p className="text-muted">Confirm your enrollment to start learning</p>
                        </div>

                        <div className="mb-4">
                            <h6 className="fw-bold mb-3">
                                <CodeSlash className="me-2" />
                                Selected Programming Language
                            </h6>
                            <div className="p-3 border rounded bg-light">
                                <div className="d-flex align-items-center">
                                    <div className={`p-2 rounded me-3 ${selectedLanguage === 'python' ? 'bg-python' : selectedLanguage === 'javascript' ? 'bg-javascript' : selectedLanguage === 'java' ? 'bg-java' : 'bg-cpp'}`}
                                        style={{
                                            backgroundColor: languages.find(l => l.id === selectedLanguage)?.color + '20',
                                            color: languages.find(l => l.id === selectedLanguage)?.color
                                        }}>
                                        {languages.find(l => l.id === selectedLanguage)?.logo}
                                    </div>
                                    <div>
                                        <div className="fw-bold">{languages.find(l => l.id === selectedLanguage)?.name}</div>
                                        <small className="text-muted">{languages.find(l => l.id === selectedLanguage)?.description}</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="alert alert-info">
                            <div className="d-flex align-items-start">
                                <Lightbulb className="me-3 mt-1" />
                                <div>
                                    <h6 className="fw-bold mb-1">What to expect after enrollment:</h6>
                                    <ul className="mb-0 ps-3">
                                        <li>Access to all {stats.totalProblems} problems with solutions</li>
                                        <li>Personalized progress tracking dashboard</li>
                                        <li>Community support and discussions</li>
                                        <li>Certificate upon completion</li>
                                        <li>All content available in {languages.find(l => l.id === selectedLanguage)?.name}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowEnrollModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={confirmEnroll}>
                            <CheckCircle className="me-2" />
                            Confirm Enrollment
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}