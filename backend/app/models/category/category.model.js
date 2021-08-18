const CategoryModel = (mongoose) => {
    const schema            = mongoose.Schema(
        {
            category_name   : String,
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

    const Category   = mongoose.model("category", schema)
    return Category
}
export default CategoryModel