import React, { useState } from 'react';
import axios from 'axios';

interface Technology {
  id: string;
  name: string;
}

interface Feature {
  id: string;
  name: string;
}

interface Project {
  id: string;
  name: string;
  goal: string;
  technologies: Technology[];
  features: Feature[];
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  async function getUser() {
    try {
      const response = await axios.get<{ data: Project[] }>('http://localhost:8080/projects');
      setProjects(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <button onClick={getUser}>Carregar Projetos</button>
      {projects.length > 0 && (
        <div>
          <h2>Projetos:</h2>
          <ul>
            {projects.map(project => (
              <li key={project.id}>
                <h3>{project.name}</h3>
                <p>Objetivo: {project.goal}</p>
                <h4>Tecnologias:</h4>
                <ul>
                  {project.technologies.map(tech => (
                    <li key={tech.id}>{tech.name}</li>
                  ))}
                </ul>
                <h4>Funcionalidades:</h4>
                <ul>
                  {project.features.map(feature => (
                    <li key={feature.id}>{feature.name}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Projects;
