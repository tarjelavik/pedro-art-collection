import {FaTag} from 'react-icons/fa'
import {editorialState, accessState, label, altLabel, broader, domain} from '../../props'
import {defaultFieldsets} from '../../fieldsets'
import {coalesceLabel} from '../../helpers/helpers.js'

export default {
  name: 'StorageType',
  title: 'Storage type',
  type: 'document',
  initialValue: {
    editorialState: 'published',
    accessState: 'open',
  },
  icon: FaTag,
  fieldsets: defaultFieldsets,
  fields: [
    editorialState,
    accessState,
    label,
    altLabel,
    {
      name: 'activityStream',
      title: 'Aktivitetsstrøm',
      titleEN: 'Activity stream',
      description: 'Events and activities connected to this object',
      type: 'array',
      of: [{type: 'Creation'}],
    },
  ],
  preview: {
    select: {
      title: 'label',
      broader: 'broader.0.label.nor',
    },
    prepare(selection) {
      const {title, broader} = selection
      return {
        title: coalesceLabel(title),
        subtitle: broader ? `⬆️` + broader : '🔝 Toppkonsept',
      }
    },
  },
}
