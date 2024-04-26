import model from "./model.js";


export const createCourse= (course) => {
    delete course._id
    return model.create(course);
}
export const findAllCourses = () => model.find();
export const findCourseById = (courseId) => model.findOne({id: courseId});
export const updateCourse = (courseId, course) => model.updateOne({ id: courseId }, { $set: course });
export const deleteCourse= (courseId) => model.deleteOne({ id: courseId });