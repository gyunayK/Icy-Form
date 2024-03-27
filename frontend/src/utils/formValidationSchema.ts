import { z } from 'zod'

export const technologyFormSchema = z.object({
  technologyName: z.string().min(1, 'Technology name is required'),
  description: z.string().min(1, 'Description is required'),
  websiteURL: z.string().url('Please enter a valid URL'),
  docsUrl: z.string().url('Please enter a valid URL').optional(),
  changeLogUrl: z.string().url('Please enter a valid URL').optional(),
  c4ModelAbstraction: z.string().min(1, 'C4 model abstraction is required'),
  lightIcon: z.any().refine((val) => val !== null, { message: 'An icon is required' })
})
