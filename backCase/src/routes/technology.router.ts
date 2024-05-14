import { Router } from "express";

import { getAllTechnology, getTechnologybyId, updateTechnology, deleteTechnology, createTechnology } from "../controllers/technology.controllers";

const technologyRouter = Router()

technologyRouter.get('/', getAllTechnology)
technologyRouter.get('/:id', getTechnologybyId)
technologyRouter.post('/', createTechnology)
technologyRouter.put('/:id', updateTechnology)
technologyRouter.delete('/:id', deleteTechnology)

export default technologyRouter 