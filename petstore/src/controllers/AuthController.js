const axios = require('axios');
require('dotenv').config();

module.exports = {
    verificaJWT(req, res, next) {
        const { token } = req.headers;

        let request = {
            url: `http://${process.env.AUTH_SERVER}/auth/validaToken`,
            data: {},
            config: {
                headers: { token }
            }
        };

        axios.post(request.url, request.data, request.config)
            .then(res => {
                next();
            })
            .catch(erro => {
                return res.status(erro.response.status).json({ erro });
            });
    }
}