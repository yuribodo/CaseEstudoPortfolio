import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';
import { Cloudinary} from '@cloudinary/url-gen'
import imagem from './_c339f727-3431-46fb-8bf4-7053d5a8afee.jpg'
import { motion } from "framer-motion"
import Modal from './Modal';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRight } from 'react-icons/fa'; // Importe o ícone de seta direita
import {useDropzone} from 'react-dropzone'

interface Project {
  id: string;
  name: string;
  goal: string;
  technologies: { id: string; name: string }[];
  features: { id: string; name: string }[];
  imagemURL: string;
}

interface Technologies {
  id: string;
  name: string;
}





const App: React.FC = () => {
  const cld = new Cloudinary({cloud: {cloudName: 'dhkltwykz'}})
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId , setSelectedProjectId] = useState<string>('')
  const [modalAberto, setModalAberto] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectGoal, setProjectGoal] = useState('');
  const [projectImage, setProjectImage] = useState('');
  const [existingFeatures, setExistingFeatures] = useState<Technologies[]>([]);
  const [existingTechnologies, setExistingTechnologies] = useState<Technologies[]>([]);
  const [selectedFeature, setSelectedFeature] = useState<string[]>([]); // Track selected feature
  const [selectedTechnology, setSelectedTechnology] = useState<string[]>([]); // Track selected technology
  const [state, setState] = useState('ready')
  const [selectedProjectImage , setSelectedProjectImage] = useState<string>('')
  
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)


  useEffect(() => {
    getProjects();
    getFeatures();
    getTechnologies();
  }, []);

  

  async function getProjects() {
    try {
      const response = await axios.get<{ data: Project[] }>('http://localhost:8080/projects');
      setProjects(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  
  async function getFeatures() {
    try {
      const response = await axios.get<{data: Technologies[]}>('http://localhost:8080/features');
      setExistingFeatures(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getTechnologies() {
    try {
      const response = await axios.get<{data: Technologies[]}>('http://localhost:8080/technologies');
      setExistingTechnologies(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  const abrirModal = () => {
    setModalAberto(true);
  };



  const fecharModal = () => {
    setModalAberto(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "nome") {
      setProjectName(value);
    } else if (name === "goal") {
      setProjectGoal(value);
    }
  };

  async function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (typeof acceptedFiles[0] === 'undefined' ) return;
    const formData = new FormData();

    formData.append('file', acceptedFiles[0]);
    formData.append('upload_preset', 'hxn4njla');
    formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY);

    const results = await fetch('https://api.cloudinary.com/v1_1/dhkltwykz/image/upload', {
      method: 'POST',
      body: formData
    }).then(r => r.json());

    console.log('results', results)
    
    
    console.log(results.url)
    const ImagemURL = results.url
    console.log(ImagemURL)
    

    criarProjeto(ImagemURL)

    setState('sent')
  }

  const selectTechnology = (tech: Technologies) => {
    const isSelected = selectedTechnology.includes(tech.name);
    if (isSelected) {
      setSelectedTechnology(selectedTechnology.filter((selectedTech) => selectedTech !== tech.name));
    } else {
      setSelectedTechnology([...selectedTechnology, tech.name]);
    }
  };
  
  const selectFeature = (feat: Technologies) => {
    const isSelected = selectedFeature.includes(feat.name);
    if (isSelected) {
      setSelectedFeature(selectedFeature.filter((selectedFeat) => selectedFeat !== feat.name));
    } else {
      setSelectedFeature([...selectedFeature, feat.name]);
    }
  };

  const criarProjeto = (imaegmURL: string) => {
    const selectedTechIds = existingTechnologies
      .filter((tech) => selectedTechnology.includes(tech.name))
      .map((tech) => ({ id: tech.id, name: tech.name }));
  
    const selectedFeatIds = existingFeatures
      .filter((feat) => selectedFeature.includes(feat.name))
      .map((feat) => ({ id: feat.id, name: feat.name }));
  
    const data = {
      name: projectName,
      goal: projectGoal,
      technologies: selectedTechIds,
      features: selectedFeatIds,
      imagemURL: imaegmURL
    };
  
    axios
      .post('http://localhost:8080/projects', data)
      .then((response) => {
        console.log('Resposta da requisição:', response.data);
        setModalAberto(false);
      })
      .catch((error) => {
        console.error('Ocorreu um erro:', error);
      });
  };

  const handleProjectClick = (projectName: string, projectId: string, projectImagem: string) => {
    setSelectedProject(projectName);
    setSelectedProjectId(projectId);
    setSelectedProjectImage(projectImagem);
  };


  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 2,
    speed: 500,
    rows: 1,
    slidesPerRow: 2,
    
  };

  const SliderComponent = ({ children }: { children: React.ReactNode }) => {
    console.log("Children of Slider:", children);
    return (
      <div>
        {/* Componente Slider */}
        {children}
      </div>
    );
  };

  
  const onDrop = useCallback((acceptedFiles : FileList)=> {
    // Do something with the files
    const file = new FileReader;

    file.onload = function() {
      setPreview(file.result)
    }

    file.readAsDataURL(acceptedFiles[0])

    
  }, [])
  const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  


  return (
    <>
      <div className="">
      <Modal isOpen={modalAberto} onClose={fecharModal}>
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h1 className="text-center font-serif font-bold text-3xl">Criar Novo Projeto</h1>
            <form onSubmit={handleOnSubmit}>
            <div className="mt-8">
              <input
                type="text"
                name="nome"
                placeholder="Nome do Projeto"
                className="mb-4 border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring focus:border-blue-500 w-full"
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="goal"
                placeholder="Goal do Projeto"
                className="mb-4 border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring focus:border-blue-500 w-full"
                onChange={handleInputChange}
              />
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                  isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
                }
              </div>
              <img src={preview} alt="" />
              <div className="mb-4">
                <h3 className="text-lg font-bold">Recursos do Projeto:</h3>
                <ul className="grid grid-cols-2 gap-2">
                {existingFeatures.map((feature) => (
                    <li
                      key={feature.id}
                      className={`bg-gray-100 rounded-lg p-2 cursor-pointer ${
                        selectedFeature.includes(feature.name) ? 'bg-gray-300' : ''
                      }`}
                      onClick={() => selectFeature(feature)}
                    >
                      {feature.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold">Tecnologias do Projeto:</h3>
                <ul className="grid grid-cols-2 gap-2">
                {existingTechnologies.map((tech) => (
                    <li
                      key={tech.id}
                      className={`bg-gray-100 rounded-lg p-2 cursor-pointer ${
                        selectedTechnology.includes(tech.name) ? 'bg-gray-300' : ''
                      }`}
                      onClick={() => selectTechnology(tech)}
                    >
                      {tech.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <button type='submit' className="bg-green-700 text-white font-bold rounded-lg py-2 px-4 w-32" >
                Criar Projeto
              </button>
            </div>
            </form>
          </div>
        </Modal> 

        <div className=' text-white flex justify-center font-bold '>
          <h1 className=' text-3xl p-4'>Meus Projetos</h1> 
        </div>
                
        
        <div className="slider-container">
          <Slider {...settings}>
            {projects.map(project => (
                <div key={project.id} onClick={() => handleProjectClick(project.name, project.id, project.imagemURL)} className="cursor-pointer p-5">
                  <img src={`${project.imagemURL}`} alt={`Thumb do ${project.name}`} />
                  <h2 className=' text-white font-bold text-xl'>{project.name}</h2>
                </div>
              ))}
              
        
          </Slider>
            <div className="next-arrow absolute top-1/3 right-4 transform -translate-y-1/2">
              <FaArrowRight className="text-white text-3xl cursor-pointer" />
            </div>
         </div>
        

        { selectedProjectId && (
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

          <div className="flex justify-center space-x-[50vw] mt-[10px] overflow-y-auto">
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
              <div className="bg-blue-400 w-[20vw] h-[20vh] rounded-2xl">
                <img src={`${selectedProjectImage}`} alt="" />
              </div>
            </div>
            
          </div>



          <div className='flex justify-center h-[20vh]'>
            <div className='flex justify-center bg-white h-[50px] w-[200px] cursor-pointer rounded-lg text-black font-bold text-xl' onClick={abrirModal}>
                  <h2 className=' flex items-center'>Criar Novo Projeto</h2>
            </div>
          </div>
        </div>
        )}
        
      </div>
    </>
  );
}

export default App;
