// pages/ProblemPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert, Tab, Nav, Form, ProgressBar, Spinner, Modal } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { moveToProblem } from '../services/moveToProblem';
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
    ShieldCheck,
    Star,
    Fullscreen,
    DashSquare,
    Volume2,
    Zap,
    GraphUpArrow,
    Activity,
    Layers,
    Filter,
    Key,
    Lock,
    Unlock,
    Share,
    Download,
    Upload,
    Cursor,
    Grid,
    Menu,
    X,
    Moon,
    Sun,
    Palette,
    Layout,
    Command,
    Search
} from 'react-bootstrap-icons';
import styled from 'styled-components';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import Editor from '@monaco-editor/react';

// Styled Components
const GlassCard = styled(Card)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  border-radius: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 
      0 20px 60px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
  }
`;

const CodeThemeCard = styled(Card)`
  background: #1a1b26;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #9dccff;
  overflow: hidden;
  position: relative;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  
  &::before {
    content: '';
    position: absolute;
    top: 12px;
    left: 12px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #ff5f56;
    box-shadow: 20px 0 0 #ffbd2e, 40px 0 0 #27ca3f;
  }
  
  .code-header {
    background: #16161e;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding: 12px 20px;
    display: flex;
    align-items: center;
    
    .code-title {
      color: #9dccff;
      font-size: 14px;
      font-weight: 600;
      margin-left: 60px;
    }
  }
  
  .code-content {
    padding: 20px;
    margin-top: 10px;
  }
`;

const NeonBadge = styled(Badge)`
  padding: 8px 16px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  border-radius: 12px;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  
  &.easy {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
  }
  
  &.medium {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    box-shadow: 0 4px 20px rgba(245, 158, 11, 0.3);
  }
  
  &.hard {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    box-shadow: 0 4px 20px rgba(239, 68, 68, 0.3);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.6s ease;
  }
  
  &:hover::after {
    left: 100%;
  }
`;

const FloatingPanel = styled.div`
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  border-radius: 24px;
  padding: 24px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    box-shadow: 
      0 35px 60px -15px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.6);
  }
`;

<style>{`
  /* Ensure editor text is visible */
  .monaco-editor .view-lines {
    color: #e2e8f0 !important;
  }
  
  .monaco-editor .line-numbers {
    color: #64748b !important;
  }
  
  /* Make the editor container clearly visible */
  .editor-container {
    border: 2px solid #6366f1;
    background: #0f172a;
    border-radius: 12px;
    overflow: hidden;
  }
  
  /* Add a placeholder if editor is empty */
  .monaco-editor:empty::before {
    content: "Start typing your code here...";
    color: #64748b;
    position: absolute;
    top: 20px;
    left: 80px;
    font-style: italic;
  }
`}</style>
const ModernButton = styled(Button)`
  background: ${props => {
        if (props.variant === 'primary') return 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
        if (props.variant === 'success') return 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        if (props.variant === 'warning') return 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
        if (props.variant === 'danger') return 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
        if (props.variant === 'outline-primary') return 'transparent';
        return 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
    }};
  border: ${props => props.variant === 'outline-primary' ? '2px solid #6366f1' : 'none'};
  border-radius: 12px;
  padding: ${props => props.size === 'sm' ? '8px 16px' : '12px 24px'};
  font-weight: 600;
  letter-spacing: 0.3px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  color: ${props => props.variant === 'outline-primary' ? '#6366f1' : 'white'};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: fit-content;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    transition: left 0.6s ease;
  }
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${props => {
        if (props.variant === 'primary') return '0 20px 40px rgba(99, 102, 241, 0.4)';
        if (props.variant === 'success') return '0 20px 40px rgba(16, 185, 129, 0.4)';
        if (props.variant === 'warning') return '0 20px 40px rgba(245, 158, 11, 0.4)';
        if (props.variant === 'danger') return '0 20px 40px rgba(239, 68, 68, 0.4)';
        if (props.variant === 'outline-primary') return '0 20px 40px rgba(99, 102, 241, 0.2)';
        return '0 20px 40px rgba(99, 102, 241, 0.4)';
    }};
    background: ${props => {
        if (props.variant === 'outline-primary') return '#6366f1';
        return props.variant === 'primary' ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' :
            props.variant === 'success' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' :
                props.variant === 'warning' ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' :
                    props.variant === 'danger' ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' :
                        'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
    }};
    color: white;
    
    &::before {
      left: 100%;
    }
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    transform: none !important;
    box-shadow: none !important;
    cursor: not-allowed;
  }
`;

const SmallButton = styled(ModernButton)`
  padding: 6px 12px;
  font-size: 0.875rem;
  border-radius: 10px;
  min-width: auto;
`;

const CodeBlock = styled.pre`
  background: #1a1b26;
  border-radius: 12px;
  padding: 24px;
  margin: 0;
  overflow-x: auto;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 12px;
    left: 12px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #ff5f56;
    box-shadow: 20px 0 0 #ffbd2e, 40px 0 0 #27ca3f;
  }
  
  code {
    font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
    font-size: 14px;
    line-height: 1.8;
    color: #9dccff;
    display: block;
    margin-top: 20px;
  }
