const mongoose = require("mongoose")

const ProductoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true  //elimina los espacios en blanco    
    },
    empresa: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true
    },
    telefono: {
        type: Number,
        default: null
    },
    notas: {
        type: String
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,    //es el id del usuario que le paso en el ProductoController
        ref: "Usuario"  //Tiene que tener el mismo nombre que el module.exports de abajo del modelo que le queremos pasar. De esta forma va a saber qué le estoy pasando
    },
    creado: {
        type: Date,
        default: Date
    }
})

export default mongoose.model.Producto