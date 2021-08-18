import db from '../../models/index.js'
const Category   = db.category

const CategoryController  = {

    findAll : async (req,res) => {
        await Category.find()
        .then((result) =>{
            res.send(result)
        }).catch((err) => {
            res.status(500).send({
                message : err.message || "Some error while retrieving data."
            })
        });
    },

    create : async (req, res) => {
        const post = new Category({
            id: req.body.id,
            category_name: req.body.category_name,
            published: req.body.published ? req.body.published : false
        })

        await post.save (post)
        .then((result) =>{
            res.send(result)
        }).catch((err) =>{
            res.status(409).send({
                message : err.message || "Some error while retrieving data."
            })
        });
    },

    findOne : async (req,res) => {
        const id    = req.params.id
        await Category.findById(id)
        .then((result) => {
            res.send(result)
        }).catch((err) =>{
            res.status(409).send({
                message : err.message || "Some error while retrieving data."
            })
        });
    },

    update : async (req,res) => {
        const id    = req.params.id

        await Category.findByIdAndUpdate(id,req.body)
        .then((result) => {
            if(!result){
                res.status(404).send({
                    message : "Category Not found"
                })
            }
            res.send({
                message : "Category was updated"
            })
        }).catch((err) =>{
            res.status(409).send({
                message : err.message || "Some error while update data."
            })
        });
    },

    delete : async (req,res) => {
        const id    = req.params.id

        await Category.findByIdAndRemove(id)
        .then((result) => {
            if(!result){
                res.status(404).send({
                    message : "Data Not found"
                })
            }
            res.send({
                message : "Category was Deleted"
            })
        }).catch((err) =>{
            res.status(409).send({
                message : err.message || "Some error while Delete data."
            })
        });
    }
}
export default CategoryController