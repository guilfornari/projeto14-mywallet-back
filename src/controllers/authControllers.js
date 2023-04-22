import bcrypt from "bcrypt";
import { db } from "../database.js";


export async function signUp(req, res) {

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

};
