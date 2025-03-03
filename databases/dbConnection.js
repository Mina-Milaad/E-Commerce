import { connect } from "mongoose";




export const dbConn = connect('mongodb://localhost:27017/e-commerce2c42')
    .then(() => {
        console.log("database Connected Successfully");
    })