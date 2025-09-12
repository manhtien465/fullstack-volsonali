export interface Game {
  id: number
  name: string
  desc?: string
  slug:string
  full_description?:string,
  image: {
    url:string;
    alternativeText:string,
  }[]
  category_html: {
    id:number,
    name:string,
    slug:string
  }
  url: string
  pros:string[],
  cons:string[],
  release_date:Date,
  developer:string,
  color?: string
  is_display_home:boolean,
  is_editor_choice:boolean,
  featured?: boolean
  large?: boolean
  rating?: number
  plays?: string
  // tags?: string[]
  createdAt?: string
  updatedAt?: string
}

export interface GameDetail extends Game {
  fullDescription: string
  screenshots?: string[]
 
  releaseDate?: string
  size?: string
  version?: string
  requirements?: string[]
  
}
