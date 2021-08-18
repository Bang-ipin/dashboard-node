import db from '../../models/index.js'
const User   = db.user

const UserController  = {

    findAll : async (req,res) => {
        await User.find()
        .then((result) =>{
            res.send(result)
        }).catch((err) => {
            res.status(500).send({
                message : err.message || "Some error while retrieving data."
            })
        });
    },

    create : async (req, res) => {
        const post = new User({
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
        await User.findById(id)
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

        await User.findByIdAndUpdate(id,req.body)
        .then((result) => {
            if(!result){
                res.status(404).send({
                    message : "User Not found"
                })
            }
            res.send({
                message : "User was updated"
            })
        }).catch((err) =>{
            res.status(409).send({
                message : err.message || "Some error while update data."
            })
        });
    },

    delete : async (req,res) => {
        const id    = req.params.id

        await User.findByIdAndRemove(id)
        .then((result) => {
            if(!result){
                res.status(404).send({
                    message : "User Not found"
                })
            }
            res.send({
                message : "User was Deleted"
            })
        }).catch((err) =>{
            res.status(409).send({
                message : err.message || "Some error while Delete data."
            })
        });
    }
}
export default UserController