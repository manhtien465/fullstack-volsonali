
type Image = {
  id: string;
  documentId: string;
  url: string;
  alternativeText: string | null;
  name: string;
}

type ComponentType =
  | "layout.hero"
  | "layout.card-grid"
  | "layout.section-heading"
  | "layout.content-with-image"
  | "layout.price-grid"
  | "layout.price-grid-payment"
  | "layout.image-carousel"
  | "layout.content-with-video"

  | "blocks.video"
  | "blocks.text";

interface Base<T extends ComponentType, D extends {} = {}> {
  __component: T;
  id: string;
  createdAt: string;
  updatedAt: string;
  data: D;
}

export interface NavLink {
  href: string;
  text: string;
  isExternal: boolean;
  isPrimary: boolean;
}

export type Block =
  HeroProps |
  CardGridProps |
  SectionHeadingProps |
  ContentWithImageProps |
  PriceGridProps |
  VideoProps |
  TextProps |
  PriceGridPaymentProps |
  ImageCarouselProps |
  ContentWithVideoProps |
  any
  ;

export interface HeroProps extends Base<"layout.hero"> {
  heading: string;
  text: string;
  topLink?: NavLink;
  buttonLink?: NavLink[];
  image: {
    url: string;
    alternativeText: string | null;
    name: string;
  };
}

export interface CardGridProps extends Base<"layout.card-grid"> {
  cardItems: {
    id: string;
    heading: string;
    text: string;
    icon: string;
  }[];
}

export interface SectionHeadingProps extends Base<"layout.section-heading"> {
  heading: string;
  subHeading: string;
  text: string;
  centered?: boolean;
}

export interface ContentWithImageProps extends Base<"layout.content-with-image"> {
  reverse: boolean;
  image: {
    url: string;
    name: string;
  };
  heading: string;
  subHeading: string;
  text: string;
}

export interface PriceGridProps extends Base<"layout.price-grid"> {
  priceCard: {
    id: string;
    heading: string;
    description: string;
    price: string;
    selected: boolean;
    feature: {
      id: string;
      description: string;
    }[];
    link: NavLink;
  }[];
}

export interface PriceGridPaymentProps extends Base<"layout.price-grid-payment"> {
  priceCard: {
    id: string;
    heading: string;
    description: string;
    price: string;
    priceTitle: string
    selected: boolean;
    feature: {
      id: string;
      description: string;
    }[];
    link: NavLink;
  }[];
}

export interface VideoOnlyProps  {
  title: string;
  description: string;
  videoUrl: string;
  isYoutubeVideo:string,
  video: {
    videoId: string;
    start: string;
    end: string;
  },
  image: Image;
  videoInternal: {
    id: string;
    documentId: string;
    url: string;
    alternativeText: string | null;
    name: string;
  }
}

export interface VideoProps extends Base<"blocks.video"> ,VideoOnlyProps{
}

export interface TextProps extends Base<"blocks.text"> {
  content: string;
}


export interface ImageCarouselProps extends Base<"layout.image-carousel"> {
  width: number,
  height: number,
  imageItems: {
    id: number;
    title: string
    description: string
    image: {
      url: string;
      alternativeText: string | null;
      name: string;
    };
    width: number,
    height: number,
    link: NavLink
  }[]
}


export interface ContentWithVideoProps extends Base<"layout.content-with-video"> {
  reverse: boolean;
  video: VideoOnlyProps
  heading: string;
  subHeading: string;
  text: string;
  isDisplayText:boolean
  
}