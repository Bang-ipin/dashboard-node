const ProductModel = (mongoose) => {
    const schema            = mongoose.Schema(
        {
            productid       : String,
            name            : String,
            image           : String,
            description     : String,
            brand           : String,
            category        : String,
            price           : Number,
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