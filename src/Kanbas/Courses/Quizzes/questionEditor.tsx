import React, { useState } from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { QuestionType } from "./quizDetailsEditor"

type QuestionEditorProps = {
    question: QuestionType;
    onSave: (question: QuestionType) => void;
    onCancel: () => void;
};

export default function QuestionEditor({ question, onSave, onCancel }: QuestionEditorProps) {
    const [currentQuestion, setCurrentQuestion] = useState(question);

    const handleFieldChange = (field: keyof QuestionType, value: any) => {
        setCurrentQuestion({ ...currentQuestion, [field]: value });
    };

    const addChoice = () => {
        if (currentQuestion.choices) {
            const newChoices = [...currentQuestion.choices, ''];
            handleFieldChange('choices', newChoices);
        }
    };



    const addBlank = () => {
        const newBlank = ''; // Create a new blank
        const blanks = currentQuestion.blanks || []; // Use empty array if currentQuestion.blanks is undefined
        handleFieldChange('blanks', [...blanks, newBlank]); // Update the blanks array
    };

    const renderMultipleChoiceAnswers = () => {
        return (
            <>
                <Form.Label>Answers</Form.Label>
                {currentQuestion.choices?.map((choice: string, index: number) => (
                    <div className="d-flex align-items-center mb-3" key={index}>
                        <FormControl
                            value={choice}
                            onChange={(e) => handleFieldChange('choices', currentQuestion.choices?.map((c, i) => i === index ? e.target.value : c))}
                        />
                        <Form.Check
                            type="radio"
                            label="Correct"
                            checked={currentQuestion.correctAnswer === choice}
                            onChange={() => handleFieldChange('correctAnswer', choice)}
                        />
                        <Button
                            variant="danger"
                            onClick={() => handleFieldChange('choices', currentQuestion.choices?.filter((_, i) => i !== index))}
                        >
                            Remove
                        </Button>
                    </div>
                ))}
                <Button variant="success" onClick={addChoice}>Add Choice</Button>
            </>
        );
    };

    const renderTrueFalseAnswers = () => {
        return (
            <div>
                <Form.Check
                    type="radio"
                    label="True"
                    name="trueFalse"
                    checked={currentQuestion.correctAnswer === "True"}
                    onChange={() => handleFieldChange('correctAnswer', 'True')}
                />
                <Form.Check
                    type="radio"
                    label="False"
                    name="trueFalse"
                    checked={currentQuestion.correctAnswer === "False"}
                    onChange={() => handleFieldChange('correctAnswer', 'False')}
                />
            </div>
        );
    };

    const renderFillInBlanksAnswers = () => {
        return (
            <>
                <Form.Label>Answers</Form.Label>
                {currentQuestion.blanks?.map((blank, index) => (
                    <div className="d-flex align-items-center mb-3" key={index}>
                        <FormControl
                            placeholder="Potential answer"
                            value={blank}
                            onChange={(e) => handleFieldChange('blanks', currentQuestion.blanks?.map((b, i) => i === index ? e.target.value : b))}
                        />
                        <Form.Check
                            type="radio"
                            label="Correct"
                            checked={currentQuestion.correctAnswer === blank}
                            onChange={() => handleFieldChange('correctAnswer', blank)}
                        />
                        <Button
                            variant="danger"
                            onClick={() => handleFieldChange('blanks', currentQuestion.blanks?.filter((_, i) => i !== index))}
                        >
                            Remove
                        </Button>
                    </div>
                ))}
                <Button variant="success" onClick={addBlank}>Add Blank</Button>
            </>
        );
    };


    const renderAnswersSection = () => {
        switch (currentQuestion.type) {
            case 'multiple_choice':
                return renderMultipleChoiceAnswers();
            case 'true_false':
                return renderTrueFalseAnswers();
            case 'fill_in_blanks':
                return renderFillInBlanksAnswers();
            default:
                return null;
        }
    };

    const handleSave = () => {
        onSave(currentQuestion);
    };

    return (
        <Form>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="string"
                    value={currentQuestion.title || ''}
                    onChange={(e) => handleFieldChange('title', e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="type">
                <Form.Label>Question Type</Form.Label>
                <Form.Control
                    as="select"
                    value={currentQuestion.type || 'multiple_choice'}
                    onChange={(e) => handleFieldChange('type', e.target.value)}
                >
                    <option value="multiple_choice">Multiple Choice</option>
                    <option value="true_false">True/False</option>
                    <option value="fill_in_blanks">Fill In the Blank</option>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Points</Form.Label>
                <Form.Control
                    type="number"
                    value={currentQuestion.points || 0}
                    onChange={(e) => handleFieldChange('points', parseInt(e.target.value))}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Question</Form.Label>
                <textarea
                    className="form-control"
                    value={currentQuestion.text || ''}
                    onChange={(e) => handleFieldChange('text', e.target.value)}
                />
            </Form.Group>

            {renderAnswersSection()}

            <Button variant="primary" onClick={handleSave}>Save/Update Question</Button>
            <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        </Form>
    );
}
