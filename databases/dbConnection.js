import { connect } from "mongoose";




export const dbConn = connect('mongodb+srv://e-commerce:DjbNGLIGkPT7Nkgd@cluster0.67gsn.mongodb.net/e-commerce2c42')
.then(() => {
    console.log("database Connected Successfully");
})