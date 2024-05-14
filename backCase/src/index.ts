import  express  from "express";

import projectRouter from "./routes/project.router";
import technologyRouter from "./routes/technology.router";
import featureRouter from "./routes/feature.router";
import cors from 'cors'

const app = express()
const port = process.env.PORT || 8080;

app.use(cors())

app.use(express.json())

app.use('/projects', projectRouter)
app.use('/technologies', technologyRouter)
app.use('/features', featureRouter)

app.get('/ping', (req, res) => {
    res.json({message: "pong"}).status(200)
});

app.listen(port, () => {
    console.log(`Server up and running on port: ${port}`)
})