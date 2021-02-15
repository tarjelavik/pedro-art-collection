export default {
  widgets: [
    {
      name: 'structure-menu',
      layout: {width: 'medium'},
    },
    {
      name: 'document-list',
      options: {
        title: 'Recently edited',
        order: '_updatedAt desc',
        limit: 10,
        types: ['HumanMadeObject'],
      },
      layout: {width: 'small'},
    },
    {
      name: 'muna-docs-widget',
      layout: {width: 'small'},
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '6023954f821c0551cfaf6343',
                  title: 'Sanity Studio',
                  name: 'pedro-art-collection-studio',
                  apiId: '37fb0372-4d7a-4659-8304-5bf52294add2',
                },
              ],
            },
          },
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/tarjelavik/pedro-art-collection',
            category: 'Code',
          },
        ],
      },
    },
  ],
}
