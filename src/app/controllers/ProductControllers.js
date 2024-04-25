import * as YUP from "yup"
import Product from "../models/Product"

class ProductControllers{
 async store(request,response){
   const schema = YUP.object().shape({
    name:YUP.string().required(),
    price:YUP.number().required(),
    category:YUP.string().required(),
   }) 


   try { await schema.validateSync(request.body,{abortEarly: false }) 
   } catch (err){
     return response.status(400).json({error: err.errors})     
    }

    const { filename: path } = request.file
    const { name, price, category} = request.body

    const product = await Product.create({
      name,
      price: price,
      category,
      path,
    })
    
    return response.json(product)
}

async index(request, response){

  const products = await Product.findAll()

  return response.json(products)
}

}

export default new ProductControllers()






