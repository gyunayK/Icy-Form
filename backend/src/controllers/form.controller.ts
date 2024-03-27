import FormModel from '../model/form.model'

export const postTechnology = async (req, res) => {
  try {
    // Extract the filenames and save those to MongoDB
    const lightIconFilename = req.files['lightIcon'][0].filename
    const darkIconFilename = req.files['darkIcon'][0].filename

    // Create a new instance of the form model with the form data and filenames
    const newForm = new FormModel({
      ...req.body, // spread form fields
      lightIcon: lightIconFilename,
      darkIcon: darkIconFilename
    })

    const savedForm = await newForm.save()

    res.status(200).json(savedForm)
  } catch (error) {
    console.error('Error saving form data:', error)
    res.status(500).json({ message: error.message })
  }
}

export const getTechnologyRequests = async (req, res) => {
  try {
    const requests = await FormModel.find({})
    // Map over requests to attach image URLs
    const requestsWithImages = requests.map((request) => ({
      ...request.toObject(),
      lightIconUrl: `${req.protocol}://${req.get('host')}/uploads/${request.lightIcon}`,
      darkIconUrl: `${req.protocol}://${req.get('host')}/uploads/${request.darkIcon}`
    }))

    res.json(requestsWithImages)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const checkTechnologyNameExists = async (req, res) => {
  try {
    const { name } = req.body
    console.log('Name:', name)

    const technology = await FormModel.findOne({ technologyName: name })
    console.log('Technology:', !!technology)
    res.json({ exists: !!technology })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
