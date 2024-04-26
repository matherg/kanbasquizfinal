import * as dao from "./dao.js";
export default function QuizRoutes(app) {
    const updateQuiz = async (req, res) => {
        const { qid } = req.params;
        const status = await dao.updateQuiz(qid, req.body);
        res.json(status);
    };
    const createQuiz = async (req, res) => {
        const { cid } = req.params;
        const newQuiz = {
            ...req.body,
            course: cid,
        };
        const course = await dao.createQuiz(newQuiz);
        res.json(course);
    }
    const deleteQuiz = (req, res) => {
        const { qid } = req.params;
        dao.deleteQuiz(qid)
            .then(status => {
                res.json(status);
            })
            .catch(error => {
                res.status(500).json({ error: 'Internal Server Error' });
            });
    };
    const getQuiz = async (req, res) => {
        const {qid} = req.params;
        const quiz = await dao.findQuizById(qid);
        res.json(quiz);
    }

    const getQuizzesWithCourseId = async (req, res) => {
        const { cid } = req.params;
        const courses = await dao.findAllQuizzesWithCourseId(cid);
        res.json(courses);
    };

    app.post("/api/courses/:cid/quiz", createQuiz);
    app.put("/api/quizzes/:qid", updateQuiz);
    app.get("/api/courses/:cid/quizzes", getQuizzesWithCourseId)
    app.delete("/api/quizzes/:qid", deleteQuiz)
    app.get("/api/quizzes/:qid", getQuiz)
}

