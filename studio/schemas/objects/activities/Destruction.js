import {timespan, carriedOutBy, tookPlaceAt} from '../../props'

export default {
  name: 'Destruction',
  type: 'object',
  title: 'Ødeleggelse',
  titleEN: 'Destruction',
  fields: [
    {
      name: 'hasType',
      title: 'Klassifisert som',
      titleEN: 'Classified as',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'EventType'}],
        },
      ],
    },
    carriedOutBy,
    timespan,
    tookPlaceAt,
  ],
  preview: {
    select: {
      date: 'productionDate',
    },
    prepare(selection) {
      const {date} = selection
      return {
        title: `Ending${date ? ', dated ' + date : ''}`,
      }
    },
  },
}
