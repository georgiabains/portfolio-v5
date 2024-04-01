import { 
  DocumentsIcon, 
  EarthGlobeIcon, 
  HomeIcon, 
  PublishIcon, 
  UserIcon 
} from '@sanity/icons'

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
                .title('About')
                .icon(UserIcon)
                .child(S.document().schemaType('about').documentId('about')),
              S.listItem()
                .title('Blogs Page')
                .icon(PublishIcon)
                .child(S.document().schemaType('blogs').documentId('blogs')),
              S.listItem()
                .title('Index Page')
                .icon(HomeIcon)
                .child(S.document().schemaType('indexPage').documentId('indexPage')),
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