
const CustomAPIError =require('../errors/custom-error')
const jwt = require('jsonwebtoken')
const login =  async (req, res) => {
    // res.send('Fake Login/Register/Sign Route')
    const {username,password} = req.body
    // check username and password
     // Mongo
    
    //  just for demo normally provided by DB!!!
    const id = new Date().getDate()
    // Joi
    if(!username || !password){
        throw new CustomAPIError('username or password missing',400) 
    }


    const token = jwt.sign({id,username},process.env.SECRET_KEY,{
        expiresIn: '7d'
    })
    res.status(201).json({msg: 'user created',token})
}


const dashboard =  async (req, res) => {
    // const authHeader = req.headers.authorization;
    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //     throw new CustomAPIError('No token provided',403)
    //   }
    

    // const token = authHeader.split(' ')[1]
    // console.log(token)

    // try {
    //     const decoded = jwt.verify(token,process.env.SECRET_KET)
    //     console.log(decoded)
    //     res.status(200).json({decoded})
    // } catch (error) {
    //     throw new CustomAPIError('Not authorized to access this route',401)

    // }
    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({msg: `${req.user.username}`, 
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`})
}

module.exports = {
    login,
    dashboard
} 
