import React, { useEffect, useState } from 'react';
import { createQuiz, updateQuiz, getQuizzesWithCourseId, deleteQuiz } from './client';
import { useNavigate, useParams} from 'react-router-dom';
import {FaCheckCircle, FaEllipsisV, FaPencilAlt, FaRegClock, FaTrashAlt} from 'react-icons/fa';

import { format } from 'date-fns';
import { Dropdown } from 'react-bootstrap';


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
            const newQuizData = {
                // Define the quiz data structure here based on the requirements for creation
            };
            await createQuiz(String(courseId), newQuizData);
            fetchQuizzes(); // Refresh the list after creation
        } catch (error) {
            console.error('Failed to create quiz:', error);
        }
    };

    const handleUpdate = async (quizId: any) => {
        try {
            const updateData = {
                // Define the update data here
            };
            await updateQuiz(quizId, updateData);
            fetchQuizzes(); // Refresh the list after updating
        } catch (error) {
            console.error('Failed to update quiz:', error);
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
                        <div className="me-3">
                            <FaRegClock className="text-secondary" />
                            <span className="ms-2">{quiz.title}</span>
                        </div>
                        <div className="flex-grow-1">
                            <small className="text-muted">{quiz.notAvailableMessage}</small><br/>
                            <strong>Due {formatDate(quiz.dueDate)}</strong><br/>
                            <small>{quiz.points} pts | {quiz.questionCount} Questions</small>
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
                                <Dropdown.Item onClick={() => {}}>Delete</Dropdown.Item>
                                {/* Add other menu items here as needed */}
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default QuizList;
