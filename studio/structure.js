import { DocumentsIcon, EarthGlobeIcon } from '@sanity/icons'

export const baseStructure = (S) =>
  S.list()
    .title('Base')
    .items([
      S.listItem()
        .title('Global')
        .icon(EarthGlobeIcon)
        .child(
          S.list()
            .title('Global Settings')
            .items([
              S.listItem()
                .title('Metadata')
                .icon(EarthGlobeIcon)
                .child(S.document().schemaType('metadata').documentId('metadata')),
              S.listItem()
                .title('Footer')
                .child(S.document().schemaType('footer').documentId('footer')),
            ])
        ),
      S.listItem()
        .title('Pages')
        .icon(DocumentsIcon)
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
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => ![
          'about',
          'blogs',
          'footer',
          'indexPage',
          'metadata',
        ].includes(listItem.getId())
      ),
    ])