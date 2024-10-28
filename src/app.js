import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))


/**
 * Configures the Express application to parse incoming JSON requests with a maximum size of 16kb.
 */
app.use(express.json({limit: '16kb'}))

/**
 * Configures the Express application to parse incoming URL-encoded requests with a maximum size of 16kb.
 */
app.use(express.urlencoded({extended: true, limit: '16kb'}))

/**
 * Serves static files from the 'public' directory.
 */
app.use(express.static('public'))

app.use(cookieParser())

export {app}