const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');

export default async function handeler(req, res) {
    try {

        const { token } = req.body;



    } catch {
        console.error(">>===> Error: ", err);
        res.status(500).json({
            status: 500,
            type: "error",
            message: err
        });
    }
}
