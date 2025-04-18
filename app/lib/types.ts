export interface GoogleBook {
  kind: 'books#volumes'
  totalItems: number
  items: {
    id: string
    volumeInfo: {
      title: string
      subtitle: string
      authors: string[]
      description: string
      publishedDate: string
      imageLinks: {
        medium: string
      }
      industryIdentifiers: {
        type: string
        identifier: string
      }[]
    }
  }[]
}
