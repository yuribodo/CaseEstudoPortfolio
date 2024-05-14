import {PrismaClient} from '@prisma/client'

const featureClient = new PrismaClient().feature;

//getAllTFeatures
export const getAllFeature = async (req, res) => {
    try {
        const allFeature = await featureClient.findMany()

        res.status(200).json({data: allFeature})
    }catch(e) {
        console.log(e)
    }
}

//getFeatureById
export const getFeaturebyId = async (req, res) => {
    try {
        const featureId = req.params.id;
        const feature = await featureClient.findUnique({
            where: {
                id: featureId,
            },
        });

        res.status(200).json({data: feature});
    }catch(e) {
        console.log(e)
    }
};

// createFeature
export const createFeature = async (req, res) => {
    try {
        const { name } = req.body;
        const feature = await featureClient.create({
            data: {
                name,
            }
        });

        res.status(201).json({ data: feature });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//updateFeature
export const updateFeature = async (req, res) => {
    try {
        const featureId = req.params.id
        const featureData= req.body;
        const feature = await featureClient.update({
            where: {
                id: featureId
            },
            data: featureData
        });

        res.status(201).json({data: feature})
    }catch(e) {
        console.log(e)
    }
};

//deleteFeature
export const deleteFeature = async(req, res) => {
    try {
        const featureId = req.params.id
        const feature = await featureClient.delete({
            where: {
                id: featureId
            },
        })

        res.status(200).json({data: {}})
    } catch (e) {
        console.log(e)
    }
}
