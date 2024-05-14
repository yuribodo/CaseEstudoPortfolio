import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Projects from './Projects';
import './App.css';
import { Cloudinary} from '@cloudinary/url-gen'
import imagem from './_c339f727-3431-46fb-8bf4-7053d5a8afee.jpg'
import { motion } from "framer-motion"

interface Project {
  id: string;
  name: string;
  goal: string;
  technologies: { id: string; name: string }[];
  features: { id: string; name: string }[];
}

const App: React.FC = () => {
  const cld = new Cloudinary({cloud: {cloudName: 'dhkltwykz'}})
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId , setSelectedProjectId] = useState<string>('')

  useEffect(() => {
    getProjects();
  }, []);


  async function getProjects() {
    try {
      const response = await axios.get<{ data: Project[] }>('http://localhost:8080/projects');
      setProjects(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }



  const handleProjectClick = (projectName: string, projectId: string) => {
    setSelectedProject(projectName);
    setSelectedProjectId(projectId)
  };

  return (
    <>
      <div className="">
        <div className="flex justify-center p-[20px]">
          <div className="flex justify-center bg-yellow-700 h-[40vh] w-[90vw] rounded-3xl">
            {/* Renderiza a imagem e o nome do projeto no Thumbs */}
            {projects.map(project => (
              <div key={project.id} onClick={() => handleProjectClick(project.name, project.id)} className="cursor-pointer">
                <img src={imagem} alt={`Thumb do ${project.name}`} />
                <h2>{project.name}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-center text-3xl font-bold">
            <h1 className=' text-white'>{selectedProject}</h1>
          </div>
          <h3 className=' text-2xl font-bold p-4 text-white'>Goal</h3>   
          <motion.div className="flex p-[20px] font-bold bg-slate-600 rounded-xl " >
            
            <p>{projects.find(project => project.id === selectedProjectId)?.goal}</p>
          </motion.div>
          <div>
                <h3 className=' text-2xl font-bold p-4 text-white'>Recursos</h3>
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  {projects.find(project => project.id === selectedProjectId)?.features.map(feature => (
                    <motion.li 
                      key={feature.id} 
                      className="flex p-[15px] bg-red-400 rounded-xl mt-[10px] font-bold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 2 }} 
                    >{feature.name}</motion.li>
                  ))}
                </motion.ul>
          </div>

          <div className="flex justify-center space-x-[50vw] mt-[10px]">
            <div>
            <h3 className=' text-2xl font-bold p-4 text-white'>Tecnologias Usadas</h3>
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                {
                  projects.find(project => project.id === selectedProjectId)?.technologies.map(technologie => (
                    <motion.li 
                      key={technologie.id} // Certifique-se de ter uma chave única para cada item na lista
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 2 }} 
                      className="p-[10px] bg-green-300 rounded-xl font-bold mt-[10px]"
                    >{technologie.name}</motion.li>
                  ))}
              </motion.ul>
            </div>
            <div>
              <h3 className=' text-2xl font-bold p-4 text-white'>Imagem</h3>
              <div className="bg-blue-400 w-[20vw] h-[20vh] rounded-2xl">Imagem</div>
            </div>
            
          </div>
        </div>
        
        
      </div>
    </>
  );
}

export default App;
