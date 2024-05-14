import { Router } from "express";

import { getAllFeature, getFeaturebyId , updateFeature , createFeature , deleteFeature  } from "../controllers/feature.controllers";

const featureRouter = Router()

featureRouter.get('/', getAllFeature)
featureRouter.get('/:id', getFeaturebyId)
featureRouter.post('/', createFeature)
featureRouter.put('/:id', updateFeature)
featureRouter.delete('/:id', deleteFeature)

export default featureRouter 