import React, { useEffect, useState } from 'react';
import { createQuiz, updateQuiz, getQuizzesWithCourseId, deleteQuiz } from './client';
import { useNavigate, useParams} from 'react-router-dom';
import {FaCheckCircle, FaEllipsisV, FaPencilAlt, FaRegClock, FaTrashAlt} from 'react-icons/fa';

import { format } from 'date-fns';
import { Dropdown } from 'react-bootstrap';
import {QuizDetailsType} from "./quizDetails";


const QuizList = () => {
    const {courseId} = useParams();

    const [quizzes, setQuizzes] = useState<any[]>([]);
    const navigate = useNavigate()
    useEffect(() => {
        fetchQuizzes();
    }, [courseId]);

    const fetchQuizzes = async () => {
        try {
            const result = await getQuizzesWithCourseId(String(courseId));
            console.log(result.data)
            setQuizzes(result.data);
        } catch (error) {
            console.error('Failed to fetch quizzes:', error);
        }
    };

    const handleCreate = async () => {
        try {
            const newQuizData: QuizDetailsType = {
                accessCode: "",
                assignmentGroup: "Quizzes",
                availableDate: new Date(),
                course: "",
                description: "",
                dueDate: new Date(),
                lockQuestionsAfterAnswering: false,
                multipleAttempts: false,
                oneQuestionAtATime: true,
                points: 0,
                published: false,
                questions: [],
                quizType: "Graded Quiz",
                showCorrectAnswers: false,
                shuffleAnswers: true,
                timeLimit: 20,
                title: "New",
                untilDate: new Date(),
                webcamRequired: false
            };
            const res =await createQuiz(String(courseId), newQuizData);
            navigate('quiz-details/'+ res.data._id)
            fetchQuizzes(); // Refresh the list after creation
        } catch (error) {
            console.error('Failed to create quiz:', error);
        }
    };

    const handlePublish= async (quizId: any) => {
        try {
            const quizToUpdate = quizzes.find((q) => q.id === quizId);

            if (!quizToUpdate) {
                console.error('Quiz not found');
                return;
            }
            const updatedQuiz = {
                ...quizToUpdate,
                published: !quizToUpdate.published
            };
            await updateQuiz(quizId, updatedQuiz);
            fetchQuizzes(); // Refresh the list after updating
        } catch (error) {
            console.error('Failed to update quiz:', error);
        }
    };
    const getAvailabilityStatus = (quiz: QuizDetailsType) => {
        const now = new Date();
        const availableDate = new Date(quiz.availableDate);
        const untilDate = new Date(quiz.untilDate);

        if (now < availableDate) {
            return `Not available until ${formatDate(quiz.availableDate.toString())}`;
        } else if (now >= availableDate && now <= untilDate) {
            return 'Available';
        } else if (now > untilDate) {
            return 'Closed';
        } else {
            return 'Unavailable'; // Fallback status
        }
    };
    const handleDelete = async (quizId: any) => {
        try {
            await deleteQuiz(quizId);
            fetchQuizzes(); // Refresh the list after deletion
        } catch (error) {
            console.error('Failed to delete quiz:', error);
        }
    };
    const formatDate = (dateString: string) => {
        console.log(dateString)
        if (!dateString) {
            return
        }
        // Format the date to a more readable format, e.g., Mar 18 at 12:00am
        return format(new Date(dateString), 'MMM dd \'at\' p');
    };
    const navigateToQuizDetails = (quizId: any) => {

        navigate(`quiz-details/${quizId}`);
    };
    // @ts-ignore
    return (
        <div>
            <button className="btn btn-success mb-3" onClick={handleCreate}>Create Quiz</button>
            <ul className="list-group">
                {quizzes.map((quiz) => (
                    <li key={quiz._id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="me-3" onClick={() => navigateToQuizDetails(quiz._id)}>
                            <FaRegClock className="text-secondary" />
                            <span className="ms-2">{quiz.title}</span>
                        </div>

                        <div className="flex-grow-1">
                            <strong>Due {formatDate(quiz.dueDate)}</strong><br />
                            <small>{quiz.points} Points</small><br />
                            <small> {getAvailabilityStatus(quiz) }</small>
                            <small> {quiz.questions?.length || 0} Questions </small>
                        </div>
                        <div className="text-right">
                            {quiz.published ? <FaCheckCircle className="text-success" /> : null}
                        </div>
                        <Dropdown>
                            <Dropdown.Toggle variant="light" id="dropdown-basic">
                                <FaEllipsisV />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => navigateToQuizDetails(quiz._id)}>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleDelete(quiz._id)}>Delete</Dropdown.Item>
                                <Dropdown.Item onClick={() => handlePublish(quiz._id)}>Publish</Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default QuizList;
