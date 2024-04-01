// ./deskStructure.js

export const myStructure = (S) =>
  S.list()
    .title('Base')
    .items([
      S.listItem()
        .title('Global')
        .child(
          S.list()
            .title('Global Settings')
            .items([
              S.listItem()
                .title('Metadata')
                .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
              S.listItem()
                .title('Footer')
                .child(S.document().schemaType('footer').documentId('footer')),
            ])
        ),
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Singleton pages')
            .items([
              S.listItem()
                .title('Index Page')
                .child(S.document().schemaType('indexPage').documentId('indexPage')),
              S.listItem()
                .title('About')
                .child(S.document().schemaType('about').documentId('about')),
              S.listItem()
                .title('Blogs')
                .child(S.document().schemaType('blogs').documentId('blogs')),
            ])
        ),
      ...S.documentTypeListItems().filter(
        (listItem) => ![
          'about',
          'blogs',
          'footer',
          'indexPage',
          'siteSettings',
        ].includes(listItem.getId())
      ),
    ])