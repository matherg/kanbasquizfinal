import {Route, Routes, useLocation, useParams} from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import "./index.css"

import Modules from "./Modules";
import CourseNavigation from "./CourseNavigation";
import Home from "./Home";
import Assignments from "./Assignments";
function Courses({ courses }: { courses: any[]; }) {
    const location = useLocation();
    const { courseId } = useParams();
    const course = courses.find(
        (course) => course._id === courseId);
    const activePath = location.pathname.split('/').pop();
    return (
        <div>
            <h1><HiMiniBars3 /> <span className="course-name">Course {course?.name}</span>
                <span className="separator">{' > '}</span>
                <span className="active-title">{activePath}</span></h1>
            <div className="course-layout">
                <CourseNavigation />
                <div className="course-content">
                    <Routes>
                        <Route path="home" element={<Home/>} />
                        <Route path="modules" element={<Modules/>} />
                        <Route path="assignments" element={<Assignments/>} />
                        <Route path="grades" element={<h1>Grades</h1>} />
                    </Routes>
                </div>
            </div>
        </div>
    );}

export default Courses
