const Product = require('../models/ProductModel')

const createProduct = (newProduct) => {
    return new Promise( async(resolve, reject) => {
        const {name, image, type, price, countInStock,description}  = newProduct

        try{
            const checkProduct = await Product.findOne({
                name: name
            })
            if(checkProduct !==null){
                resolve({
                    status: 'OK',
                    message:'Name of the product have account'
                })
            }
            const newProduct = await Product.create({
                name, image, type, price, countInStock,description
            })   
            if(newProduct) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newProduct
                })
            }
        }
        catch(e){
            reject(e)
        }
    }) 
}

const updateProduct = (id, data) => {
    return new Promise( async(resolve, reject) => {
        try{
            const checkProduct = await Product.findOne({
                _id:id
            })
            if(checkProduct === null){
                resolve({
                    status: 'OK',
                    message:'The Product is not define'
                })
            }
            const updatedProduct = await Product.findByIdAndUpdate(id, data, {new: true})
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedProduct
            })
        }
        catch(e){
            reject(e)
        }
    }) 
}

const deleteProduct = (id) => {
    return new Promise( async(resolve, reject) => {
        try{
            const checkProduct = await Product.findOne({
                _id: id
            })
            if(checkProduct === null){
                resolve({
                    status: 'OK',
                    message:'The Product is not define'
                })
            }
            await Product.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete product success',
            })
        }
        catch(e){
            reject(e)
        }
    }) 
}

const getAllProduct = (limit, page, sort, filter) => {
    return new Promise( async(resolve, reject) => {
        try{
            const totalProduct = await Product.countDocuments()
            if(filter) {
                const label = filter[0];
                const allObjectFilter = await Product.find({ [label]: { '$regex': filter [1] }}).limit(limit).skip(page*limit)
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: allObjectFilter,
                    total: totalProduct,
                    pageCurrent: page + 1,
                    totalPage: Math.ceil(totalProduct/limit)
                })
            }
            if(sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allProductSort = await Product.find().limit(limit).skip(page*limit).sort(objectSort)
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: page + 1,
                    totalPage: Math.ceil(totalProduct/limit)
                })
            }
            const allProduct = await Product.find().limit(limit).skip(page*limit)
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allProduct,
                total: totalProduct,
                pageCurrent: page + 1,
                totalPage: Math.ceil(totalProduct/limit)
            })
        }
        catch(e){
            reject(e)
        }
    }) 
}

const getDetailsProduct = (id) => {
    return new Promise( async(resolve, reject) => {
        try{
            const product = await Product.findOne({
                _id: id
            })
            if(product === null){
                resolve({
                    status: 'OK',
                    message:'The product is not define'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: product
            })
        }
        catch(e){
            reject(e)
        }
    }) 
}

const getAllType = () => {
    return new Promise( async(resolve, reject) => {
        try{
            const allType = await Product.distinct('type')
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allType
            })
        }
        catch(e){
            reject(e)
        }
    }) 
}


module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    getAllType
}

