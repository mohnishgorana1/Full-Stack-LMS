import express, {Router} from 'express'
import { getProfile, login, logout, register } from '../controllers/user.controller.js'
import { isLoggedIn } from '../middlewares/jwtAuth.middleware.js'


const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/me',isLoggedIn, getProfile)


export default router