import {defineConfig} from 'sanity'
import {codeInput} from '@sanity/code-input'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {myStructure} from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'Portfolio v5',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,

  plugins: [
    codeInput(),
    deskTool({
      structure: myStructure,
    }), 
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})
