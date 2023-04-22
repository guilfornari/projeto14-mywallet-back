import bcrypt from "bcrypt";
import { db } from "../database.js";
import { v4 as uuid } from "uuid";


export async function signUp(req, res) {

    const { name, mail, password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);

    try {
        const user = await db.collection("sign-up").findOne({ mail });
        if (user) return res.status(409).send("Este e-mail já está cadastrado.");

        await db.collection("sign-up").insertOne({ name, mail, password: passwordHash });
        return res.status(201).send("Cadastro realizado com sucesso!");
    } catch (error) {
        return res.status(500).send(error.message);
    };

};

export async function signIn(req, res) {
    const { mail, password } = req.body;

    try {
        const user = await db.collection("sign-up").findOne({ mail });
        if (!user) return res.status(404).send("Este e-mail não está cadastrado.");

        const checkPw = bcrypt.compareSync(password, user.password);
        if (!checkPw) return res.status(401).send("Senha incorreta!");

        const token = uuid();
        await db.collection("sessions").insertOne({ userId: user._id, token });
        return res.status(200).send(token);

    } catch (error) {
        return res.status(500).send(error.message);
    };
};
