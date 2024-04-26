import model from "./model.js";


export const createQuiz= (quiz) => {
    delete quiz._id
    return model.create(quiz);
}
export const findAllQuizzesWithCourseId = (courseId) => model.find({course: courseId});
export const findQuizById = (quizId) => model.findById(quizId);
export const updateQuiz = (quizId, module) => model.updateOne({ _id: quizId }, { $set: module });
export const deleteQuiz= (quizId) => model.deleteOne({ _id: quizId });