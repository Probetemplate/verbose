const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
import { ObjectId } from "mongodb";
import { getCookie, setCookie } from 'cookies-next';
import clientPromise from "../../../src/mongodb";

export default async function handeler(req, res) {
    try {

        const mongoClient = await clientPromise;
        const db = mongoClient.db("auth");

        const jwtAuthToken = getCookie('jwtAuthToken', { req, res });

        if (jwtAuthToken) {
            const sub = jwt.verify(jwtAuthToken, process.env.PRIVATE_KEY).sub;

            db.collection("users").findOne({ sub }).then(async e => {
                if (e) {
                    const new_jwtToken = jwt.sign({ sub: sub }, process.env.PRIVATE_KEY);

                    const quizId = req.body.quizId;
                    const participent_sub = req.body.sub;

                    // remove participent from quiz
                    const response = await db.collection("users").updateOne({ sub: e.sub, "my_quizes.id": parseInt(quizId) }, {
                        "$pull": {
                            "my_quizes.$.participents": { sub: participent_sub.toString() }
                        }
                    });

                    // remove quiz from participent
                    const response2 = await db.collection("users").updateOne({ sub: participent_sub.toString() }, {
                        "$pull": {
                            "participated_quizes": { id: parseInt(quizId) }
                        }
                    });

                    // setCookie('jwtAuthToken', new_jwtToken, { req, res });
                    return res.status(201).json({
                        status: 201,
                        type: "success",
                        message: "Deleted Participent Successfully"
                    });

                } else {
                    return res.status(404).json({
                        status: 404,
                        type: "error",
                        message: "Failed To LoggedIn",
                    });
                }
            })

        } else {
            return res.status(404).json({
                status: 404,
                type: "error",
                message: "Failed To LoggedIn",
            });
        }

    } catch (err) {
        console.error(">>===> Error: ", err);
        res.status(500).json({
            status: 500,
            type: "error",
            message: err
        });
    }
}
