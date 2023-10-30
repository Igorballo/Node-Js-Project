const jwt=require('jsonwebtoken');
const config = require('../../config/app')
module.exports= {
    async verifyToken(req,res,next){
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ error: 'Token is missing, vous n\'etes pas autorisé pour cette action' });
        }

        const token = authHeader.split(' ')[1]; // Pour extraire la partie JWT (après "Bearer ")

        // Vérifier la validité du token
        jwt.verify(token, config.jwt.jwt_secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Token invalide' });
            }

            // Le token est valide, vous pouvez stocker les informations du token dans req.user
            req.user = decoded;
            next();
        });
    }
}