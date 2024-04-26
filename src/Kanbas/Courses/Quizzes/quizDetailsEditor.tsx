// Import necessary hooks and components from 'react', 'react-router-dom', and 'react-bootstrap'
import React, { useEffect,  useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { Tab, Tabs, Form, Button } from 'react-bootstrap';
import {QuizDetailsType} from "./quizDetails";
import {getQuiz} from "./client";


const QuizDetailsEditor = () => {
    const navigate = useNavigate();
    const {quizId} = useParams();
    // States for form fields
    const [quiz, setQuiz] = useState<QuizDetailsType | null>(null);
    useEffect(() => {
        const fetchQuizDetails = async () => {
            try {
                const response = await getQuiz(String(quizId));
                setQuiz(response.data);
            } catch (error) {
                console.error('Failed to fetch quiz details:', error);
            }
        };

        if (quizId) {
            fetchQuizDetails();
        }
    }, [quizId]);

    const handleFieldChange = (field: keyof QuizDetailsType, value: any) => {
        setQuiz(prev => {
            if (prev === null) return null;
            return { ...prev, [field]: value };
        });
    };

    // Handler for Save button

    const handleSave = () => {
        // Example: POST or PUT request to your backend
        console.log(quiz);
        navigate('/quiz-details');
    };

    const handleSaveAndPublish = () => {
        // Example: POST or PUT request to your backend with publish true
        console.log(quiz, { published: true });
        navigate('/quizzes');
    };

    // Handler for Cancel button
    const handleCancel = () => navigate('/quizzes');

    return (
        <div className="quiz-editor">
            <Tabs defaultActiveKey="details" id="quiz-edit-tabs">
                <Tab eventKey="details" title="Details">
                    <Form>
                        {/* Title Field */}
                        <Form.Group controlId="quizTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter quiz title"
                                value={quiz?.title || ''}
                                onChange={(e) => handleFieldChange('title', e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="accessCode">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter access code"
                                value={quiz?.accessCode || ''}
                                onChange={(e) => handleFieldChange('accessCode', e.target.value)}
                            />
                        </Form.Group>

                        {/* Description Field - Assuming you replace the WYSIWYG with a simple textarea for this example */}
                        <Form.Group controlId="quizDescription">
                            <Form.Label>Description</Form.Label>
                            <textarea
                                className="form-control"
                                value={quiz?.description || ''}
                                onChange={(e) => handleFieldChange('description', e.target.value)}
                            />
                        </Form.Group>

                        {/* Quiz Type Dropdown */}
                        <Form.Group controlId="quizType">
                            <Form.Label>Quiz Type</Form.Label>
                            <Form.Control
                                as="select"
                                value={String(quiz?.quizType)}
                                onChange={(e) => handleFieldChange('quizType', e.target.value)}
                            >
                                <option value="Graded Quiz">Graded Quiz</option>
                                <option value="Practice Quiz">Practice Quiz</option>
                                <option value="Graded Survey">Graded Survey</option>
                                <option value="Ungraded Survey">Ungraded Survey</option>
                            </Form.Control>
                        </Form.Group>

                        {/* Assignment Group Dropdown */}
                        <Form.Group controlId="assignmentGroup">
                            <Form.Label>Assignment Group</Form.Label>
                            <Form.Control
                                as="select"
                                value={String(quiz?.assignmentGroup)}
                                onChange={(e) => handleFieldChange('assignmentGroup', e.target.value)}
                            >
                                <option value="Quizzes">Quizzes</option>
                                <option value="Exams">Exams</option>
                                <option value="Assignments">Assignments</option>
                                <option value="Project">Project</option>
                            </Form.Control>
                        </Form.Group>

                        {/* Shuffle Answers Checkbox */}
                        <Form.Group controlId="shuffleAnswers">
                            <Form.Check
                                type="checkbox"
                                label="Shuffle Answers"
                                checked={Boolean(quiz?.shuffleAnswers)}
                                onChange={(e) => handleFieldChange('shuffleAnswers', e.target.checked)}
                            />
                        </Form.Group>

                        {/* Time Limit Input */}
                        <Form.Group controlId="timeLimit">
                            <Form.Label>Time Limit (Minutes)</Form.Label>
                            <Form.Control
                                type="number"
                                value={Number(quiz?.timeLimit)}
                                onChange={(e) => handleFieldChange('timeLimit', Number(e.target.value))}
                            />
                        </Form.Group>

                        {/* Allow Multiple Attempts Checkbox */}
                        <Form.Group controlId="multipleAttempts">
                            <Form.Check
                                type="checkbox"
                                label="Allow Multiple Attempts"
                                checked={Boolean(quiz?.multipleAttempts)}
                                onChange={(e) => handleFieldChange('multipleAttempts', e.target.checked)}
                            />
                        </Form.Group>
                        <Form.Group controlId="oneQuestionAtATime">
                            <Form.Check
                                type="checkbox"
                                label="One Question At a Time?"
                                checked={Boolean(quiz?.oneQuestionAtATime)}
                                onChange={(e) => handleFieldChange('oneQuestionAtATime', e.target.checked)}
                            />
                        </Form.Group>
                        <Form.Group controlId="showCorrectAnswers">
                            <Form.Check
                                type="checkbox"
                                label="Show Correct Answers"
                                checked={Boolean(quiz?.showCorrectAnswers)}
                                onChange={(e) => handleFieldChange('showCorrectAnswers', e.target.checked)}
                            />
                        </Form.Group>


                        {/* Save Button */}
                        <Button variant="primary" onClick={handleSave}>Save</Button>
                        {/* Additional buttons for "Save and Publish" and "Cancel" */}
                    </Form>
                </Tab>
                <Tab eventKey="questions" title="Questions">
                    {/* Content for Questions Editor */}
                </Tab>
            </Tabs>
        </div>
    );
};

export default QuizDetailsEditor;
