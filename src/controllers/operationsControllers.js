import { db } from "../database.js";

export async function registerOps(req, res) {

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) return res.status(401).send("Token não enviado");

    const opType = req.params.tipo;
    const { amount, description } = req.body;

    try {
        const session = await db.collection("sessions").findOne({ token });
        if (!session) return res.status(401).send("Token inexistente");

        await db.collection("operations").insertOne({ userId: session.userId, amount, description, type: opType, date: Date.now() });
        return res.status(201).send("Entrada realizada");

    } catch (error) {
        return res.status(500).send(error.message);
    }

};

export async function getOps(req, res) {

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) return res.status(401).send("Token não enviado");

    try {
        const session = await db.collection("sessions").findOne({ token });
        if (!session) return res.status(401).send("Token inexistente");

        const allOps = await db.collection("operations").find({ userId: session.userId }).toArray();
        console.log(allOps);
        return res.status(200).send(allOps);
    } catch (error) {

    }

};