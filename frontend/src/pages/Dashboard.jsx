// pages/LearningPath.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Modal, ProgressBar, Alert, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
import { SiCplusplus } from 'react-icons/si'; // This one should work if you have react-icons installed
// OR use react-icons/fa for C++ if SiCplusplus doesn't work
import { FaCuttlefish } from 'react-icons/fa'; // Alternative for C++

import styled from 'styled-components';

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

export function Dashboard() {
    const [enrolled, setEnrolled] = useState(false);
    const [showEnrollModal, setShowEnrollModal] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [expandedFolders, setExpandedFolders] = useState([]);
    const [completedProblems, setCompletedProblems] = useState(new Set());
    const [selectedPhase, setSelectedPhase] = useState(null);
    const [showLanguageSelection, setShowLanguageSelection] = useState(false);
    const [userStats, setUserStats] = useState({
        totalSolved: 0,
        phaseProgress: {},
        streak: 0,
        accuracy: 0,
        estimatedCompletion: '14 weeks'
    });

    // Introduction paragraphs
    const introduction = {
        overview: "Welcome to the Beginner's Journey – a carefully crafted 150-problem learning path designed specifically for 1st and 2nd year Computer Science students. This comprehensive program transforms beginners into confident problem-solvers through structured, incremental learning.",
        benefits: [
            "Master essential data structures and algorithms from ground up",
            "Build strong problem-solving intuition through curated practice",
            "Develop coding fluency in your chosen programming language",
            "Prepare for technical interviews with industry-relevant problems",
            "Join a community of 2500+ students on the same journey"
        ],
        methodology: "Our pedagogical approach follows the 'Learn-Practice-Apply' cycle. Each phase introduces new concepts through carefully selected problems that build upon previous knowledge. The path progresses from basic arrays to complex data structures, ensuring solid fundamentals."
    };

    // Complete task list as file structure
    const fileStructure = {
        name: "beginner-journey",
        type: "root",
        children: [
            {
                name: "Phase 1: Arrays & Strings Basics",
                type: "phase",
                id: "phase1",
                problems: 35,
                description: "Master the fundamentals",
                color: "#4A6FFF",
                icon: <Book />,
                children: [
                    {
                        name: "Easy Arrays (15 problems)",
                        type: "module",
                        problems: 15,
                        children: [
                            { name: "Two Sum", type: "problem", difficulty: "easy", id: "p1-1" },
                            { name: "Find Maximum in Array", type: "problem", difficulty: "easy", id: "p1-2" },
                            { name: "Find Minimum in Array", type: "problem", difficulty: "easy", id: "p1-3" },
                            { name: "Reverse an Array", type: "problem", difficulty: "easy", id: "p1-4" },
                            { name: "Check if Array is Sorted", type: "problem", difficulty: "easy", id: "p1-5" },
                            { name: "Remove Duplicates from Sorted Array", type: "problem", difficulty: "easy", id: "p1-6" },
                            { name: "Find Second Largest Element", type: "problem", difficulty: "easy", id: "p1-7" },
                            { name: "Move Zeros to End", type: "problem", difficulty: "easy", id: "p1-8" },
                            { name: "Missing Number in Array", type: "problem", difficulty: "easy", id: "p1-9" },
                            { name: "Find Single Number", type: "problem", difficulty: "easy", id: "p1-10" },
                            { name: "Merge Two Sorted Arrays", type: "problem", difficulty: "easy", id: "p1-11" },
                            { name: "Intersection of Two Arrays", type: "problem", difficulty: "easy", id: "p1-12" },
                            { name: "Union of Two Arrays", type: "problem", difficulty: "easy", id: "p1-13" },
                            { name: "Rotate Array by K positions", type: "problem", difficulty: "easy", id: "p1-14" },
                            { name: "Check if Array is Palindrome", type: "problem", difficulty: "easy", id: "p1-15" }
                        ]
                    },
                    {
                        name: "Easy Strings (15 problems)",
                        type: "module",
                        problems: 15,
                        children: [
                            { name: "Reverse a String", type: "problem", difficulty: "easy", id: "p1-16" },
                            { name: "Check if String is Palindrome", type: "problem", difficulty: "easy", id: "p1-17" },
                            { name: "Count Vowels in String", type: "problem", difficulty: "easy", id: "p1-18" },
                            { name: "Count Consonants in String", type: "problem", difficulty: "easy", id: "p1-19" },
                            { name: "First Unique Character in String", type: "problem", difficulty: "easy", id: "p1-20" },
                            { name: "Check if Two Strings are Anagrams", type: "problem", difficulty: "easy", id: "p1-21" },
                            { name: "Remove Spaces from String", type: "problem", difficulty: "easy", id: "p1-22" },
                            { name: "Count Words in String", type: "problem", difficulty: "easy", id: "p1-23" },
                            { name: "Convert String to Uppercase", type: "problem", difficulty: "easy", id: "p1-24" },
                            { name: "Convert String to Lowercase", type: "problem", difficulty: "easy", id: "p1-25" },
                            { name: "Check if String Contains Only Digits", type: "problem", difficulty: "easy", id: "p1-26" },
                            { name: "Find Length of String", type: "problem", difficulty: "easy", id: "p1-27" },
                            { name: "Compare Two Strings", type: "problem", difficulty: "easy", id: "p1-28" },
                            { name: "Count Occurrences of Character", type: "problem", difficulty: "easy", id: "p1-29" },
                            { name: "Remove Duplicate Characters", type: "problem", difficulty: "easy", id: "p1-30" }
                        ]
                    },
                    {
                        name: "Mixed Easy (5 problems)",
                        type: "module",
                        problems: 5,
                        children: [
                            { name: "Valid Parentheses", type: "problem", difficulty: "easy", id: "p1-31" },
                            { name: "Longest Common Prefix", type: "problem", difficulty: "easy", id: "p1-32" },
                            { name: "Roman to Integer", type: "problem", difficulty: "easy", id: "p1-33" },
                            { name: "Plus One", type: "problem", difficulty: "easy", id: "p1-34" },
                            { name: "Pascal's Triangle", type: "problem", difficulty: "easy", id: "p1-35" }
                        ]
                    }
                ]
            },
            {
                name: "Phase 2: Basic Data Structures",
                type: "phase",
                id: "phase2",
                problems: 40,
                description: "Stacks, Queues, Linked Lists",
                color: "#00C9A7",
                icon: <Cpu />,
                children: [
                    {
                        name: "Stack Problems (10 problems)",
                        type: "module",
                        problems: 10,
                        children: [
                            { name: "Implement Stack using Array", type: "problem", difficulty: "medium", id: "p2-1" },
                            { name: "Implement Stack using Linked List", type: "problem", difficulty: "medium", id: "p2-2" },
                            { name: "Valid Parentheses", type: "problem", difficulty: "medium", id: "p2-3" },
                            { name: "Next Greater Element", type: "problem", difficulty: "medium", id: "p2-4" },
                            { name: "Min Stack", type: "problem", difficulty: "medium", id: "p2-5" },
                            { name: "Evaluate Postfix Expression", type: "problem", difficulty: "medium", id: "p2-6" },
                            { name: "Infix to Postfix Conversion", type: "problem", difficulty: "medium", id: "p2-7" },
                            { name: "Reverse String using Stack", type: "problem", difficulty: "medium", id: "p2-8" },
                            { name: "Check Balanced Brackets", type: "problem", difficulty: "medium", id: "p2-9" },
                            { name: "Stack with Get Middle Element", type: "problem", difficulty: "medium", id: "p2-10" }
                        ]
                    },
                    {
                        name: "Queue Problems (10 problems)",
                        type: "module",
                        problems: 10,
                        children: [
                            { name: "Implement Queue using Array", type: "problem", difficulty: "medium", id: "p2-11" },
                            { name: "Implement Queue using Linked List", type: "problem", difficulty: "medium", id: "p2-12" },
                            { name: "Implement Stack using Two Queues", type: "problem", difficulty: "medium", id: "p2-13" },
                            { name: "Implement Queue using Two Stacks", type: "problem", difficulty: "medium", id: "p2-14" },
                            { name: "Circular Queue Implementation", type: "problem", difficulty: "medium", id: "p2-15" },
                            { name: "First Non-Repeating Character", type: "problem", difficulty: "medium", id: "p2-16" },
                            { name: "Generate Binary Numbers", type: "problem", difficulty: "medium", id: "p2-17" },
                            { name: "Reverse First K Elements of Queue", type: "problem", difficulty: "medium", id: "p2-18" },
                            { name: "Check if Queue is Palindrome", type: "problem", difficulty: "medium", id: "p2-19" },
                            { name: "Priority Queue", type: "problem", difficulty: "medium", id: "p2-20" }
                        ]
                    },
                    {
                        name: "Linked List Problems (20 problems)",
                        type: "module",
                        problems: 20,
                        children: [
                            { name: "Create a Linked List Node", type: "problem", difficulty: "medium", id: "p2-21" },
                            { name: "Insert at Beginning", type: "problem", difficulty: "medium", id: "p2-22" },
                            { name: "Insert at End", type: "problem", difficulty: "medium", id: "p2-23" },
                            { name: "Insert at Position", type: "problem", difficulty: "medium", id: "p2-24" },
                            { name: "Delete from Beginning", type: "problem", difficulty: "medium", id: "p2-25" },
                            { name: "Delete from End", type: "problem", difficulty: "medium", id: "p2-26" },
                            { name: "Delete at Position", type: "problem", difficulty: "medium", id: "p2-27" },
                            { name: "Reverse a Linked List", type: "problem", difficulty: "medium", id: "p2-28" },
                            { name: "Find Middle of Linked List", type: "problem", difficulty: "medium", id: "p2-29" },
                            { name: "Detect Cycle in Linked List", type: "problem", difficulty: "medium", id: "p2-30" },
                            { name: "Remove Duplicates from Sorted List", type: "problem", difficulty: "medium", id: "p2-31" },
                            { name: "Merge Two Sorted Lists", type: "problem", difficulty: "medium", id: "p2-32" },
                            { name: "Remove Nth Node from End", type: "problem", difficulty: "medium", id: "p2-33" },
                            { name: "Check if Linked List is Palindrome", type: "problem", difficulty: "medium", id: "p2-34" },
                            { name: "Intersection of Two Linked Lists", type: "problem", difficulty: "medium", id: "p2-35" },
                            { name: "Add Two Numbers", type: "problem", difficulty: "medium", id: "p2-36" },
                            { name: "Rotate Linked List", type: "problem", difficulty: "medium", id: "p2-37" },
                            { name: "Clone Linked List with Random Pointer", type: "problem", difficulty: "medium", id: "p2-38" },
                            { name: "Flatten a Linked List", type: "problem", difficulty: "medium", id: "p2-39" },
                            { name: "Swap Nodes in Pairs", type: "problem", difficulty: "medium", id: "p2-40" }
                        ]
                    }
                ]
            },
            {
                name: "Phase 3: Searching & Sorting",
                type: "phase",
                id: "phase3",
                problems: 35,
                description: "Essential algorithms",
                color: "#FFB800",
                icon: <Search />,
                children: [
                    {
                        name: "Binary Search (10 problems)",
                        type: "module",
                        problems: 10,
                        children: [
                            { name: "Binary Search (iterative)", type: "problem", difficulty: "medium", id: "p3-1" },
                            { name: "Binary Search (recursive)", type: "problem", difficulty: "medium", id: "p3-2" },
                            { name: "First Occurrence in Sorted Array", type: "problem", difficulty: "medium", id: "p3-3" },
                            { name: "Last Occurrence in Sorted Array", type: "problem", difficulty: "medium", id: "p3-4" },
                            { name: "Count Occurrences in Sorted Array", type: "problem", difficulty: "medium", id: "p3-5" },
                            { name: "Search in Rotated Sorted Array", type: "problem", difficulty: "medium", id: "p3-6" },
                            { name: "Find Peak Element", type: "problem", difficulty: "medium", id: "p3-7" },
                            { name: "Search Insert Position", type: "problem", difficulty: "medium", id: "p3-8" },
                            { name: "Find Minimum in Rotated Sorted Array", type: "problem", difficulty: "medium", id: "p3-9" },
                            { name: "Square Root using Binary Search", type: "problem", difficulty: "medium", id: "p3-10" }
                        ]
                    },
                    {
                        name: "Sorting Algorithms (15 problems)",
                        type: "module",
                        problems: 15,
                        children: [
                            { name: "Bubble Sort", type: "problem", difficulty: "medium", id: "p3-11" },
                            { name: "Selection Sort", type: "problem", difficulty: "medium", id: "p3-12" },
                            { name: "Insertion Sort", type: "problem", difficulty: "medium", id: "p3-13" },
                            { name: "Merge Sort", type: "problem", difficulty: "medium", id: "p3-14" },
                            { name: "Quick Sort", type: "problem", difficulty: "medium", id: "p3-15" },
                            { name: "Counting Sort", type: "problem", difficulty: "medium", id: "p3-16" },
                            { name: "Heap Sort", type: "problem", difficulty: "medium", id: "p3-17" },
                            { name: "Sort Array by Parity", type: "problem", difficulty: "medium", id: "p3-18" },
                            { name: "Sort Colors", type: "problem", difficulty: "medium", id: "p3-19" },
                            { name: "Merge Intervals", type: "problem", difficulty: "medium", id: "p3-20" },
                            { name: "Insert Interval", type: "problem", difficulty: "medium", id: "p3-21" },
                            { name: "Meeting Rooms", type: "problem", difficulty: "medium", id: "p3-22" },
                            { name: "Largest Number", type: "problem", difficulty: "medium", id: "p3-23" },
                            { name: "Kth Largest Element", type: "problem", difficulty: "medium", id: "p3-24" },
                            { name: "Top K Frequent Elements", type: "problem", difficulty: "medium", id: "p3-25" }
                        ]
                    },
                    {
                        name: "Two Pointer Technique (10 problems)",
                        type: "module",
                        problems: 10,
                        children: [
                            { name: "Two Sum (sorted array)", type: "problem", difficulty: "medium", id: "p3-26" },
                            { name: "Three Sum", type: "problem", difficulty: "medium", id: "p3-27" },
                            { name: "Four Sum", type: "problem", difficulty: "medium", id: "p3-28" },
                            { name: "Container With Most Water", type: "problem", difficulty: "medium", id: "p3-29" },
                            { name: "Remove Duplicates from Sorted Array II", type: "problem", difficulty: "medium", id: "p3-30" },
                            { name: "Move Zeroes", type: "problem", difficulty: "medium", id: "p3-31" },
                            { name: "Valid Palindrome", type: "problem", difficulty: "medium", id: "p3-32" },
                            { name: "Reverse Words in String", type: "problem", difficulty: "medium", id: "p3-33" },
                            { name: "Trapping Rain Water", type: "problem", difficulty: "hard", id: "p3-34" },
                            { name: "Sort Array by Parity II", type: "problem", difficulty: "medium", id: "p3-35" }
                        ]
                    }
                ]
            },
            {
                name: "Phase 4: Hash Tables & Basics of Trees",
                type: "phase",
                id: "phase4",
                problems: 40,
                description: "Advanced fundamentals",
                color: "#FF6B6B",
                icon: <Bullseye />,
                children: [
                    {
                        name: "Hash Tables / HashMaps (15 problems)",
                        type: "module",
                        problems: 15,
                        children: [
                            { name: "Contains Duplicate", type: "problem", difficulty: "easy", id: "p4-1" },
                            { name: "Valid Anagram", type: "problem", difficulty: "easy", id: "p4-2" },
                            { name: "Two Sum (using HashMap)", type: "problem", difficulty: "easy", id: "p4-3" },
                            { name: "Group Anagrams", type: "problem", difficulty: "medium", id: "p4-4" },
                            { name: "Intersection of Two Arrays II", type: "problem", difficulty: "easy", id: "p4-5" },
                            { name: "Happy Number", type: "problem", difficulty: "easy", id: "p4-6" },
                            { name: "Isomorphic Strings", type: "problem", difficulty: "medium", id: "p4-7" },
                            { name: "Word Pattern", type: "problem", difficulty: "easy", id: "p4-8" },
                            { name: "First Unique Character", type: "problem", difficulty: "easy", id: "p4-9" },
                            { name: "Longest Substring Without Repeating Characters", type: "problem", difficulty: "medium", id: "p4-10" },
                            { name: "Subarray Sum Equals K", type: "problem", difficulty: "medium", id: "p4-11" },
                            { name: "Continuous Subarray Sum", type: "problem", difficulty: "medium", id: "p4-12" },
                            { name: "Find All Anagrams in String", type: "problem", difficulty: "medium", id: "p4-13" },
                            { name: "Minimum Window Substring", type: "problem", difficulty: "hard", id: "p4-14" },
                            { name: "Longest Consecutive Sequence", type: "problem", difficulty: "medium", id: "p4-15" }
                        ]
                    },
                    {
                        name: "Basic Tree Problems (15 problems)",
                        type: "module",
                        problems: 15,
                        children: [
                            { name: "Binary Tree Node Structure", type: "problem", difficulty: "easy", id: "p4-16" },
                            { name: "Insert into Binary Search Tree", type: "problem", difficulty: "medium", id: "p4-17" },
                            { name: "Search in Binary Search Tree", type: "problem", difficulty: "medium", id: "p4-18" },
                            { name: "Delete from Binary Search Tree", type: "problem", difficulty: "medium", id: "p4-19" },
                            { name: "Inorder Traversal (iterative)", type: "problem", difficulty: "medium", id: "p4-20" },
                            { name: "Preorder Traversal (iterative)", type: "problem", difficulty: "medium", id: "p4-21" },
                            { name: "Postorder Traversal (iterative)", type: "problem", difficulty: "medium", id: "p4-22" },
                            { name: "Level Order Traversal", type: "problem", difficulty: "medium", id: "p4-23" },
                            { name: "Maximum Depth of Binary Tree", type: "problem", difficulty: "easy", id: "p4-24" },
                            { name: "Minimum Depth of Binary Tree", type: "problem", difficulty: "easy", id: "p4-25" },
                            { name: "Symmetric Tree", type: "problem", difficulty: "easy", id: "p4-26" },
                            { name: "Invert Binary Tree", type: "problem", difficulty: "easy", id: "p4-27" },
                            { name: "Path Sum", type: "problem", difficulty: "easy", id: "p4-28" },
                            { name: "Binary Tree Paths", type: "problem", difficulty: "easy", id: "p4-29" },
                            { name: "Same Tree", type: "problem", difficulty: "easy", id: "p4-30" }
                        ]
                    },
                    {
                        name: "Basic Recursion (10 problems)",
                        type: "module",
                        problems: 10,
                        children: [
                            { name: "Factorial", type: "problem", difficulty: "easy", id: "p4-31" },
                            { name: "Fibonacci Number", type: "problem", difficulty: "easy", id: "p4-32" },
                            { name: "Power of Number", type: "problem", difficulty: "easy", id: "p4-33" },
                            { name: "Sum of Natural Numbers", type: "problem", difficulty: "easy", id: "p4-34" },
                            { name: "Reverse a String (recursive)", type: "problem", difficulty: "easy", id: "p4-35" },
                            { name: "Check Palindrome (recursive)", type: "problem", difficulty: "easy", id: "p4-36" },
                            { name: "Sum of Array (recursive)", type: "problem", difficulty: "easy", id: "p4-37" },
                            { name: "Print 1 to N (recursive)", type: "problem", difficulty: "easy", id: "p4-38" },
                            { name: "Tower of Hanoi", type: "problem", difficulty: "medium", id: "p4-39" },
                            { name: "Generate Parentheses", type: "problem", difficulty: "medium", id: "p4-40" }
                        ]
                    }
                ]
            }
        ]
    };

    const stats = {
        totalProblems: 150,
        totalPhases: 4,
        totalModules: 12,
        enrolledStudents: 2543,
        completionRate: '89%',
        avgPlacement: '78%',
        avgTime: '14 weeks'
    };

    const languages = [
        { id: 'python', name: 'Python', color: '#3776AB', logo: <FaPython />, description: 'Recommended for beginners' },
        { id: 'javascript', name: 'JavaScript', color: '#F7DF1E', logo: <FaJsSquare />, description: 'Web development focus' },
        { id: 'java', name: 'Java', color: '#007396', logo: <FaJava />, description: 'Enterprise applications' },
        { id: 'cpp', name: 'C++', color: '#00599C', logo: <FaCuttlefish />, description: 'Performance critical' }
    ];

    // Calculate progress
    const calculateProgress = () => {
        const totalProblems = stats.totalProblems;
        const solved = completedProblems.size;
        const percentage = totalProblems > 0 ? Math.round((solved / totalProblems) * 100) : 0;
        
        // Calculate phase progress
        const phaseProgress = {};
        fileStructure.children.forEach(phase => {
            const phaseProblems = getAllProblems(phase);
            const solvedInPhase = phaseProblems.filter(p => completedProblems.has(p.id)).length;
            phaseProgress[phase.id] = {
                solved: solvedInPhase,
                total: phaseProblems.length,
                percentage: phaseProblems.length > 0 ? Math.round((solvedInPhase / phaseProblems.length) * 100) : 0
            };
        });

        setUserStats(prev => ({
            ...prev,
            totalSolved: solved,
            phaseProgress,
            streak: Math.floor(solved / 3), // Mock streak calculation
            accuracy: solved > 0 ? Math.min(95, Math.floor(Math.random() * 20) + 80) : 0,
            estimatedCompletion: calculateCompletionTime(solved, totalProblems)
        }));
    };

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

    const calculateCompletionTime = (solved, total) => {
        const remaining = total - solved;
        const days = Math.ceil(remaining / 3); // Assuming 3 problems per day
        if (days < 7) return `${days} days`;
        if (days < 30) return `${Math.ceil(days / 7)} weeks`;
        return `${Math.ceil(days / 30)} months`;
    };

    // Tasks done in short (mock data for demonstration)
    const recentAchievements = [
        { id: 1, type: 'problem', name: 'Two Sum', time: '2 hours ago', phase: 'Phase 1', icon: <FileEarmarkCode className="text-primary" /> },
        { id: 2, type: 'module', name: 'Easy Arrays', time: '1 day ago', progress: '15/15 problems', icon: <FileEarmarkText className="text-success" /> },
        { id: 3, type: 'streak', name: '3-day streak', time: 'Today', icon: <Trophy className="text-warning" /> },
        { id: 4, type: 'milestone', name: '50 problems solved', time: '2 days ago', icon: <Award className="text-info" /> }
    ];

    useEffect(() => {
        calculateProgress();
    }, [completedProblems]);

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

    const confirmEnroll = () => {
        setEnrolled(true);
        setShowEnrollModal(false);
        // Expand first phase by default
        setExpandedFolders(['phase1']);
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
                                        <Bullseye  className="me-3 text-primary" />
                                        Phase Progress
                                    </h5>
                                    {fileStructure.children.map(phase => {
                                        const progress = userStats.phaseProgress[phase.id] || { percentage: 0, solved: 0, total: phase.problems };
                                        return (
                                            <div key={phase.id} className="mb-3">
                                                <div className="d-flex justify-content-between mb-1">
                                                    <small>{phase.name}</small>
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
                                {renderFileStructure(fileStructure.children)}
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
                                                    {totalSolved === 0 ? 'Start with Phase 1: Arrays & Strings Basics' :
                                                     totalSolved < 35 ? 'Continue with Phase 1' :
                                                     totalSolved < 75 ? 'Move to Phase 2: Data Structures' :
                                                     totalSolved < 110 ? 'Progress to Phase 3: Searching & Sorting' :
                                                     'Complete Phase 4: Advanced Fundamentals'}
                                                </h6>
                                                <p className="mb-0">
                                                    {totalSolved === 0 ? 'Begin with "Two Sum" to build your foundation in array manipulation.' :
                                                     totalSolved < 35 ? 'Keep building momentum with easy array and string problems.' :
                                                     totalSolved < 75 ? 'Start learning data structures with stack and queue implementations.' :
                                                     totalSolved < 110 ? 'Master essential algorithms like binary search and sorting.' :
                                                     'Finish strong with hash tables and tree fundamentals.'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center mt-4">
                                        <Link to="/problem/phase1/1">
                                            <Button variant="primary" size="lg" className="px-5">
                                                <Play className="me-2" />
                                                {totalSolved === 0 ? 'Begin Learning Path' : 'Continue Solving'}
                                            </Button>
                                        </Link>
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
                                Beginner's Journey: 150 Problems
                            </h1>
                            <p className="lead mb-4" style={{ fontSize: '1.25rem' }}>
                                A complete structured path to build strong coding fundamentals.
                                Master arrays, strings, data structures, algorithms, and problem-solving patterns.
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
                                <div className="mb-3">
                                    <div className="d-flex justify-content-between mb-1">
                                        <small>Phase 1: Arrays & Strings</small>
                                        <small>0/35 problems</small>
                                    </div>
                                    <ProgressBar now={0} variant="primary" style={{ height: '8px' }} />
                                </div>
                                <div className="mb-3">
                                    <div className="d-flex justify-content-between mb-1">
                                        <small>Phase 2: Data Structures</small>
                                        <small>0/40 problems</small>
                                    </div>
                                    <ProgressBar now={0} variant="success" style={{ height: '8px' }} />
                                </div>
                                <div className="mb-3">
                                    <div className="d-flex justify-content-between mb-1">
                                        <small>Phase 3: Algorithms</small>
                                        <small>0/35 problems</small>
                                    </div>
                                    <ProgressBar now={0} variant="warning" style={{ height: '8px' }} />
                                </div>
                                <div>
                                    <div className="d-flex justify-content-between mb-1">
                                        <small>Phase 4: Advanced Fundamentals</small>
                                        <small>0/40 problems</small>
                                    </div>
                                    <ProgressBar now={0} variant="danger" style={{ height: '8px' }} />
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                {/* File Structure Visualization */}
                <div className="mb-5">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold mb-3">Complete Task List Structure</h2>
                        <p className="text-muted">Explore all 150 problems organized in a file structure</p>
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
                                {renderFileStructure(fileStructure.children)}
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
                        <h4 className="fw-bold mb-2">Beginner's Journey: 150 Problems</h4>
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
                                    <li>Access to all 150 problems with solutions</li>
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