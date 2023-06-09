const message = {
    carNotFound: {message: 'Car not found'},
    serverError: {error: 'Internal server error'},
    brandNotFound: {message: 'Brand not found'},
    checkSameCity: {message: 'Seller and user are not from the same city'},
    userNotFound: {message:'User not found'},
    unAuthorized: {message: "user unAuthorized"}
}

const status = {
    success : 200,
    created: 201,
    notFound: 404,
    serverError: 500,
    unAuthorized : 401
}

module.exports = { message , status }