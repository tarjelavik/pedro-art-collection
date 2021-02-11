import {FaMarker} from 'react-icons/fa'
import jsonata from 'jsonata'
import {editorialState, accessState, label, language, labelSingleton, identifiedBy} from '../props'
import {defaultFieldsets} from '../fieldsets'

export default {
  title: 'Text',
  name: 'writtenText',
  type: 'document',
  initialValue: {
    editorialState: 'draft',
    accessState: 'secret',
  },
  icon: FaMarker,
  fieldsets: defaultFieldsets,
  fields: [
    editorialState,
    accessState,
    labelSingleton,
    identifiedBy,
    {
      name: 'slug',
      title: 'Slug',
      titleEN: 'Slug',
      description: 'Some frontends will require a slug to be set to be able to show the post',
      type: 'slug',
      options: {
        source: 'label',
        maxLength: 96,
      },
    },
    {
      name: 'creator',
      title: 'Skaper',
      titleEN: 'Author',
      description:
        'Registrer en eller flere aktører som har skapt dette dokumentet, gjerne med hvilken rolle de hadde.',
      type: 'array',
      of: [
        {
          type: 'contributionAssignment',
        },
      ],
    },
    language,
    {
      name: 'hasType',
      title: 'Klassifisert som',
      titleEN: 'Classified as',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'textType'}],
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'categories',
      title: 'Kategorier',
      titleEN: 'Categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'concept'}],
        },
      ],
    },
    {
      name: 'hasTranslation',
      title: 'Oversettelser',
      titleEN: 'Has translation',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'writtenText'}],
        },
      ],
    },
    {
      name: 'publishedAt',
      title: 'Publikasjonsdato',
      titleEN: 'Published at',
      description: 'This can be used to schedule post for publishing',
      type: 'datetime',
    },
    {
      name: 'excerpt',
      title: 'Sammendrag',
      titleEN: 'Excerpt',
      description:
        'This ends up on summary pages, on Google, when people share your post in social media.',
      type: 'blockContent',
    },
    {
      name: 'body',
      title: 'Tekst',
      titleEN: 'Body',
      type: 'blockContent',
    },
    {
      name: 'mainImage',
      title: 'Hovedbilde',
      titleEN: 'Main image',
      type: 'digitalImageObject',
    },

    {
      name: 'documentedIn',
      title: 'Dokumentert i',
      titleEN: 'Documented in',
      type: 'array',
      of: [
        {
          type: 'file',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'label',
      blocks: 'excerpt',
      media: 'mainImage',
    },
    prepare(selection) {
      const {title, blocks, media} = selection
      const expression = jsonata('nor[0]')
      const block = expression.evaluate(blocks)

      return {
        title: title,
        description: block
          ? block.children
              .filter((child) => child._type === 'span')
              .map((span) => span.text)
              .join('')
          : 'No description',
        media: media,
      }
    },
  },
}
