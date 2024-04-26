import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { getQuiz } from './client';
import {QuizDetailsType} from "./quizDetails";

const QuizPreview = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [quiz, setQuiz] = useState<QuizDetailsType | null>(null);

    useEffect(() => {
        // Fetch the quiz data on component mount
        const fetchQuiz = async () => {
            try {
                if (quizId) {
                    const response = await getQuiz(quizId);
                    setQuiz(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch quiz:', error);
            }
        };

        fetchQuiz();
    }, [quizId]);

    const handleNextQuestion = () => {
        if (quiz) {
            setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, quiz.questions.length - 1));
        }
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleBackToEdit = () => {
        navigate(`../quiz-details/${quizId}/edit`);
    };

    if (!quiz) {
        return <div>Loading...</div>; // Or some other loading state or error message
    }

    const { questions } = quiz;
    const currentQuestion = questions[currentQuestionIndex];
    if (!quiz) {
        return <h1> No Quiz Found</h1>
    }

    return (
        <div className="quiz-preview-container">
            <h1>{quiz.title}</h1>
            <div className="question-card">
                <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
                <p>{currentQuestion.text}</p>
                {/* Render options or input for answer based on question type */}
                {/* This is just a placeholder, you need to replace this with your actual question rendering logic */}
                <Form.Group>
                    {currentQuestion.choices && currentQuestion.choices.map((choice, index) => (
                        <Form.Check
                            type="radio"
                            label={choice}
                            name="questionOptions"
                            key={index}
                        />
                    ))}
                </Form.Group>
            </div>
            <div className="navigation-buttons">
                {currentQuestionIndex > 0 && (
                    <Button onClick={handlePreviousQuestion}>Previous</Button>
                )}
                {currentQuestionIndex < questions.length - 1 && (
                    <Button onClick={handleNextQuestion}>Next</Button>
                )}
                <Button variant="secondary" onClick={handleBackToEdit}>
                    Back to Edit
                </Button>
            </div>
        </div>
    );
};

export default QuizPreview;
