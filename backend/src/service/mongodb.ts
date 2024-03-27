import mongoose from 'mongoose'

async function connectDB() {
  try {
    await mongoose.connect(
      'mongodb+srv://GyunayK:JR93vLaLWjgA1aUt@devenvironment-cluster.vhba4vy.mongodb.net/Ice-Panel?retryWrites=true&w=majority'
    )
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
  }
}

export default connectDB
