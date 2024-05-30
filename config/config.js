const JWT = {
    jwt : process.env.JWT_SECRET || 'secret_jwt',
    jwtExp:'100d'
}

module.exports ={JWT}