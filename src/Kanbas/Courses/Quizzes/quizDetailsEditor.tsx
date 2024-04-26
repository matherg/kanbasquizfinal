// Import necessary hooks and components from 'react', 'react-router-dom', and 'react-bootstrap'
import React, { useEffect,  useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { Tab, Tabs, Form, Button } from 'react-bootstrap';
import {QuizDetailsType} from "./quizDetails";
import {getQuiz, updateQuiz, createQuiz} from "./client";
import {format} from "date-fns";
import QuestionEditor from "./questionEditor";

export type QuestionType = {
    id: string;
    points: number;
    title: string;
    text: string;
    type: 'multiple_choice' | 'true_false' | 'fill_in_blanks';
    choices?: string[];
    correctAnswer?: string;
    blanks?: string[];
};

const QuizDetailsEditor = () => {
    const navigate = useNavigate();
    const {quizId} = useParams();
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [highestId, setHighestId] = useState(0);
    const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);


    // States for form fields
    const [quiz, setQuiz] = useState<QuizDetailsType | null>(null);
    useEffect(() => {
        const fetchQuizDetails = async () => {
            try {
                const response = await getQuiz(String(quizId));
                setQuiz(response.data);
                if (response.data.questions){
                    setQuestions(response.data.questions)
                    let maxId = 0;
                    response.data.questions.forEach((question: QuestionType) => {
                        const id = parseInt(question.id);
                        if (id > maxId) {
                            maxId = id;
                        }
                    });
                    setHighestId(maxId);
                }
            } catch (error) {
                console.error('Failed to fetch quiz details:', error);
            }
        };

        if (quizId) {
            fetchQuizDetails();
        }
    }, [quizId]);
    const handleEditQuestion = (questionId: string) => {
        setEditingQuestionId(questionId);
    };

    const handleCancelEdit = () => {
        setEditingQuestionId(null);
    };

    const handleSaveQuestion = (question: QuestionType) => {
        setQuestions((prevQuestions) => {
            const index = prevQuestions.findIndex((q) => q.id === question.id);
            if (index !== -1) {
                const updatedQuestions = [...prevQuestions];
                updatedQuestions[index] = question;
                return updatedQuestions;
            } else {
                // Question with the same ID not found, add the new question
                return [...prevQuestions, question];
            }
        });
        setEditingQuestionId(null);
    };
    const handleFieldChange = (field: keyof QuizDetailsType, value: any) => {
        setQuiz(prev => {
            if (prev === null) return null;
            return { ...prev, [field]: value };
        });
    };
    const addNewQuestion = () => {
        const newId =  (highestId + 1).toString()
        setQuestions((prevQuestions) => [
            ...prevQuestions,
            {
                id: newId,
                title: '',
                text: '',
                type: 'multiple_choice',
                choices: [''],
                correctAnswer: '',
                points: 1,
            },
        ]);
        setHighestId((id) => id + 1);
        setEditingQuestionId(newId)
    };


    // Handler for Save button

    const handleSave = () => {
        // Example: POST or PUT request to your backend
        let points = 0;
        for (const question of questions) {
            points += question.points
        }
        console.log(quiz);
        if (quizId && quiz) {
            quiz.questions = questions;
            quiz.points = points;
            updateQuiz(quizId, quiz).then(
                 () => navigate(-1)
             );
        }

    };

    const handleSaveAndPublish = () => {
        let points = 0;
        for (const question of questions) {
            points += question.points
        }
        if (quizId && quiz) {
            quiz.published = true;
            quiz.questions = questions;
            quiz.points = points;
            updateQuiz(quizId, quiz).then(
                () => navigate(-2)
            );
        }
    };
    const handleDateChange = (field: 'dueDate' | 'availableDate' | 'untilDate', value: string) => {
        handleFieldChange(field, new Date(value)); // Assuming you want to store dates as Date objects
    };

    const formattedDueDate = quiz?.dueDate ? format(new Date(quiz.dueDate), 'yyyy-MM-dd') : '';
    const formattedAvailableDate = quiz?.availableDate ? format(new Date(quiz.availableDate), 'yyyy-MM-dd') : '';
    const formattedUntilDate = quiz?.untilDate ? format(new Date(quiz.untilDate), 'yyyy-MM-dd') : '';
    // Handler for Cancel button
    const handleCancel = () => navigate(-2);
     return (
        <div className="quiz-editor">
            <Tabs defaultActiveKey="details" id="quiz-edit-tabs">
                <Tab eventKey="details" title="Details">
                    <Form>
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
                            <Form.Label>Access Code</Form.Label>
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
                        <Form.Group controlId="webcamRequired">
                            <Form.Check
                                type="checkbox"
                                label="Webcam Required"
                                checked={Boolean(quiz?.webcamRequired)}
                                onChange={(e) => handleFieldChange('webcamRequired', e.target.checked)}
                            />
                        </Form.Group>
                        <Form.Group controlId="lockQuestionsAfterAnswering">
                            <Form.Check
                                type="checkbox"
                                label="Lock Questions After Answering"
                                checked={Boolean(quiz?.lockQuestionsAfterAnswering)}
                                onChange={(e) => handleFieldChange('lockQuestionsAfterAnswering', e.target.checked)}
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
                        <Form.Group controlId="dueDate">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={formattedDueDate}
                                onChange={(e) => handleDateChange('dueDate', e.target.value)}
                            />
                        </Form.Group>

                        {/* Available Date Field */}
                        <Form.Group controlId="availableDate">
                            <Form.Label>Available Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={formattedAvailableDate}
                                onChange={(e) => handleDateChange('availableDate', e.target.value)}
                            />
                        </Form.Group>

                        {/* Until Date Field */}
                        <Form.Group controlId="untilDate">
                            <Form.Label>Until Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={formattedUntilDate}
                                onChange={(e) => handleDateChange('untilDate', e.target.value)}
                            />
                        </Form.Group>


                        {/* Save Button */}
                        <Button variant="primary" onClick={handleSave}>Save</Button>
                        <Button variant="primary" onClick={handleSaveAndPublish}>Save and Publish</Button>
                        <Button variant="danger" onClick={handleCancel}>Cancel</Button>


                        {/* Additional buttons for "Save and Publish" and "Cancel" */}
                    </Form>
                </Tab>
                <Tab eventKey="questions" title="Questions">

                    {questions.map((question) => (
                        <div key={question.id} className="question-item">
                            {editingQuestionId === question.id ? (
                                // Render the edit UI if this question is being edited
                                <div className="edit-question">

                                    <QuestionEditor onCancel={handleCancelEdit} onSave={handleSaveQuestion} question={question}/>

                                </div>
                            ) : (
                                // Render the view UI if the question is not being edited
                                <div className="view-question">
                                    <p>{`Q${question.id}: ${question.title}`}</p>
                                    <Button onClick={() => handleEditQuestion(question.id)}>Edit</Button>
                                </div>
                            )}
                        </div>
                    ))}
                    {editingQuestionId === null ? (
                        <Button onClick={addNewQuestion}>New Question</Button>
                    ) : null}
                </Tab>
            </Tabs>
        </div>
    );
};

export default QuizDetailsEditor;
