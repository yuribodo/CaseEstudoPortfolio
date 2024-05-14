import {PrismaClient} from '@prisma/client'

const projectClient = new PrismaClient().project;

//getAllProjects
export const getAllProjects = async (req, res) => {
    try {
        const allProjects = await projectClient.findMany({
            include: {
                technologies: true,
                features: true
            }

        })

        res.status(200).json({data: allProjects})
    }catch(e) {
        console.log(e)
    }
}

//getProjectById
export const getProjectbyId = async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await projectClient.findUnique({
            where: {
                id: projectId,
            },
            include: {
                technologies: true,
                features: true
            },
        });

        res.status(200).json({data: project});
    }catch(e) {
        console.log(e)
    }
};

// CreateProject
export const createProject = async (req, res) => {
    try {
        const { name, goal, technologies, features } = req.body;

        // Mapeia as tecnologias para o formato correto
        const techConnectOrCreate = technologies.map(tech => ({
            where: { id: tech.id }, // Use o ID da tecnologia
            create: { name: tech.name } // Apenas no caso de criar uma nova tecnologia
        }));
        const featConnectOrCreate = features.map(feat => ({
            where: { id: feat.id }, // Use o ID da tecnologia
            create: { name: feat.name } // Apenas no caso de criar uma nova tecnologia
        }));

        // Cria o projeto e conecta as tecnologias
        const project = await projectClient.create({
            data: {
                name,
                goal,
                technologies: {
                    connectOrCreate: techConnectOrCreate
                },
                features: {
                    connectOrCreate: featConnectOrCreate
                }
            },
            include: {
                technologies: true,
                features: true
            }
        });

        res.status(201).json({ data: project });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//updateProject
export const updateProject = async (req, res) => {
    try {
        const projectId = req.params.id
        const projectData= req.body;
        const project = await projectClient.update({
            where: {
                id: projectId
            },
            data: projectData
        });

        res.status(201).json({data: project})
    }catch(e) {
        console.log(e)
    }
};

//deleteProject
export const deleteProject = async(req, res) => {
    try {
        const projectId = req.params.id
        const project = await projectClient.delete({
            where: {
                id: projectId
            },
        })

        res.status(200).json({data: {}})
    } catch (e) {
        console.log(e)
    }
}
