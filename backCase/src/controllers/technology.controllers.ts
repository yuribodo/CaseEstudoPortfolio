import {PrismaClient} from '@prisma/client'

const technologyClient = new PrismaClient().technology;

//getAllTechnologys
export const getAllTechnology = async (req, res) => {
    try {
        const allTechnology = await technologyClient.findMany()

        res.status(200).json({data: allTechnology})
    }catch(e) {
        console.log(e)
    }
}

//getTechnologyById
export const getTechnologybyId = async (req, res) => {
    try {
        const technologyId = req.params.id;
        const technology = await technologyClient.findUnique({
            where: {
                id: technologyId,
            },
        });

        res.status(200).json({data: technology});
    }catch(e) {
        console.log(e)
    }
};

// createTechnology
export const createTechnology = async (req, res) => {
    try {
        const { name } = req.body;
        const technology = await technologyClient.create({
            data: {
                name
            }
        });

        res.status(201).json({ data: technology });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//updateTechnology
export const updateTechnology = async (req, res) => {
    try {
        const technologyId = req.params.id
        const technologyData= req.body;
        const technology = await technologyClient.update({
            where: {
                id: technologyId
            },
            data: technologyData
        });

        res.status(201).json({data: technology})
    }catch(e) {
        console.log(e)
    }
};

//deleteTechnology
export const deleteTechnology = async(req, res) => {
    try {
        const technologyId = req.params.id
        const technology = await technologyClient.delete({
            where: {
                id: technologyId
            },
        })

        res.status(200).json({data: {}})
    } catch (e) {
        console.log(e)
    }
}
