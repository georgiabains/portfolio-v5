// ./deskStructure.js

export const myStructure = (S) =>
  S.list()
    .title('Base')
    .items([
      S.listItem()
        .title('Settings')
        .child(
          S.list()
            // Sets a title for our new list
            .title('Settings Documents')
            // Add items to the array
            // Each will pull one of our new singletons
            .items([
              S.listItem()
                .title('Metadata')
                .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
              S.listItem()
                .title('Site Colors')
                .child(S.document().schemaType('colors').documentId('colors')),
            ])
        ),
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            // Sets a title for our new list
            .title('Singleton pages')
            // Add items to the array
            // Each will pull one of our new singletons
            .items([
              S.listItem()
                .title('About')
                .child(S.document().schemaType('about').documentId('about')),
            ])
        ),
      // We also need to remove the new singletons from the main list
      ...S.documentTypeListItems().filter(
        (listItem) => !['siteSettings', 'colors', 'navigation', 'about'].includes(listItem.getId())
      ),
    ])