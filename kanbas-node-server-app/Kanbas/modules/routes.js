    import * as dao from "./dao.js";
    export default function ModuleRoutes(app) {
        const updateModule = async (req, res) => {
            const { mid } = req.params;
            const status = await dao.updateModule(mid, req.body);
            res.json(status);
        };
        const createModule = async (req, res) => {
            const { cid } = req.params;
            const newModule = {
                ...req.body,
                course: cid,
            };
            const course = await dao.createModule(newModule);
            res.json(course);
        }
        const deleteModule = (req, res) => {
            const { mid } = req.params;
            dao.deleteModule(mid)
                .then(status => {
                    res.json(status);
                })
                .catch(error => {
                    res.status(500).json({ error: 'Internal Server Error' });
                });
        };

        const getModulesWithCourseId = async (req, res) => {
            const { cid } = req.params;
            console.log(cid);
            const courses = await dao.findAllModulesWithCourseId(cid);
            res.json(courses);
        };

        app.post("/api/courses/:cid/modules", createModule);
        app.put("/api/modules/:mid", updateModule);
        app.get("/api/courses/:cid/modules", getModulesWithCourseId)
        app.delete("/api/modules/:mid", deleteModule)
    }

