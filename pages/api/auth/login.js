const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
import { ObjectId } from "mongodb";
import { setCookie } from 'cookies-next';
import clientPromise from "../../../src/mongodb";

export default async function handeler(req, res) {
    try {
        const mongoClient = await clientPromise;
        const db = mongoClient.db("auth");

        const { token } = req.body;

        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        });
        const payload = ticket.getPayload();

        const new_jwtToken = jwt.sign({ sub: payload.sub }, process.env.PRIVATE_KEY);

        db.collection("users").findOne({ sub: payload.sub }).then(async userExist => {
            if (userExist) { // login

                const response = await db.collection("users").updateOne({ sub: userExist.sub }, {
                    "$set": {
                        name: payload.name,
                        email: payload.email,
                        avatar: payload.picture
                    }
                });

                const e = await db.collection("users").findOne({ sub: payload.sub });

                setCookie('jwtAuthToken', new_jwtToken, { req, res });
                return res.status(201).json({
                    status: 201,
                    type: "success",
                    message: "Successfully Registered",
                    data: {
                        name: e.name,
                        email: e.email,
                        avatar: e.avatar,
                        token: token,
                    }
                });

                // return userExist.save().then(async e => {
                //     return res.status(200).cookie("jwtAuthToken", new_jwtToken).json({
                //         status: 200,
                //         type: "success",
                //         message: "Sccessfully LoggedIn",
                //         data: {
                //             name: e.name,
                //             email: e.email,
                //             avatar: e.picture,
                //             token: token,
                //         }
                //     })
                // });
            } else { // register

                const response = await db.collection("users").insertOne({
                    sub: payload.sub,
                    idToken: token,
                    name: payload.name,
                    email: payload.email,
                    avatar: payload.picture,
                });

                const e = await db.collection("users").findOne({ sub: payload.sub });

                console.log(">>===> New Account Registered: ", e.email);

                setCookie('jwtAuthToken', new_jwtToken, { req, res });
                return res.status(201).json({
                    status: 201,
                    type: "success",
                    message: "Successfully Registered",
                    data: {
                        name: e.name,
                        email: e.email,
                        avatar: e.avatar,
                        token: token,
                    }
                });
            }
        })

    } catch {
        console.error(">>===> Error: ", err);
        res.status(500).json({
            status: 500,
            type: "error",
            message: err
        });
    }
}
