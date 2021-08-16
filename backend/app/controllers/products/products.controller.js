import db from '../../models/index.js'
const Product   = db.products

const ProductsController  = {

    findAll : (req,res) => {
        Product.find()
        .then((result) =>{
            res.send(result)
        }).catch((err) => {
            res.status(500).send({
                message : err.message || "Some error while retrieving data."
            })
        });
    },

    create : (req, res) => {
        const post = new Product({
            id: req.body.id,
            productid: req.body.productid,
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            brand: req.body.brand,
            category: req.body.category,
            price: req.body.price,
            published: req.body.published ? req.body.published : false
        })

        post.save (post)
        .then((result) =>{
            res.send(result)
        }).catch((err) =>{
            res.status(409).send({
                message : err.message || "Some error while retrieving data."
            })
        });
    },

    findOne : (req,res) => {
        const id    = req.params.id
        Product.findById(id)
        .then((result) => {
            res.send(result)
        }).catch((err) =>{
            res.status(409).send({
                message : err.message || "Some error while retrieving data."
            })
        });
    },

    update : (req,res) => {
        const id    = req.params.id

        Product.findByIdAndUpdate(id,req.body)
        .then((result) => {
            if(!result){
                res.status(404).send({
                    message : "Product Not found"
                })
            }
            res.send({
                message : "Product was updated"
            })
        }).catch((err) =>{
            res.status(409).send({
                message : err.message || "Some error while update data."
            })
        });
    },

    delete : (req,res) => {
        const id    = req.params.id

        Product.findByIdAndRemove(id)
        .then((result) => {
            if(!result){
                res.status(404).send({
                    message : "Data Not found"
                })
            }
            res.send({
                message : "Product was Deleted"
            })
        }).catch((err) =>{
            res.status(409).send({
                message : err.message || "Some error while Delete data."
            })
        });
    }
}
export default ProductsController