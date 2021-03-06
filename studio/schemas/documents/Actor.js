import {FaUser} from 'react-icons/fa'
import {
  editorialState,
  accessState,
  referredToBy,
  labelSingleton,
  identifiedBy,
  memberOf,
  image,
} from '../props'
import {timespanAsString} from '../helpers/helpers'

export default {
  name: 'Actor',
  title: 'Actor',
  type: 'document',
  initialValue: {
    editorialState: 'draft',
    accessState: 'secret',
  },
  icon: FaUser,
  fieldsets: [
    {
      name: 'state',
      title: 'Status',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'minimum',
      title: 'Basic metadata',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'representation',
      title: 'Hovedbilde og IIIF manifest',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'relations',
      title: 'Relations to other stuff',
      options: {collapsible: true, collapsed: false},
    },
  ],
  fields: [
    editorialState,
    accessState,
    labelSingleton,
    {
      ...identifiedBy,
      fieldset: 'minimum',
    },
    {
      ...referredToBy,
      fieldset: 'minimum',
    },
    {
      name: 'hasType',
      title: 'Klassifisert som',
      titleEN: 'Classified as',
      type: 'array',
      fieldset: 'minimum',
      of: [
        {
          type: 'reference',
          to: [{type: 'ActorType'}],
        },
      ],
    },
    {
      ...image,
      fieldset: 'representation',
    },
    memberOf,
    {
      name: 'activityStream',
      title: 'Aktivitetsstrøm',
      titleEN: 'Activity stream',
      description:
        'En aktivitetsstrøm samler alle hendelser knyttet til denne aktøren. Fødsel og død er "inline" til personen, mens andre aktiviteter som ekteskap er egne dokument.',
      descriptionEN: 'Add all known events this smuck did',
      type: 'array',
      of: [
        {type: 'Birth'},
        {type: 'reference', to: [{type: 'Activity'}]},
        {type: 'Move'},
        {type: 'Joining'},
        {type: 'Leaving'},
        {type: 'Death'},
      ],
      options: {
        editModal: 'fullscreen',
      },
    },
  ],
  preview: {
    select: {
      title: 'label',
      bb: 'activityStream.0.timespan.0.beginOfTheBegin',
      eb: 'activityStream.0.timespan.0.endOfTheBegin',
      date: 'activityStream.0.timespan.0.date',
      be: 'activityStream.0.timespan.0.beginOfTheEnd',
      ee: 'activityStream.0.timespan.0.endOfTheEnd',
      media: 'image',
    },
    prepare(selection) {
      const {title, media, bb, eb, date, be, ee} = selection
      const timespan = timespanAsString(bb, eb, date, be, ee, 'nb')

      return {
        title: title,
        subtitle: `${timespan ? 'Født: ' + timespan : ''}`,
        media: media,
      }
    },
  },
}
