import {Router} from "express"
import multer from "multer"
import multerConfig from "./config/multer"



import UserController from "./app/controllers/UserController"
import SessionController from "./app/controllers/SessionController"
import ProductControllers from "./app/controllers/ProductControllers"

const upload = multer(multerConfig)
const routes = new Router()

routes.post('/users', UserController.store )

routes.post('/sessions', SessionController.store )

routes.post('/products', upload.single('file'), ProductControllers.store )
routes.get('/products', ProductControllers.index )


export default routes