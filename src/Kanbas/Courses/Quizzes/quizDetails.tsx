import React, {useEffect, useState} from 'react';
import { format } from 'date-fns';
import {useNavigate, useParams} from "react-router-dom";
import {getQuiz} from "./client";
import "./details.css"
export type QuizDetailsType = {
    quizType: string,
    course: string,
    points: Number,
    assignmentGroup: string,
    shuffleAnswers: boolean,
    timeLimit: Number,
    multipleAttempts: boolean,
    showCorrectAnswers: boolean
    accessCode: string,
    oneQuestionAtATime: boolean,
    webcamRequired: boolean,
    lockQuestionsAfterAnswering: boolean,
    dueDate: Date,
    availableDate: Date,
    untilDate: Date,
    title: string,
    published: boolean
    description: string
}

const QuizDetails = () => {
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState<QuizDetailsType | null>(null);
    const [isPublished, setIsPublished] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuizDetails = async () => {
            try {
                const response = await getQuiz(String(quizId));
                setQuiz(response.data);
                setIsPublished(response.data.published);
            } catch (error) {
                console.error('Failed to fetch quiz details:', error);
            }
        };

        if (quizId) {
            fetchQuizDetails();
        }
    }, [quizId]);
    const handlePublish = () => {
        // Add ability to publish/unpublish
        setIsPublished(!isPublished);
    };

    const navigateToPreview = () => {
        // Code to navigate to Quiz Preview screen
    };

    const navigateToEditor = () => {
        navigate(`edit`);    };
    if (!quiz) {
        return <div>Loading...</div>; // Or some other loading state
    }
    const buttonClass = isPublished ? 'outline-danger' : 'outline-success';
    const titleClass = 'quiz-title';
    const detailsClass = 'quiz-details';
    const sectionClass = 'quiz-section';
    return (
        <div className="container quiz-container">
            <div className={titleClass}>
            <h1>{quiz.title}</h1>
            <div>
                <button className={`btn ${isPublished ? 'btn-danger' : 'btn-success'}`} onClick={handlePublish}>
                    {isPublished ? 'Unpublish' : 'Publish'}
                </button>
                <button className="btn btn-primary" onClick={navigateToPreview}>Preview</button>
                <button className="btn btn-secondary" onClick={navigateToEditor}>Edit</button>
            </div>
            </div>
            <div className={detailsClass}>
                <p>Quiz Type: {quiz.quizType}</p>
                <p>Points: {String(quiz.points)}</p>
                <p>Assignment Group: {quiz.assignmentGroup}</p>
                <p>Shuffle Answers: {quiz.shuffleAnswers ? 'Yes' : 'No'}</p>
                <p>Time Limit: {String(quiz.timeLimit) || 20} Minutes</p>
                <p>Multiple Attempts: {quiz.multipleAttempts ? 'Yes' : 'No'}</p>
                <p>Show Correct Answers: {quiz.showCorrectAnswers ? 'Yes' : 'No'}</p>
                <p>Access Code: {quiz.accessCode || ''}</p>
                <p>One Question at a Time: {quiz.oneQuestionAtATime ? 'Yes' : 'No'}</p>
                <p>Webcam Required: {quiz.webcamRequired ? 'Yes' : 'No'}</p>
                <p>Lock Questions After Answering: {quiz.lockQuestionsAfterAnswering ? 'Yes' : 'No'}</p>
                <p>Due date: {format(new Date(quiz.dueDate), 'MMM dd \'at\' p')}</p>
                <p>Available date: {format(new Date(quiz.availableDate), 'MMM dd \'at\' p')}</p>
                <p>Until date: {format(new Date(quiz.untilDate), 'MMM dd \'at\' p')}</p>
            </div>
        </div>
    );
};

export default QuizDetails;