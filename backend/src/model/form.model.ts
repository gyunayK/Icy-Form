import mongoose from 'mongoose'

const FormDataSchema = new mongoose.Schema(
  {
    technologyName: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    websiteURL: {
      type: String,
      required: true
    },
    docsUrl: {
      type: String
    },
    changeLogUrl: {
      type: String
    },
    brandColor: {
      type: String
    },
    isPublic: {
      type: Boolean,
      default: true
    },
    c4ModelAbstraction: {
      type: String
    },
    lightIcon: {
      type: String
    },
    darkIcon: {
      type: String
    },
    status: {
      type: String,
      required: true,
      enum: ['Pending approval', 'Approved', 'Rejected'],
      default: 'Pending approval'
    }
  },
  { collection: 'technology-requests' }
)

const FormModel = mongoose.model('FormData', FormDataSchema)

export default FormModel
