
import React from 'react';
import QuizList from "./List";
import {Route, Routes, useLocation} from "react-router-dom";
import QuizDetails from "./quizDetails";
import QuizDetailsEditor from "./quizDetailsEditor";
import QuizPreview from "./quizPreview";


const Quizzes = () => {
    const location = useLocation();
    const showList = !location.pathname.includes('quiz-details') && !location.pathname.includes('quiz-preview');
    return (
        <div>
            <Routes>
                <Route path="quiz-details/:quizId" element={<QuizDetails />} />
                <Route path="quiz-details/:quizId/edit" element={<QuizDetailsEditor />} />
                <Route path="quiz-preview/:quizId" element={<QuizPreview />} />

            </Routes>
            {showList && <QuizList />}
        </div>
    );
};

export default Quizzes;

