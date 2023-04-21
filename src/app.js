import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import joi from "joi";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config()

const mongoClient = new MongoClient(process.env.DATABASE_URL);
try {
    await mongoClient.connect();
    console.log('MongoDB Connected!');
} catch (error) {
    console.log(error.message);
}
const db = mongoClient.db();

const signUpSchema = joi.object({
    name: joi.string().required(),
    mail: joi.string().email().required(),
    password: joi.string().min(3).required()
});

app.post("/cadastro", async (req, res) => {

    const validation = signUpSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    const { name, mail, password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);

    try {
        const user = await db.collection("sign-up").findOne({ mail });
        if (user) return res.status(409).send("Este e-mail já está cadastrado");

        await db.collection("sign-up").insertOne({ name, mail, password: passwordHash });
        return res.status(201).send("Cadastro realizado com sucesso");
    } catch (error) {
        return res.status(500).send(error.message);
    }

});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));