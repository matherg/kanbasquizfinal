
import React from 'react';
import QuizList from "./List";
import {Route, Routes, useLocation} from "react-router-dom";
import QuizDetails from "./quizDetails";
import QuizDetailsEditor from "./quizDetailsEditor";


const Quizzes = () => {
    const location = useLocation();
    const showList = !location.pathname.includes('quiz-details');
    return (
        <div>
            <h2>Quizzes Page</h2>
            <Routes>
                <Route path="quiz-details/:quizId" element={<QuizDetails />} />
                <Route path="quiz-details/:quizId/edit" element={<QuizDetailsEditor />} />
            </Routes>
            {showList && <QuizList />}
        </div>
    );
};

export default Quizzes;

