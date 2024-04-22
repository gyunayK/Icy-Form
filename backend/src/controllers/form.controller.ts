import FormModel from '../model/form.model'
import puppeteer from 'puppeteer'
import { ChatOpenAI } from '@langchain/openai'
import { CheerioWebBaseLoader } from 'langchain/document_loaders/web/cheerio'
import { Request, Response } from 'express'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { OpenAIEmbeddings } from '@langchain/openai'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { createRetrievalChain } from 'langchain/chains/retrieval'

export const scrapeUrlForMetadata = async (req: Request, res: Response) => {
  const url = req.body.url

  if (!url) {
    return res.status(400).send({ message: 'URL parameter is missing.' })
  }

  try {
    const loader = new CheerioWebBaseLoader(url)
    const urlContent = await loader.load()

    const splitter = new RecursiveCharacterTextSplitter()
    const splitDocs = await splitter.splitDocuments(urlContent)

    const embeddings = new OpenAIEmbeddings()
    const vectorstore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings)

    const chatModel = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      model: 'gpt-3.5-turbo-0125'
    })

    const prompt =
      ChatPromptTemplate.fromTemplate(`The GPT will browse to a provided link, extract information specifically about a technology, and generate metadata including the name of the technology, a concise 120-character description, the URL to the technology’s documentation, and the primary color theme of the website represented as an object with a 'ColorTheme' field, which includes 'class' (hexadecimal color) and 'name' (a capitalized descriptive color name like 'Midnight Black'). Additionally, it will identify and provide the URL to the update or changelog page, which could be labeled variably as 'release notes' or similar terms. It will focus exclusively on the factual aspects of the technology, effectively filtering out any marketing language or promotional content to provide an objective summary. When searching for documentation or update URLs, the GPT will recognize variations like 'docs,' 'documentation,' 'release notes,' or other relevant terms, even if they aren't explicitly mentioned in the URL. It will exercise greater caution in ensuring accuracy and relevancy, particularly verifying the technology specified in the URL matches the information extracted, and ensuring that the colour theme names and classes accurately reflect the actual colour theme of the website or the technology logo colour, to avoid mismatches like bright blue being named 'Midnight Black'. The results will be formatted in proper JSON structure, providing structured outputs with keys for 'name,' 'desc,' 'docs,' 'colourTheme,' and 'updateUrl,' where 'colourTheme' is an object containing the 'class' and 'name'. This assumes all necessary information is available on the page without requiring additional context.

        <context>
        {context}
        </context>

        Question: {input}`)

    const documentChain = await createStuffDocumentsChain({
      llm: chatModel,
      prompt
    })

    const retriever = vectorstore.asRetriever()
    const retrievalChain = await createRetrievalChain({
      combineDocsChain: documentChain,
      retriever
    })

    const result = await retrievalChain.invoke({
      input: url
    })
    console.log('Result:', result)

    res.json({
      message: 'Data extracted successfully',
      data: result
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Failed to scrape the URL', error })
  }
}

// export const getUrlTextContent = async (req: Request, res: Response) => {
//   try {
//     const { url } = req.params

//     const browser = await puppeteer.launch()
//     const page = await browser.newPage()
//     await page.goto(url, { waitUntil: 'networkidle0' })

//     let docsUrls = await page.$$eval('a[href*="docs"]', (links) => links.map((link) => link.href))

//     if (docsUrls.length === 0) {
//       docsUrls = await page.$$eval('a[href*="documentation"]', (links) =>
//         links.map((link) => link.href)
//       )
//     }

//     let docs = 'No URL found'
//     if (docsUrls.length > 0) {
//       const parsedDocsUrl = new URL(docsUrls[0])
//       docs = `${parsedDocsUrl.protocol}//${parsedDocsUrl.hostname}`
//     }

//     await browser.close()
//     res.status(200).json({ docs })
//   } catch (error) {
//     console.error('Error extracting text:', error)
//     res.status(500).json({ error })
//   }
// }

// export const postTechnology = async (req: Request, res: Response) => {
//   try {
//     const lightIconFilename = req.files['lightIcon'][0].filename
//     const darkIconFilename = req.files['darkIcon'][0].filename

//     const newForm = new FormModel({
//       ...req.body, // spread form fields
//       lightIcon: lightIconFilename,
//       darkIcon: darkIconFilename
//     })

//     const savedForm = await newForm.save()

//     res.status(200).json(savedForm)
//   } catch (error) {
//     console.error('Error saving form data:', error)
//     res.status(500).json({ error })
//   }
// }

// export const getTechnologyRequests = async (req: Request, res: Response) => {
//   try {
//     const requests = await FormModel.find({})
//     const requestsWithImages = requests.map((request) => ({
//       ...request.toObject(),
//       lightIconUrl: `${req.protocol}://${req.get('host')}/uploads/${request.lightIcon}`,
//       darkIconUrl: `${req.protocol}://${req.get('host')}/uploads/${request.darkIcon}`
//     }))

//     res.json(requestsWithImages)
//   } catch (error) {
//     res.status(500).json({ error })
//   }
// }

// export const checkTechnologyNameExists = async (req: Request, res: Response) => {
//   try {
//     const { name } = req.body
//     const technology = await FormModel.findOne({ technologyName: name })
//     res.json({ exists: !!technology })
//   } catch (error) {
//     res.status(500).json({ error })
//   }
// }
