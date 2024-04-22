import express, { Router } from 'express'
import multer from 'multer'
import {
  // postTechnology,
  // getTechnologyRequests,
  // getUrlTextContent,
  scrapeUrlForMetadata
} from '../controllers/form.controller'

const router: Router = express.Router()
const upload = multer({ dest: 'uploads/' })

// router
//   .route('/form')
//   .post(upload.fields([{ name: 'lightIcon' }, { name: 'darkIcon' }]), postTechnology)
//   .get(getTechnologyRequests)

router.post('/form/technology/', scrapeUrlForMetadata)

export default router