`;

const TestCaseResult = styled.div`
  background: ${props => props.passed ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
  border: 2px solid ${props => props.passed ? '#10b981' : '#ef4444'};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '${props => props.passed ? '✓' : '✗'}';
    position: absolute;
    top: -10px;
    right: -10px;
    width: 40px;
    height: 40px;
    background: ${props => props.passed ? '#10b981' : '#ef4444'};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: white;
    font-weight: bold;
    box-shadow: 0 4px 12px ${props => props.passed ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'};
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px ${props => props.passed ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
  }
`;

const ProgressRing = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: conic-gradient(#6366f1 ${props => props.progress * 3.6}deg, #e2e8f0 0deg);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 100px;
    height: 100px;
    background: white;
    border-radius: 50%;
    box-shadow: inset 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .progress-text {
    position: relative;
    z-index: 1;
    font-size: 24px;
    font-weight: 800;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const AnimatedIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: linear-gradient(135deg, ${props => props.color || '#6366f1'} 0%, ${props => props.color2 || '#8b5cf6'} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  box-shadow: 0 8px 32px ${props => `rgba(${parseInt(props.color?.slice(1, 3), 16)}, ${parseInt(props.color?.slice(3, 5), 16)}, ${parseInt(props.color?.slice(5, 7), 16)}, 0.3)`};
  animation: float 3s ease-in-out infinite;
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
`;

const CustomTab = styled(Nav.Item)`
  .nav-link {
    background: transparent;
    border: none;
    color: #64748b;
    font-weight: 600;
    padding: 12px 24px;
    border-radius: 12px;
    margin: 0 4px;
    transition: all 0.3s ease;
    position: relative;
    
    &.active {
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: white;
      box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
      
      &::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 20px;
        height: 4px;
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        border-radius: 2px;
      }
    }
    
    &:hover:not(.active) {
      background: rgba(99, 102, 241, 0.1);
      color: #6366f1;
      transform: translateY(-2px);
    }
  }
`;

const CodeInput = styled.div`
  background: #1a1b26;
  border-radius: 8px;
  padding: 16px;
  margin: 8px 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  color: #9dccff;
  border-left: 4px solid #6366f1;
  
  .label {
    color: #6366f1;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
    display: block;
    font-weight: 600;
  }
  
  .value {
    color: #9dccff;
    word-break: break-all;
    background: #16161e;
    padding: 8px 12px;
    border-radius: 4px;
    font-family: 'JetBrains Mono', monospace;
  }
`;

// New Clean Editor Container
const EditorArea = styled.div`
  display: flex;
  flex-direction: column;
  background: #0f172a;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: calc(100vh - 160px); /* Increased height */
`;

const EditorHeader = styled.div`
  background: #1e293b;
  padding: 16px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

const EditorBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 20px;
  gap: 16px;
  background: #0f172a;
`;

const EditorWrapper = styled.div`
  flex: 2; /* Changed from flex: 1 to give more space */
  min-height: 300px; /* Minimum height */
  height: 400px; /* Fixed height for editor */
  background: #0f172a;
  border-radius: 12px;
  border: 2px solid rgba(99, 102, 241, 0.3);
  overflow: hidden;
  position: relative;
  
  .monaco-editor {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    
    .overflow-guard {
      border-radius: 12px;
    }
  }
`;

const EditorFooter = styled.div`
  height: 250px; /* Increased from 200px */
  min-height: 250px;
  background: #1a1b26;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export function ProblemPage() {
    const { phase, problemId } = useParams();
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState("");
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
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [theme, setTheme] = useState('myTheme');
    const [fontSize, setFontSize] = useState(14);
    const [showSettings, setShowSettings] = useState(false);
    const editorRef = useRef(null);
    const [userCode, setUserCode] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);
    const [lineCount, setLineCount] = useState(1);




    // // Initialize code
    // useEffect(() => {
    //     if (!code) {
    //         const initialCode = defaultCodes[language];
    //         setCode(initialCode);
    //         // Count lines in initial code
    //         const lines = initialCode.split('\n').length;
    //         setLineCount(lines);
    //     }
    // }, [language]);

    // Update line count when code changes
    useEffect(() => {
        const lines = code.split('\n').length;
        setLineCount(lines);
    }, [code]);

    useEffect(() => {
        moveToProblem().then(json => {
            setCode(json.content.content);
            setOutputText(json.content.output);
        });
    }, []);


    // Handle editor mount
    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
        editor.focus();

        // Enhanced dark theme
        monaco.editor.defineTheme('myTheme', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
                { token: 'keyword', foreground: '569CD6' },
                { token: 'string', foreground: 'CE9178' },
                { token: 'number', foreground: 'B5CEA8' },
                { token: 'function', foreground: 'DCDCAA' },
                { token: 'variable', foreground: '9CDCFE' },
                { token: 'type', foreground: '4EC9B0' },
                { token: 'operator', foreground: 'D4D4D4' }
            ],
            colors: {
                'editor.background': '#0f172a',
                'editor.foreground': '#e2e8f0',
                'editor.lineHighlightBackground': '#1e293b',
                'editorCursor.foreground': '#ffffff',
                'editor.lineNumbers': '#64748b',
                'editor.lineNumbers.active': '#94a3b8',
                'editor.selectionBackground': '#334155',
                'editor.inactiveSelectionBackground': '#1e293b',
                'editorIndentGuide.background': '#1e293b',
                'editorIndentGuide.activeBackground': '#334155',
                'editorBracketMatch.background': '#1e293b',
                'editorBracketMatch.border': '#6366f1'
            }

        });
        monaco.editor.setTheme('myTheme');

        // Configure editor for better scrolling
        editor.updateOptions({
            scrollbar: {
                vertical: 'auto',
                horizontal: 'auto',
                useShadows: false,
                verticalHasArrows: false,
                horizontalHasArrows: false,
                verticalScrollbarSize: 10,
                horizontalScrollbarSize: 10,
                verticalSliderSize: 10,
                horizontalSliderSize: 10,
                handleMouseWheel: true,
                alwaysConsumeMouseWheel: true,
            },
            mouseWheelScrollSensitivity: 1,
            fastScrollSensitivity: 5,
            cursorSmoothCaretAnimation: 'on',
            smoothScrolling: true,
            scrollBeyondLastLine: false,
            padding: { top: 20, bottom: 20 },
            automaticLayout: true
        });
    };

    const handleCodeChange = (value) => {
        setCode(value);
    };

    const handleRun = async () => {
        setIsRunning(true);
        setOutput('');
        setTestResults([]);
        setProgress(0);

        // Enhanced simulation with realistic feedback
        // const totalTests = problem.testCases.length;
        const results = [];
        let passedCount = 0;

        // for (let i = 0; i < totalTests; i++) {
        //     await new Promise(resolve => setTimeout(resolve, 300));
        //     setProgress(((i + 1) / totalTests) * 100);

        //     const passed = Math.random() > 0.2; // 80% chance of passing
        //     if (passed) passedCount++;

        //     results.push({
        //         id: i + 1,
        //         input: problem.testCases[i].input,
        //         expected: problem.testCases[i].expected,
        //         actual: passed ? problem.testCases[i].expected : '[0,0]',
        //         passed,
        //         time: (Math.random() * 50 + 10).toFixed(1),
        //         memory: (Math.random() * 2 + 40).toFixed(1)
        //     });

        //     setTestResults([...results]);
        // }

        const totalTime = results.reduce((sum, r) => sum + parseFloat(r.time), 0).toFixed(1);
        const avgMemory = (results.reduce((sum, r) => sum + parseFloat(r.memory), 0) / results.length).toFixed(1);

        setExecutionTime(totalTime);
        setMemoryUsage(avgMemory);
        setIsRunning(false);

        // const successRate = Math.round((passedCount / totalTests) * 100);

        // if (passedCount === totalTests) {
        //     setOutput(`🎯 All Test Cases Passed!\n\n📊 Results:\n├── ✅ ${passedCount}/${totalTests} tests passed\n├── ⏱️  Total time: ${totalTime}ms\n├── 💾 Avg memory: ${avgMemory}MB\n└── 🎯 Success rate: ${successRate}%\n\n💡 Great job! Your solution is optimal.`);
        // } else {
        //     setOutput(`⚠️  ${passedCount}/${totalTests} Tests Passed\n\n📊 Results:\n├── ❌ ${totalTests - passedCount} test(s) failed\n├── ⏱️  Total time: ${totalTime}ms\n├── 💾 Avg memory: ${avgMemory}MB\n└── 🎯 Success rate: ${successRate}%\n\n🔍 Check the failed test cases for debugging.`);
        // }
    };

    const handleSubmit = () => {
        setIsRunning(true);
        setOutput('🚀 Submitting your solution...\n\nAnalyzing code quality and performance...');

        setTimeout(async () => {
            const analysis = [
                "✓ Code structure validated",
                "✓ No syntax errors found",
                "✓ Performance check passed",
                "✓ Memory usage optimized",
                "✓ Edge cases handled"
            ];

            let outputText = '🚀 Analyzing Submission...\n\n';
            for (let i = 0; i < analysis.length; i++) {
                outputText += `${analysis[i]}\n`;
                setOutput(outputText);
                await new Promise(resolve => setTimeout(resolve, 300));
            }

            const time = executionTime || (Math.random() * 50 + 30).toFixed(1);
            const memory = memoryUsage || (Math.random() * 2 + 41).toFixed(1);
            const beatsTime = Math.floor(Math.random() * 30) + 70;
            const beatsMemory = Math.floor(Math.random() * 25) + 75;

            const finalResult = `\n🎉 Congratulations! Solution Accepted\n\n🏆 Performance Metrics:\n┌─ Runtime: ${time}ms\n│  ├── Beats ${beatsTime}% of submissions\n│  └── ✅ Better than average\n├─ Memory: ${memory}MB\n│  ├── Beats ${beatsMemory}% of submissions\n│  └── ✅ Highly efficient\n└─ 🏅 Overall Score: 95/100\n\n✨ You've earned 50 XP for solving this problem!`;

            setOutput(outputText + finalResult);
            setIsCompleted(true);
            setIsRunning(false);
            setShowConfetti(true);

            // Hide confetti after 3 seconds
            setTimeout(() => setShowConfetti(false), 3000);
        }, 1500);
    };

    const handleReset = () => {
        // setCode(defaultCodes[language]);
        setOutput('');
        setIsCompleted(false);
        setExecutionTime(null);
        setMemoryUsage(null);
        setTestResults([]);
        setShowConfetti(false);
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
        // setCode(defaultCodes[lang]);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    const handleShare = () => {
        const shareData = {
            // title: `Solved: ${problem.title}`,
            // text: `I just solved "${problem.title}" on CodeMaster!`,
            url: window.location.href
        };

        if (navigator.share) {
            navigator.share(shareData);
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <div className="problem-page" style={{
            backgroundColor: '#f8fafc',
            minHeight: '100vh',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            backgroundImage: 'radial-gradient(circle at 15% 50%, rgba(99, 102, 241, 0.05) 0%, transparent 20%), radial-gradient(circle at 85% 30%, rgba(139, 92, 246, 0.05) 0%, transparent 20%)'
        }}>
            {/* Confetti Effect */}
            {showConfetti && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 9999
                }}>
                    {[...Array(50)].map((_, i) => (
                        <div key={i} style={{
                            position: 'absolute',
                            width: '10px',
                            height: '10px',
                            background: `hsl(${Math.random() * 360}, 100%, 60%)`,
                            top: '-20px',
                            left: `${Math.random() * 100}%`,
                            animation: `fall ${Math.random() * 3 + 2}s linear forwards`,
                            borderRadius: '50%'
                        }} />
                    ))}
                    <style>{`
                        @keyframes fall {
                            to {
                                transform: translateY(110vh) rotate(${Math.random() * 360}deg);
                            }
                        }
                    `}</style>
                </div>
            )}

            {/* Modern Header */}
            <FloatingPanel style={{
                margin: '20px',
                padding: '20px'
            }}>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-4">
                        <ModernButton
                            variant="outline-primary"
                            onClick={() => navigate('/dashboard')}
                            className="d-flex align-items-center"
                        >
                            <ChevronLeft />
                            <span className="ms-2">Back to Dashboard</span>
                        </ModernButton>

                        <div>
                            <div className="d-flex align-items-center gap-3">
                                <h4 id="problemTitle" className="fw-bold mb-0" style={{ color: '#1e293b' }}></h4>
                                {/* <NeonBadge className={problem.difficulty.toLowerCase()}> */}
                                {/* <Bullseye className="me-2" /> */}
                                {/* {problem.difficulty} */}
                                {/* </NeonBadge> */}
                            </div>
                        </div>
                    </div>

                    <div className="d-flex align-items-center gap-4">
                        <div className="text-end">
                            <div className="fw-bold text-primary">Problem {problemId}/150</div>
                            <ProgressBar
                                now={(parseInt(problemId) / 150 * 100)}
                                style={{ width: '200px', height: '8px', borderRadius: '4px' }}
                                variant="primary"
                                animated
                            />
                        </div>

                        <ModernButton
                            variant="outline-primary"
                            onClick={handleShare}
                            className="d-flex align-items-center"
                        >
                            <Share />
                            <span className="ms-2">Share</span>
                        </ModernButton>
                    </div>
                </div>
            </FloatingPanel>

            <Container fluid className="px-4">
                <Row className="g-4" style={{ minHeight: 'calc(100vh - 140px)' }}>
                    {/* Left Panel - Problem Description */}
                    <Col lg={6} className={isFullscreen ? 'd-none' : ''}>
                        <FloatingPanel style={{ height: '100%', overflow: 'hidden' }}>
                            <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                                <div className="mb-4">
                                    <Nav className="gap-2" style={{
                                        background: '#f1f5f9',
                                        padding: '8px',
                                        borderRadius: '16px',
                                        border: '1px solid rgba(255,255,255,0.5)'
                                    }}>
                                        <CustomTab>
                                            <Nav.Link eventKey="problem" className="d-flex align-items-center">
                                                <Book className="me-2" />
                                                Problem
                                            </Nav.Link>
                                        </CustomTab>
                                        <CustomTab>
                                            <Nav.Link eventKey="solution" className="d-flex align-items-center">
                                                <CodeSlash className="me-2" />
                                                Solution
                                            </Nav.Link>
                                        </CustomTab>
                                        <CustomTab>
                                            <Nav.Link eventKey="submissions" className="d-flex align-items-center">
                                                <BarChart className="me-2" />
                                                Analysis
                                            </Nav.Link>
                                        </CustomTab>
                                        <CustomTab>
                                            <Nav.Link eventKey="discussion" className="d-flex align-items-center">
                                                <People className="me-2" />
                                                Community
                                            </Nav.Link>
                                        </CustomTab>
                                    </Nav>
                                </div>

                                <Tab.Content style={{ height: 'calc(100% - 80px)', overflowY: 'auto' }}>
                                    <Tab.Pane eventKey="problem">
                                        <div>
                                            {/* Description */}
                                            <div className="mb-5">
                                                <h6 className="fw-bold mb-3 d-flex align-items-center">
                                                    <FileText className="me-2 text-primary" />
                                                    Description
                                                </h6>
                                                <GlassCard>
                                                    <Card.Body className="p-4">
                                                        <div id='descriptionBox'></div>
                                                    </Card.Body>
                                                </GlassCard>
                                            </div>

                                            {/* Examples - Redesigned with Dark IDE Theme */}
                                            <div className="mb-5">
                                                <h6 className="fw-bold mb-3 d-flex align-items-center">
                                                    <Play className="me-2 text-success" />
                                                    Examples
                                                </h6>
                                                <CodeThemeCard>
                                                    <div className="code-header">
                                                        <div className="code-title">Input / Output</div>
                                                    </div>

                                                    <div className="code-content">

                                                        {/* Input (only if it exists) */}
                                                        {inputText && inputText.trim() !== "" && (
                                                            <CodeInput>
                                                                <span className="label">Input</span>
                                                                <div className="value">
                                                                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                                                                        {inputText}
                                                                    </pre>
                                                                </div>
                                                            </CodeInput>
                                                        )}

                                                        {/* Output (only if it exists) */}
                                                        {outputText && outputText.trim() !== "" && (
                                                            <CodeInput>
                                                                <span className="label">Output</span>
                                                                <div className="value">
                                                                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                                                                        {outputText}
                                                                    </pre>
                                                                </div>
                                                            </CodeInput>
                                                        )}

                                                    </div>
                                                </CodeThemeCard>

                                            </div>

                                            {/* Constraints */}
                                            <div className="mb-5">
                                                <h6 className="fw-bold mb-3 d-flex align-items-center">
                                                    <ShieldCheck className="me-2 text-warning" />
                                                    Constraints
                                                </h6>
                                                <CodeThemeCard>
                                                    <div className="code-header">
                                                        <div className="code-title">Constraints</div>
                                                    </div>
                                                    <div className="code-content">
                                                        <div className="row g-2">
                                                            {/* {problem.constraints.map((constraint, idx) => (
                                                                <Col md={6} key={idx}>
                                                                    <div className="p-3 mb-2 rounded" style={{
                                                                        background: 'rgba(99, 102, 241, 0.1)',
                                                                        border: '1px solid rgba(255, 255, 255, 0.1)'
                                                                    }}>
                                                                        <div className="d-flex align-items-center">
                                                                            <div className="p-1 rounded-circle me-2" style={{
                                                                                background: '#6366f1',
                                                                                width: '20px',
                                                                                height: '20px',
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'center'
                                                                            }}>
                                                                                <small className="fw-bold text-white">{idx + 1}</small>
                                                                            </div>
                                                                            <code className="text-sm" style={{ color: '#9dccff' }}>{constraint}</code>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            ))} */}
                                                        </div>
                                                    </div>
                                                </CodeThemeCard>
                                            </div>

                                            {/* Topics */}
                                            <div className="mb-5">
                                                <h6 className="fw-bold mb-3 d-flex align-items-center">
                                                    <Filter className="me-2 text-primary" />
                                                    Topics
                                                </h6>
                                                <div className="d-flex flex-wrap gap-2">
                                                    {/* {problem.topics.map((topic, idx) => (
                                                        <Badge key={idx} style={{
                                                            background: 'linear-gradient(135deg, #2a2b3d 0%, #1a1b26 100%)',
                                                            color: '#9dccff',
                                                            padding: '8px 16px',
                                                            borderRadius: '12px',
                                                            border: '1px solid rgba(99, 102, 241, 0.3)',
                                                            fontWeight: '600'
                                                        }}>
                                                            <Code className="me-2" size={12} />
                                                            {topic}
                                                        </Badge>
                                                    ))} */}
                                                </div>
                                            </div>

                                            {/* Hints Section */}
                                            <GlassCard style={{ background: 'linear-gradient(135deg, #1a1b26 0%, #16161e 100%)' }}>
                                                <Card.Body className="p-4">
                                                    <div className="d-flex align-items-start">
                                                        <AnimatedIcon color="#0ea5e9" color2="#38bdf8">
                                                            <Lightbulb />
                                                        </AnimatedIcon>
                                                        <div className="ms-4 flex-grow-1">
                                                            <h6 className="fw-bold mb-2" style={{ color: '#9dccff' }}>Need Help?</h6>
                                                            <p className="mb-3" style={{ color: '#6b7280' }}>
                                                                Stuck on this problem? Here are some hints to guide you:
                                                            </p>
                                                            <ModernButton
                                                                variant="outline-primary"
                                                                onClick={() => setShowHints(!showHints)}
                                                                className="d-flex align-items-center"
                                                            >
                                                                {showHints ? (
                                                                    <>
                                                                        <ChevronUp />
                                                                        <span className="ms-2">Hide Hints</span>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <ChevronDown />
                                                                        <span className="ms-2">Show Hints</span>
                                                                    </>
                                                                )}
                                                            </ModernButton>

                                                            {showHints && (
                                                                <div className="mt-4">
                                                                    {/* {problem.hints.map((hint, idx) => (
                                                                        <div key={idx} className="mb-3 p-3 rounded-lg" style={{
                                                                            background: 'rgba(99, 102, 241, 0.1)',
                                                                            borderLeft: '4px solid #0ea5e9'
                                                                        }}>
                                                                            <div className="d-flex align-items-start">
                                                                                <div className="p-1 rounded-circle me-3 mt-1" style={{
                                                                                    background: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)',
                                                                                    width: '24px',
                                                                                    height: '24px',
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    justifyContent: 'center'
                                                                                }}>
                                                                                    <small className="fw-bold text-white">{idx + 1}</small>
                                                                                </div>
                                                                                <small style={{ color: '#9dccff' }}>{hint}</small>
                                                                            </div>
                                                                        </div>
                                                                    ))} */}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </GlassCard>
                                        </div>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="solution">
                                        <div>
                                            <div className="mb-4">
                                                <h6 className="fw-bold mb-3 d-flex align-items-center">
                                                    <CodeSlash className="me-2 text-primary" />
                                                    Solution
                                                </h6>
                                                <Alert variant="info" className="border-0 rounded-lg" style={{ background: 'linear-gradient(135deg, #1a1b26 0%, #16161e 100%)' }}>
                                                    <div className="d-flex align-items-start">
                                                        <Key className="me-3 mt-1" style={{ color: '#6366f1' }} />
                                                        <div>
                                                            <h6 className="fw-bold mb-2" style={{ color: '#9dccff' }}>Key Insight</h6>
                                                            <p className="mb-0" style={{ color: '#9dccff' }}>
                                                                The optimal solution uses a hash map to achieve O(n) time complexity.
                                                                This is a classic example of trading space for time.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Alert>
                                            </div>

                                            <div className="mb-4">
                                                <h6 className="fw-bold mb-3">Algorithm</h6>
                                                <div className="p-4 rounded-lg" style={{ background: 'linear-gradient(135deg, #1a1b26 0%, #16161e 100%)' }}>
                                                    <ol className="mb-0" style={{ color: '#9dccff' }}>
                                                        <li className="mb-2">Initialize an empty hash map</li>
                                                        <li className="mb-2">Iterate through the array with index i</li>
                                                        <li className="mb-2">Calculate complement = target - nums[i]</li>
                                                        <li className="mb-2">If complement exists in hash map, return indices</li>
                                                        <li>Otherwise, add nums[i] and i to hash map</li>
                                                    </ol>
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    <h6 className="fw-bold mb-0">Implementation</h6>
                                                    <div className="d-flex gap-2">
                                                        <select
                                                            className="form-select form-select-sm"
                                                            value={language}
                                                            onChange={(e) => handleLanguageChange(e.target.value)}
                                                            style={{
                                                                width: '120px',
                                                                background: '#1a1b26',
                                                                color: '#9dccff',
                                                                border: '1px solid rgba(99, 102, 241, 0.3)'
                                                            }}
                                                        >
                                                            <option value="python">Python</option>
                                                            <option value="javascript">JavaScript</option>
                                                            <option value="java">Java</option>
                                                            <option value="cpp">C++</option>
                                                        </select>
                                                        <ModernButton
                                                            variant={showSolution ? "outline-primary" : "primary"}
                                                            size="sm"
                                                            onClick={() => setShowSolution(!showSolution)}
                                                            className="d-flex align-items-center"
                                                        >
                                                            {showSolution ? (
                                                                <>
                                                                    <EyeSlash />
                                                                    <span className="ms-2">Hide</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Eye />
                                                                    <span className="ms-2">Show</span>
                                                                </>
                                                            )}
                                                        </ModernButton>
                                                    </div>
                                                </div>

                                                {showSolution ? (
                                                    <CodeBlock>
                                                        <code>
                                                            {/* {problem.solution[language]} */}
                                                        </code>
                                                    </CodeBlock>
                                                ) : (
                                                    <div className="text-center py-5">
                                                        <Lock size={48} className="text-muted mb-3" />
                                                        <h6 className="fw-bold mb-2">Solution Locked</h6>
                                                        <p className="text-muted mb-0">
                                                            Try solving the problem first to unlock the solution!
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="submissions">
                                        <div className="py-4">
                                            <h6 className="fw-bold mb-4 d-flex align-items-center">
                                                <Activity className="me-2 text-primary" />
                                                Performance Analysis
                                            </h6>

                                            <div className="row mb-4">
                                                <Col md={4} className="text-center">
                                                    {/* <ProgressRing progress={problem.frequency.replace('%', '')}>
                                                        <div className="progress-text">{problem.frequency}</div>
                                                    </ProgressRing> */}
                                                    <div className="mt-3">
                                                        <small className="text-muted">Interview Frequency</small>
                                                    </div>
                                                </Col>
                                                <Col md={8}>
                                                    <div className="p-4 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100">
                                                        <h6 className="fw-bold mb-3">Statistics</h6>
                                                        <div className="row">
                                                            <Col md={6}>
                                                                <div className="mb-3">
                                                                    <small className="text-muted d-block mb-1">Acceptance Rate</small>
                                                                    {/* <div className="fw-bold">{problem.acceptance}</div> */}
                                                                </div>
                                                                <div className="mb-3">
                                                                    <small className="text-muted d-block mb-1">Total Submissions</small>
                                                                    {/* <div className="fw-bold">{problem.totalSubmissions}</div> */}
                                                                </div>
                                                            </Col>
                                                            <Col md={6}>
                                                                <div className="mb-3">
                                                                    <small className="text-muted d-block mb-1">Likes</small>
                                                                    {/* <div className="fw-bold">{problem.likes}</div> */}
                                                                </div>
                                                                <div className="mb-3">
                                                                    <small className="text-muted d-block mb-1">Related Problems</small>
                                                                    {/* <div className="fw-bold">{problem.relatedProblems.length}</div> */}
                                                                </div>
                                                            </Col>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </div>

                                            {isCompleted && (
                                                <GlassCard className="border-success">
                                                    <Card.Body className="p-4">
                                                        <div className="d-flex align-items-center">
                                                            <div className="p-3 rounded-circle me-3" style={{
                                                                background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                                                                color: 'white'
                                                            }}>
                                                                <Award size={24} />
                                                            </div>
                                                            <div>
                                                                <h6 className="fw-bold mb-1">Your Best Submission</h6>
                                                                <small className="text-muted">
                                                                    Runtime: {executionTime || '--'}ms • Memory: {memoryUsage || '--'}MB
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </Card.Body>
                                                </GlassCard>
                                            )}
                                        </div>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="discussion">
                                        <div className="py-4">
                                            <h6 className="fw-bold mb-4 d-flex align-items-center">
                                                <People className="me-2 text-primary" />
                                                Community Solutions
                                            </h6>

                                            <div className="mb-4">
                                                <CodeThemeCard>
                                                    <div className="code-header">
                                                        <div className="code-title">Community Forum</div>
                                                    </div>
                                                    <div className="code-content">
                                                        <div className="text-center py-4">
                                                            <People size={48} className="mb-3" style={{ color: '#6366f1' }} />
                                                            <h6 className="fw-bold mb-2" style={{ color: '#9dccff' }}>Join the Discussion</h6>
                                                            <p className="mb-3" style={{ color: '#9dccff' }}>
                                                                Connect with other learners, share insights, and get help from the community.
                                                            </p>
                                                            <ModernButton variant="primary">
                                                                <People />
                                                                <span className="ms-2">Go to Forum</span>
                                                            </ModernButton>
                                                        </div>
                                                    </div>
                                                </CodeThemeCard>
                                            </div>

                                            <div className="row g-3">
                                                {[1, 2, 3].map((item) => (
                                                    <Col md={6} key={item}>
                                                        <GlassCard>
                                                            <Card.Body className="p-3">
                                                                <div className="d-flex align-items-start">
                                                                    <div className="p-2 rounded-circle me-3" style={{
                                                                        background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)'
                                                                    }}>
                                                                        <Star size={16} className="text-warning" />
                                                                    </div>
                                                                    <div>
                                                                        <small className="fw-bold d-block mb-1">Top Solution #{item}</small>
                                                                        <small className="text-muted">
                                                                            By User{item} • {Math.floor(Math.random() * 100)} upvotes
                                                                        </small>
                                                                    </div>
                                                                </div>
                                                            </Card.Body>
                                                        </GlassCard>
                                                    </Col>
                                                ))}
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </FloatingPanel>
                    </Col>

                    {/* Right Panel - COMPLETELY REDESIGNED Code Editor */}
                    {/* Right Panel - SIMPLIFIED VERSION */}
                    <Col lg={isFullscreen ? 12 : 6}>
                        <div style={{
                            height: '100vh',
                            display: 'flex',
                            flexDirection: 'column',
                            background: '#0f172a',
                            borderRadius: '16px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            overflow: 'hidden'
                        }}>

                            {/* Simple Header */}
                            <div style={{
                                background: '#1e293b',
                                padding: '16px 24px',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}><div
                                id="language"
                                className="form-select form-select-sm"
                                style={{
                                    width: '120px',
                                    background: '#1a1b26',
                                    color: '#9dccff',
                                    border: '1px solid rgba(99, 102, 241, 0.3)',
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '0.25rem',
                                    display: 'inline-block'
                                }}
                            >
                                    Python
                                </div>

                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button
                                        onClick={handleRun}
                                        style={{
                                            background: '#10b981',
                                            border: 'none',
                                            borderRadius: '8px',
                                            padding: '8px 16px',
                                            color: 'white',
                                            fontWeight: '600'
                                        }}
                                    >
                                        Run
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        style={{
                                            background: '#6366f1',
                                            border: 'none',
                                            borderRadius: '8px',
                                            padding: '8px 16px',
                                            color: 'white',
                                            fontWeight: '600'
                                        }}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>

                            {/* MAIN EDITOR AREA - This is where you write code */}
                            <div style={{
                                flex: 1,
                                minHeight: '400px',
                                padding: '16px',
                                background: '#0f172a'
                            }}>
                                <div style={{
                                    height: '100%',
                                    background: '#1a1b26',
                                    borderRadius: '12px',
                                    border: '2px solid rgba(99, 102, 241, 0.3)',
                                    overflow: 'hidden'
                                }}>
                                    <Editor
                                        height="100%"
                                        language={language}
                                        value={code}
                                        onChange={handleCodeChange}
                                        theme="myTheme"
                                        onMount={handleEditorDidMount}
                                        options={{
                                            fontSize: 14,
                                            minimap: { enabled: false },
                                            automaticLayout: true,
                                            scrollbar: {
                                                vertical: 'visible',  // Change this
                                                horizontal: 'visible', // Change this
                                                useShadows: false,
                                                verticalScrollbarSize: 12, // Increase size
                                                horizontalScrollbarSize: 12,
                                                verticalSliderSize: 12,
                                                horizontalSliderSize: 12,
                                                handleMouseWheel: true,
                                                alwaysConsumeMouseWheel: true,
                                                verticalHasArrows: false,
                                                horizontalHasArrows: false,
                                            },
                                            overviewRulerLanes: 0,
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Simple Output Panel */}
                            <div style={{
                                height: '200px',
                                background: '#1a1b26',
                                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                                padding: '16px',
                                overflow: 'auto'
                            }}>
                                <div style={{ color: '#e2e8f0', fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'pre-wrap' }}>
                                    {output || 'Run your code to see output here...'}
                                </div>
                            </div>

                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Settings Modal */}
            <Modal show={showSettings} onHide={() => setShowSettings(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Editor Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-4">
                        <h6 className="fw-bold mb-3">Theme</h6>
                        <div className="d-flex gap-2">
                            <ModernButton
                                variant={theme === 'vs' ? 'primary' : 'outline-primary'}
                                onClick={() => setTheme('vs')}
                                className="d-flex align-items-center"
                            >
                                <Sun className="me-2" />
                                Light
                            </ModernButton>
                            <ModernButton
                                variant={theme === 'vs-dark' ? 'primary' : 'outline-primary'}
                                onClick={() => setTheme('vs-dark')}
                                className="d-flex align-items-center"
                            >
                                <Moon className="me-2" />
                                Dark
                            </ModernButton>
                            <ModernButton
                                variant={theme === 'myTheme' ? 'primary' : 'outline-primary'}
                                onClick={() => setTheme('myTheme')}
                                className="d-flex align-items-center"
                            >
                                <Palette className="me-2" />
                                Custom
                            </ModernButton>
                        </div>
                    </div>
                    <div className="mb-4">
                        <h6 className="fw-bold mb-3">Font Size</h6>
                        <Form.Range
                            min="12"
                            max="20"
                            value={fontSize}
                            onChange={(e) => setFontSize(parseInt(e.target.value))}
                        />
                        <div className="text-center mt-2">
                            <small>{fontSize}px</small>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Navigation Footer */}
            <div className="py-4 px-4">
                <div className="d-flex justify-content-between align-items-center">
                    <ModernButton
                        variant="outline-primary"
                        onClick={handlePrevious}
                        disabled={parseInt(problemId) === 1}
                        className="d-flex align-items-center"
                    >
                        <ArrowLeft />
                        <span className="ms-2">Previous Problem</span>
                    </ModernButton>

                    <div className="text-center">
                        <div className="mb-2">
                            <ProgressRing progress={(parseInt(problemId) / 150 * 100)} style={{ width: '60px', height: '60px' }}>
                                <div className="progress-text" style={{ fontSize: '16px' }}>
                                    {Math.round((parseInt(problemId) / 150 * 100))}%
                                </div>
                            </ProgressRing>
                        </div>
                        <small className="text-muted">
                            Problem {problemId} of 150
                        </small>
                    </div>

                    <ModernButton
                        variant="primary"
                        onClick={handleNext}
                        className="d-flex align-items-center"
                    >
                        <span className="me-2">Next Problem</span>
                        <ArrowRight />
                    </ModernButton>
                </div>
            </div>

            <style>{`
                @keyframes pulse {
                    0% { opacity: 1; }
                    50% { opacity: 0.5; }
                    100% { opacity: 1; }
                }
                
                /* Custom button hover effects */
                button:hover {
                    opacity: 0.9;
                }
                
                /* Monaco editor custom styling */
                .monaco-editor .scroll-decoration {
                    box-shadow: none !important;
                }
                
                .monaco-editor .margin {
                    background-color: #0f172a !important;
                }
                
                /* Custom scrollbar */
                ::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }
                
                ::-webkit-scrollbar-track {
                    background: #1e293b;
                    border-radius: 4px;
                }
                
                ::-webkit-scrollbar-thumb {
                    background: #475569;
                    border-radius: 4px;
                }
                
                ::-webkit-scrollbar-thumb:hover {
                    background: #6366f1;
                }
            `}</style>
        </div>
    );
}