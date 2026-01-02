// pages/ProblemPage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert, Tab, Nav, Form, ProgressBar } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Play,
    CheckCircle,
    Lightbulb,
    Clock,
    ArrowLeft,
    ArrowRight,
    Book,
    Terminal,
    ChevronRight,
    Gear,
    CodeSlash,
    BarChart,
    People,
    ChevronLeft,
    ChevronDown,
    ChevronUp,
    Eye,
    EyeSlash,
    Clipboard,
    Bullseye,
    Copy,
    Rocket,
    Flag,
    Lightning,
    Cpu,
    Memory,
    Send,
    ArrowClockwise,
    Code,
    FileText,
    Award,
    GraphUp,
    ShieldCheck
} from 'react-bootstrap-icons';
import styled from 'styled-components';

// Styled Components
const GlassCard = styled(Card)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.07);
`;

const CodeEditor = styled.textarea`
  background: #1e1e1e;
  color: #d4d4d4;
  font-family: 'JetBrains Mono', 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.6;
  border: none;
  resize: none;
  outline: none;
  padding: 20px;
  width: 100%;
  height: 100%;
  
  &::placeholder {
    color: #6b7280;
  }
  
  &:focus {
    box-shadow: inset 0 0 0 2px #6366f1;
  }
`;

const ProblemBadge = styled(Badge)`
  padding: 8px 16px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.3px;
  border-radius: 20px;
  border: 2px solid transparent;
  
  &.easy {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    border-color: #10b98120;
  }
  
  &.medium {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    border-color: #f59e0b20;
  }
  
  &.hard {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    border-color: #ef444420;
  }
`;

const SolutionCard = styled(Card)`
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border: 1px solid #334155;
  border-radius: 12px;
  color: #f8fafc;
  
  pre {
    background: transparent;
    color: #f1f5f9;
    margin: 0;
    padding: 0;
  }
`;

const TestCaseCard = styled(Card)`
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }
  
  &.passed {
    border-left-color: #10b981;
  }
  
  &.failed {
    border-left-color: #ef4444;
  }
`;

const FloatingActionButton = styled(Button)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
  z-index: 1000;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 30px rgba(99, 102, 241, 0.4);
  }
`;

const DifficultyIndicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 8px;
  
  &.easy { background: #10b981; }
  &.medium { background: #f59e0b; }
  &.hard { background: #ef4444; }
`;

export function ProblemPage() {
    const { phase, problemId } = useParams();
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [showSolution, setShowSolution] = useState(false);
    const [showHints, setShowHints] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [language, setLanguage] = useState('python');
    const [activeTab, setActiveTab] = useState('problem');
    const [executionTime, setExecutionTime] = useState(null);
    const [memoryUsage, setMemoryUsage] = useState(null);
    const [testResults, setTestResults] = useState([]);
    const [copied, setCopied] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [progress, setProgress] = useState(0);

    // Mock problem data
    const problem = {
        id: parseInt(problemId),
        title: "Two Sum",
        difficulty: "Easy",
        description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
        examples: [
            {
                input: "nums = [2,7,11,15], target = 9",
                output: "[0,1]",
                explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
            },
            {
                input: "nums = [3,2,4], target = 6",
                output: "[1,2]",
                explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
            },
            {
                input: "nums = [3,3], target = 6",
                output: "[0,1]",
                explanation: "Because nums[0] + nums[1] == 6, we return [0, 1]."
            }
        ],
        constraints: [
            "2 <= nums.length <= 10⁴",
            "-10⁹ <= nums[i] <= 10⁹",
            "-10⁹ <= target <= 10⁹",
            "Only one valid answer exists."
        ],
        topics: ["Array", "Hash Table"],
        hints: [
            "Use a hash map to store numbers and their indices",
            "For each number, check if its complement exists in the map",
            "This reduces the time complexity from O(n²) to O(n)"
        ],
        solution: {
            python: `def twoSum(nums, target):
    """
    Find two indices such that their values sum to target.
    
    Args:
        nums: List of integers
        target: Target sum
        
    Returns:
        List of two indices
    """
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []`,
            javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`,
            java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[0];
    }
}`,
            cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> map;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (map.find(complement) != map.end()) {
                return {map[complement], i};
            }
            map[nums[i]] = i;
        }
        return {};
    }
};`
        },
        testCases: [
            { input: '[2,7,11,15], 9', expected: '[0,1]' },
            { input: '[3,2,4], 6', expected: '[1,2]' },
            { input: '[3,3], 6', expected: '[0,1]' },
            { input: '[1,2,3,4,5], 9', expected: '[3,4]' },
            { input: '[0,4,3,0], 0', expected: '[0,3]' }
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        acceptance: "52.3%",
        likes: "12.5K",
        totalSubmissions: "2.4M"
    };

    // Default code
    const defaultCodes = {
        python: `def twoSum(nums, target):
    """
    Find two indices such that their values sum to target.
    
    Args:
        nums: List of integers
        target: Target sum
        
    Returns:
        List of two indices
    """
    # Your code here
    pass`,
        javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Your code here
}`,
        java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        return new int[0];
    }
}`,
        cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Your code here
        return {};
    }
};`
    };

    // Initialize code
    useEffect(() => {
        if (!code) {
            setCode(defaultCodes[language]);
        }
    }, [language]);

    const handleRun = async () => {
        setIsRunning(true);
        setOutput('');
        setTestResults([]);
        setProgress(0);

        // Simulate running tests with progress
        const totalTests = problem.testCases.length;
        const results = [];
        
        for (let i = 0; i < totalTests; i++) {
            await new Promise(resolve => setTimeout(resolve, 200));
            setProgress(((i + 1) / totalTests) * 100);
            
            const passed = Math.random() > 0.3; // 70% chance of passing
            results.push({
                id: i + 1,
                input: problem.testCases[i].input,
                expected: problem.testCases[i].expected,
                actual: passed ? problem.testCases[i].expected : '[0,0]',
                passed
            });
            
            setTestResults([...results]);
        }

        const time = Math.floor(Math.random() * 100) + 50;
        const memory = (Math.random() * 5 + 40).toFixed(1);
        
        setExecutionTime(time);
        setMemoryUsage(memory);
        setIsRunning(false);
        
        const allPassed = results.every(r => r.passed);
        if (allPassed) {
            setOutput(`✅ All test cases passed!\n⏱️ Execution time: ${time}ms\n💾 Memory usage: ${memory} MB`);
        } else {
            setOutput(`❌ Some test cases failed\n⏱️ Execution time: ${time}ms\n💾 Memory usage: ${memory} MB`);
        }
    };

    const handleSubmit = () => {
        setIsRunning(true);
        setOutput('🚀 Submitting your solution...\n\n');

        setTimeout(() => {
            const time = executionTime || Math.floor(Math.random() * 100) + 50;
            const memory = memoryUsage || (Math.random() * 5 + 40).toFixed(1);
            
            const result = `🎉 Congratulations!\n\n`;
            const result2 = `✅ Solution Accepted\n`;
            const result3 = `⏱️ Runtime: ${time}ms (Beats 85%)\n`;
            const result4 = `💾 Memory: ${memory} MB (Beats 92%)\n\n`;
            const result5 = `🏆 You've earned 10 XP for solving this problem!`;

            setOutput(result + result2 + result3 + result4 + result5);
            setIsCompleted(true);
            setIsRunning(false);
        }, 1500);
    };

    const handleReset = () => {
        setCode(defaultCodes[language]);
        setOutput('');
        setIsCompleted(false);
        setExecutionTime(null);
        setMemoryUsage(null);
        setTestResults([]);
    };

    const handleNext = () => {
        const nextId = parseInt(problemId) + 1;
        navigate(`/problem/${phase}/${nextId}`);
    };

    const handlePrevious = () => {
        const prevId = parseInt(problemId) - 1;
        if (prevId >= 1) {
            navigate(`/problem/${phase}/${prevId}`);
        }
    };

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        setCode(defaultCodes[lang]);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleBackToDashboard = () => {
        navigate('/dashboard');
    };

    const difficultyColor = {
        'Easy': '#10b981',
        'Medium': '#f59e0b',
        'Hard': '#ef4444'
    };

    const getDifficultyIcon = () => {
        switch(problem.difficulty) {
            case 'Easy': return <Bullseye  className="me-2" />;
            case 'Medium': return <Lightning  className="me-2" />;
            case 'Hard': return <Flag className="me-2" />;
            default: return <Bullseye  className="me-2" />;
        }
    };

    return (
        <div className="problem-page" style={{ 
            backgroundColor: '#f8fafc',
            minHeight: '100vh',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
        }}>
            {/* Enhanced Header */}
            <div className="problem-header py-4 border-bottom" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
            }}>
                <Container>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <Button
                                variant="light"
                                size="sm"
                                onClick={handleBackToDashboard}
                                className="d-flex align-items-center px-3 py-2 rounded-pill"
                                style={{ backdropFilter: 'blur(10px)' }}
                            >
                                <ChevronLeft className="me-2" />
                                Back to Path
                            </Button>
                        </div>

                        <div className="text-center">
                            <div className="d-flex align-items-center justify-content-center mb-2">
                                <h4 className="fw-bold mb-0 me-3">{problem.title}</h4>
                                <ProblemBadge className={problem.difficulty.toLowerCase()}>
                                    {getDifficultyIcon()}
                                    {problem.difficulty}
                                </ProblemBadge>
                            </div>
                            <div className="d-flex align-items-center justify-content-center gap-3">
                                <small className="d-flex align-items-center">
                                    <Clock className="me-1" size={14} />
                                    {problem.timeComplexity}
                                </small>
                                <small className="d-flex align-items-center">
                                    <Memory className="me-1" size={14} />
                                    {problem.spaceComplexity}
                                </small>
                                <small className="d-flex align-items-center">
                                    <GraphUp  className="me-1" size={14} />
                                    {problem.acceptance} Acceptance
                                </small>
                            </div>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                            <div className="progress" style={{ width: '120px', height: '6px' }}>
                                <div
                                    className="progress-bar bg-white"
                                    role="progressbar"
                                    style={{ width: `${(parseInt(problemId) / 30 * 100)}%` }}
                                ></div>
                            </div>
                            <small>
                                {problemId}/30
                            </small>
                        </div>
                    </div>
                </Container>
            </div>

            <Container fluid className="p-0">
                <Row className="g-0" style={{ minHeight: 'calc(100vh - 140px)' }}>
                    {/* Left Panel - Problem Description */}
                    <Col lg={6} className="border-end">
                        <div className="p-4" style={{ height: '100%', overflowY: 'auto', backgroundColor: '#ffffff' }}>
                            <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                                <Nav variant="pills" className="mb-4" style={{ 
                                    background: '#f1f5f9',
                                    padding: '4px',
                                    borderRadius: '12px'
                                }}>
                                    <Nav.Item className="flex-fill text-center">
                                        <Nav.Link eventKey="problem" className="rounded-pill fw-medium">
                                            <Book className="me-2" />
                                            Problem
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="flex-fill text-center">
                                        <Nav.Link eventKey="submissions" className="rounded-pill fw-medium">
                                            <BarChart className="me-2" />
                                            Submissions
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="flex-fill text-center">
                                        <Nav.Link eventKey="discussion" className="rounded-pill fw-medium">
                                            <People className="me-2" />
                                            Community
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>

                                <Tab.Content>
                                    <Tab.Pane eventKey="problem">
                                        <div className="mb-4">
                                            {/* Topics */}
                                            <div className="d-flex flex-wrap gap-2 mb-4">
                                                {problem.topics.map((topic, idx) => (
                                                    <Badge key={idx} bg="light" text="dark" className="px-3 py-2 d-flex align-items-center">
                                                        <Code className="me-2" size={12} />
                                                        {topic}
                                                    </Badge>
                                                ))}
                                            </div>

                                            {/* Description */}
                                            <div className="mb-5">
                                                <h6 className="fw-bold mb-3 d-flex align-items-center">
                                                    <FileText className="me-2 text-primary" />
                                                    Description
                                                </h6>
                                                <div className="p-4 rounded" style={{ 
                                                    backgroundColor: '#f8fafc',
                                                    border: '1px solid #e2e8f0',
                                                    lineHeight: '1.8',
                                                    color: '#475569'
                                                }}>
                                                    {problem.description}
                                                </div>
                                            </div>

                                            {/* Examples */}
                                            <div className="mb-5">
                                                <h6 className="fw-bold mb-3 d-flex align-items-center">
                                                    <Play className="me-2 text-success" />
                                                    Examples
                                                </h6>
                                                {problem.examples.map((example, idx) => (
                                                    <GlassCard key={idx} className="mb-3 overflow-hidden">
                                                        <Card.Body className="p-0">
                                                            <div className="p-3 border-bottom">
                                                                <small className="text-muted fw-bold">Example {idx + 1}</small>
                                                            </div>
                                                            <div className="p-3">
                                                                <div className="mb-2">
                                                                    <small className="text-muted d-block mb-1">Input</small>
                                                                    <div className="p-3 rounded" style={{ 
                                                                        backgroundColor: '#1e293b',
                                                                        color: '#f1f5f9',
                                                                        fontFamily: 'monospace'
                                                                    }}>
                                                                        {example.input}
                                                                    </div>
                                                                </div>
                                                                <div className="mb-2">
                                                                    <small className="text-muted d-block mb-1">Output</small>
                                                                    <div className="p-3 rounded" style={{ 
                                                                        backgroundColor: '#1e293b',
                                                                        color: '#f1f5f9',
                                                                        fontFamily: 'monospace'
                                                                    }}>
                                                                        {example.output}
                                                                    </div>
                                                                </div>
                                                                {example.explanation && (
                                                                    <div className="mt-3">
                                                                        <small className="text-muted d-block mb-1">
                                                                            <Lightbulb className="me-1" size={12} />
                                                                            Explanation
                                                                        </small>
                                                                        <small>{example.explanation}</small>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </Card.Body>
                                                    </GlassCard>
                                                ))}
                                            </div>

                                            {/* Constraints */}
                                            <div className="mb-5">
                                                <h6 className="fw-bold mb-3 d-flex align-items-center">
                                                    <ShieldCheck className="me-2 text-warning" />
                                                    Constraints
                                                </h6>
                                                <ul className="list-unstyled">
                                                    {problem.constraints.map((constraint, idx) => (
                                                        <li key={idx} className="mb-2 d-flex align-items-start">
                                                            <ChevronRight className="text-primary me-2 mt-1" size={12} />
                                                            <code className="text-dark" style={{ fontSize: '0.9rem' }}>{constraint}</code>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Hints */}
                                            <GlassCard className="border-0" style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)' }}>
                                                <Card.Body className="p-4">
                                                    <div className="d-flex align-items-start">
                                                        <div className="p-2 rounded-circle me-3" style={{ backgroundColor: '#0ea5e9' }}>
                                                            <Lightbulb className="text-white" />
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <h6 className="fw-bold mb-2">Need a hint?</h6>
                                                            <Button
                                                                variant="outline-primary"
                                                                size="sm"
                                                                onClick={() => setShowHints(!showHints)}
                                                                className="mb-3 d-flex align-items-center"
                                                            >
                                                                {showHints ? 'Hide Hints' : 'Show Hints'}
                                                                {showHints ? <ChevronUp className="ms-2" /> : <ChevronDown className="ms-2" />}
                                                            </Button>

                                                            {showHints && (
                                                                <div className="mt-3">
                                                                    {problem.hints.map((hint, idx) => (
                                                                        <div key={idx} className="mb-2 d-flex align-items-start">
                                                                            <div className="p-1 rounded-circle me-2 mt-1" style={{ 
                                                                                backgroundColor: '#0ea5e920',
                                                                                width: '24px',
                                                                                height: '24px',
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'center'
                                                                            }}>
                                                                                <small className="fw-bold" style={{ color: '#0ea5e9' }}>
                                                                                    {idx + 1}
                                                                                </small>
                                                                            </div>
                                                                            <small className="text-dark">{hint}</small>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </GlassCard>
                                        </div>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="submissions">
                                        <div className="py-5 text-center">
                                            <div className="mb-4">
                                                <BarChart size={48} className="text-primary mb-3" />
                                                <h5 className="fw-bold mb-2">Submission History</h5>
                                                <p className="text-muted">Track your progress and improvements</p>
                                            </div>
                                            {isCompleted ? (
                                                <GlassCard className="border-success border-2">
                                                    <Card.Body className="p-4">
                                                        <div className="d-flex align-items-center">
                                                            <div className="p-3 rounded-circle me-3" style={{ 
                                                                backgroundColor: '#10b98120',
                                                                color: '#10b981'
                                                            }}>
                                                                <CheckCircle size={24} />
                                                            </div>
                                                            <div className="text-start">
                                                                <h6 className="fw-bold mb-1">Latest Submission</h6>
                                                                <small className="text-muted">
                                                                    ✅ Accepted • Runtime: {executionTime || '56'}ms • Memory: {memoryUsage || '42.1'}MB
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </Card.Body>
                                                </GlassCard>
                                            ) : (
                                                <Alert variant="info" className="border-0">
                                                    <p className="mb-0">No submissions yet. Solve the problem to see your stats!</p>
                                                </Alert>
                                            )}
                                        </div>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="discussion">
                                        <div className="py-5 text-center">
                                            <div className="mb-4">
                                                <People size={48} className="text-primary mb-3" />
                                                <h5 className="fw-bold mb-2">Community Discussion</h5>
                                                <p className="text-muted">Learn from other students' solutions and insights</p>
                                            </div>
                                            <Button variant="primary" className="px-4 py-2 rounded-pill">
                                                Join Discussion Forum
                                            </Button>
                                            <div className="mt-4">
                                                <small className="text-muted">
                                                    {problem.likes} likes • {problem.totalSubmissions} total submissions
                                                </small>
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </div>
                    </Col>

                    {/* Right Panel - Code Editor */}
                    <Col lg={6}>
                        <div className="d-flex flex-column h-100 bg-white">
                            {/* Editor Header */}
                            <div className="p-3 border-bottom bg-white" style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)' }}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center gap-3">
                                        <div>
                                            <small className="text-muted d-block mb-1">Language</small>
                                            <select
                                                className="form-select form-select-sm border-0 rounded-pill"
                                                value={language}
                                                onChange={(e) => handleLanguageChange(e.target.value)}
                                                style={{ 
                                                    width: '140px',
                                                    background: '#f1f5f9',
                                                    fontWeight: '500'
                                                }}
                                            >
                                                <option value="python">🐍 Python</option>
                                                <option value="javascript">📜 JavaScript</option>
                                                <option value="java">☕ Java</option>
                                                <option value="cpp">⚡ C++</option>
                                            </select>
                                        </div>

                                        <div>
                                            <Button
                                                variant="link"
                                                size="sm"
                                                onClick={copyToClipboard}
                                                className="text-muted d-flex align-items-center"
                                            >
                                                {copied ? <CheckCircle className="me-1 text-success" /> : <Copy className="me-1" />}
                                                {copied ? 'Copied!' : 'Copy'}
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="d-flex gap-2">
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={handleReset}
                                            className="d-flex align-items-center rounded-pill px-3"
                                            disabled={isRunning}
                                        >
                                            <ArrowClockwise className="me-2" />
                                            Reset
                                        </Button>
                                        <Button
                                            variant="success"
                                            size="sm"
                                            onClick={handleRun}
                                            disabled={isRunning}
                                            className="d-flex align-items-center rounded-pill px-3"
                                        >
                                            {isRunning ? (
                                                <>
                                                    <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                                                    Running...
                                                </>
                                            ) : (
                                                <>
                                                    <Play className="me-2" />
                                                    Run Code
                                                </>
                                            )}
                                        </Button>
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            onClick={handleSubmit}
                                            disabled={isRunning}
                                            className="d-flex align-items-center rounded-pill px-4"
                                        >
                                            <Send className="me-2" />
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Code Editor */}
                            <div style={{ flex: 1, backgroundColor: '#1e1e1e', position: 'relative' }}>
                                <div className="position-absolute top-0 end-0 m-3 d-flex gap-2">
                                    {isCompleted && (
                                        <Badge bg="success" className="px-3 py-2">
                                            <Award className="me-2" />
                                            Solved
                                        </Badge>
                                    )}
                                </div>
                                <CodeEditor
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder={`Write your ${language} solution here...`}
                                    spellCheck="false"
                                />
                            </div>

                            {/* Bottom Panel */}
                            <div className="border-top" style={{ height: '250px' }}>
                                <Tab.Container defaultActiveKey="output">
                                    <Nav variant="tabs" className="px-3 pt-3 border-bottom-0">
                                        <Nav.Item>
                                            <Nav.Link eventKey="output" className="fw-medium border-0">
                                                <Terminal className="me-2" />
                                                Output
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="testcases" className="fw-medium border-0">
                                                <Gear className="me-2" />
                                                Test Cases
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="solution" className="fw-medium border-0">
                                                <CodeSlash className="me-2" />
                                                Solution
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>

                                    <Tab.Content className="p-3" style={{ height: '200px', overflowY: 'auto' }}>
                                        <Tab.Pane eventKey="output">
                                            {isRunning ? (
                                                <div className="d-flex flex-column align-items-center justify-content-center h-100">
                                                    <div className="spinner-border text-primary mb-3" role="status"></div>
                                                    <p className="text-muted mb-2">Running your code...</p>
                                                    <ProgressBar 
                                                        now={progress} 
                                                        style={{ width: '80%', height: '6px' }}
                                                        variant="primary"
                                                        animated
                                                    />
                                                </div>
                                            ) : output ? (
                                                <pre className="mb-0" style={{
                                                    whiteSpace: 'pre-wrap',
                                                    fontFamily: '"JetBrains Mono", monospace',
                                                    fontSize: '13px',
                                                    color: '#333',
                                                    margin: 0
                                                }}>
                                                    {output}
                                                </pre>
                                            ) : (
                                                <div className="text-center h-100 d-flex flex-column align-items-center justify-content-center">
                                                    <Terminal size={32} className="text-muted mb-2" />
                                                    <p className="text-muted mb-0">Run your code to see output here</p>
                                                </div>
                                            )}
                                        </Tab.Pane>

                                        <Tab.Pane eventKey="testcases">
                                            <div className="mb-3">
                                                <h6 className="fw-bold mb-3">Test Cases</h6>
                                                <div className="row g-2">
                                                    {testResults.length > 0 ? (
                                                        testResults.map((test, idx) => (
                                                            <Col md={6} key={idx}>
                                                                <TestCaseCard className={`${test.passed ? 'passed' : 'failed'}`}>
                                                                    <Card.Body className="p-3">
                                                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                                                            <small className="fw-bold">Test Case {test.id}</small>
                                                                            <Badge bg={test.passed ? "success" : "danger"} className="px-2 py-1">
                                                                                {test.passed ? "✓" : "✗"}
                                                                            </Badge>
                                                                        </div>
                                                                        <div className="mb-2">
                                                                            <small className="text-muted d-block mb-1">Input</small>
                                                                            <code className="small text-dark">{test.input}</code>
                                                                        </div>
                                                                        <div className="mb-2">
                                                                            <small className="text-muted d-block mb-1">Expected</small>
                                                                            <code className="small text-success">{test.expected}</code>
                                                                        </div>
                                                                        {!test.passed && (
                                                                            <div>
                                                                                <small className="text-muted d-block mb-1">Got</small>
                                                                                <code className="small text-danger">{test.actual}</code>
                                                                            </div>
                                                                        )}
                                                                    </Card.Body>
                                                                </TestCaseCard>
                                                            </Col>
                                                        ))
                                                    ) : (
                                                        <div className="text-center py-4">
                                                            <Gear size={32} className="text-muted mb-3" />
                                                            <p className="text-muted">Run your code to see test results</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </Tab.Pane>

                                        <Tab.Pane eventKey="solution">
                                            <div className="mb-3">
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    <h6 className="fw-bold mb-0 d-flex align-items-center">
                                                        <CodeSlash className="me-2 text-primary" />
                                                        Solution ({language})
                                                    </h6>
                                                    <Button
                                                        variant={showSolution ? "outline-danger" : "outline-primary"}
                                                        size="sm"
                                                        onClick={() => setShowSolution(!showSolution)}
                                                        className="d-flex align-items-center rounded-pill"
                                                    >
                                                        {showSolution ? (
                                                            <>
                                                                <EyeSlash className="me-2" />
                                                                Hide
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Eye className="me-2" />
                                                                Show Solution
                                                            </>
                                                        )}
                                                    </Button>
                                                </div>

                                                {showSolution ? (
                                                    <SolutionCard>
                                                        <Card.Body className="p-4">
                                                            <pre style={{
                                                                overflowX: 'auto',
                                                                fontSize: '13px',
                                                                lineHeight: '1.5'
                                                            }}>
                                                                {problem.solution[language]}
                                                            </pre>
                                                        </Card.Body>
                                                    </SolutionCard>
                                                ) : (
                                                    <Alert variant="warning" className="border-0 rounded-lg">
                                                        <div className="d-flex align-items-start">
                                                            <Lightbulb className="me-3 mt-1 flex-shrink-0" />
                                                            <div>
                                                                <h6 className="fw-bold mb-2">Try it yourself first!</h6>
                                                                <p className="mb-0">
                                                                    Attempt to solve the problem before viewing the solution. 
                                                                    You'll learn much more that way!
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Alert>
                                                )}
                                            </div>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Tab.Container>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Footer Navigation */}
            <div className="problem-footer py-3 border-top bg-white" style={{ 
                boxShadow: '0 -2px 20px rgba(0, 0, 0, 0.05)'
            }}>
                <Container>
                    <div className="d-flex justify-content-between align-items-center">
                        <Button
                            variant="outline-primary"
                            onClick={handlePrevious}
                            disabled={parseInt(problemId) === 1}
                            className="d-flex align-items-center px-4 py-2 rounded-pill"
                        >
                            <ArrowLeft className="me-2" />
                            Previous
                        </Button>

                        <div className="text-center">
                            <div className="mb-2">
                                <ProgressBar style={{ width: '300px', height: '8px', borderRadius: '4px' }}>
                                    <ProgressBar 
                                        variant="primary" 
                                        now={(parseInt(problemId) / 30 * 100)} 
                                        style={{ borderRadius: '4px' }}
                                        animated
                                    />
                                </ProgressBar>
                            </div>
                            <small className="text-muted">
                                Progress: {problemId} of 30 • {Math.round((parseInt(problemId) / 30 * 100))}% complete
                            </small>
                        </div>

                        <Button
                            variant="primary"
                            onClick={handleNext}
                            className="d-flex align-items-center px-4 py-2 rounded-pill"
                        >
                            Next Problem
                            <ArrowRight className="ms-2" />
                        </Button>
                    </div>
                </Container>
            </div>

            {/* Floating Action Button */}
            {isCompleted && (
                <FloatingActionButton
                    variant="primary"
                    onClick={() => console.log('Share achievement')}
                >
                    <Rocket />
                </FloatingActionButton>
            )}
        </div>
    );
}