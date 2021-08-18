const ProductModel = (mongoose) => {
    const schema            = mongoose.Schema(
        {
            productid       : {type: String,required:true},
            name            : {type: String,required:true},
            image           : {type: String},
            description     : {type: String,required:true},
            brand           : {type: String,required:true},
            category        : {type: String,required:true},
            price           : {type: String,required:true},
        },
        { 
            timestamps      : true
        }
    )
    schema.method("toJSON",function(){
        const {__v, _id, ...object}  = this.toObject()
        object.id = _id
        return object
    })

    const Product   = mongoose.model("products", schema)
    return Product
}
export default ProductModel