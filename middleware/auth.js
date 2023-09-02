const jwt = require('jsonwebtoken');
const authenticationMiddleware = async (req,res,next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomAPIError('No token provided',403)
      }
    

    const token = authHeader.split(' ')[1]
    // console.log(token)

    try {
        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        const {id, username} = decoded
        req.user = {id,username}
        next()
        // res.status(200).json(decoded)
    } catch (error) {
        throw new CustomAPIError('Not authorized to access this route',401)

    }
    
}

module.exports = authenticationMiddleware