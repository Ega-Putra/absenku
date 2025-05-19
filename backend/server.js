import express from 'express'
import mongoose from 'mongoose'
import { connectDB } from './config/db.js'
import Absen from './config/db.js';
import path from 'path'

const __dirname = path.resolve()
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.static(path.join(__dirname, 'frontend')))

app.get("/", async (req, res) => {
    try {
        res.sendFile(__dirname + '/frontend/index.html')
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' })
    }
})

app.get("/admin", async (req, res) => {
    try {
        res.sendFile(__dirname + '/frontend/page.html')
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' })
    }
})

app.post("/login", async (req, res) => {
    const passoword = req.body.password
    if (passoword !== 'admin') {
        return res.status(201).json({ login: false })
    }
    try {
        res.status(200).json({ login: true })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' })
        
    }
})

app.post("/absen",async (req, res) => {
    const data = req.body
    if (!data.name || !data.status) {
        return res.status(400).json({ status: false, message: 'provide all data' })
    }
    const newAbsen = new Absen(data)
    try {
        await newAbsen.save()
        res.json({ status: true, message: 'Absen berhasil', data: newAbsen })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' })
    }
})

app.get("/data", async (req, res) => {
    try {
        const data = await Absen.find({})
        res.json({ data })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' })
    }
})

app.listen(port,() => {
    connectDB()
    console.log(`server running at http://localhost:${port}`)
})