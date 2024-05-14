import { Router } from "express";

import { getAllProjects, getProjectbyId, createProject, updateProject, deleteProject } from "../controllers/project.controllers";

const projectRouter = Router()

projectRouter.get('/', getAllProjects)
projectRouter.get('/:id', getProjectbyId)
projectRouter.post('/', createProject)
projectRouter.put('/:id', updateProject)
projectRouter.delete('/:id', deleteProject)

export default projectRouter 