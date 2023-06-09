import { Request, Response } from "express";
import express from 'express'
import { connectMongoDB } from './db/db'
const app = express()
import dotenv from 'dotenv';
import cors from "cors";
dotenv.config();
const port = process.env.PORT || 3000 as number;
import authRouter from './routes/auth.route'
import locationRouter from './routes/location.route';
import { rateLimiter } from './/middleware/rate-limiter';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerDefinition } from "./middleware/swagger-definitions";
const swaggerSpec = swaggerJSDoc(swaggerDefinition);


app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/auth', rateLimiter, authRouter)
app.use('/location', rateLimiter, locationRouter)

app.get('/', (req: Request, res: Response): void => {
    res.send("Welcome to GeoNaija, your premier destination for seamless exploration of Nigeria's vibrant regions, diverse states, and dynamic local government areas (LGAs).")
})

connectMongoDB()

app.listen(port, (): void => {
    console.log(`Server listening on port ${port}`)
})

