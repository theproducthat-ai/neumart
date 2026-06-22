export type BannerConfig = {
  id: string;
  imageUrl: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  linkTarget: string;
  isActive: boolean;
};

export const CAROUSEL_INTERVAL_MS = 4000;

export const banners: BannerConfig[] = [
  {
    id: "banner-01",
    imageUrl:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1600&h=500&fit=crop&q=80",
    title: "Farm-Fresh Vegetables",
    subtitle: "Straight from the farm to your door — order by 10 AM for same-day delivery",
    ctaText: "Shop Vegetables",
    linkTarget: "/products?category=vegetables",
    isActive: true,
  },
  {
    id: "banner-02",
    imageUrl:
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=1600&h=500&fit=crop&q=80",
    title: "Fresh Fruits Daily",
    subtitle: "Hand-picked seasonal favourites — mangoes, apples, bananas and more",
    ctaText: "Shop Fruits",
    linkTarget: "/products?category=fruits",
    isActive: true,
  },
  {
    id: "banner-03",
    imageUrl:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=1600&h=500&fit=crop&q=80",
    title: "Dairy & Breakfast Essentials",
    subtitle: "Fresh milk, paneer, curd and butter — every morning, delivered fresh",
    ctaText: "Shop Dairy",
    linkTarget: "/products?category=dairy",
    isActive: true,
  },
  {
    id: "banner-04",
    imageUrl:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600&h=500&fit=crop&q=80",
    title: "Freshly Baked Every Morning",
    subtitle: "Breads, croissants and rolls baked fresh — order before 9 AM",
    ctaText: "Shop Bakery",
    linkTarget: "/products?category=bakery",
    isActive: true,
  },
  {
    id: "banner-05",
    imageUrl:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1600&h=500&fit=crop&q=80",
    title: "Pantry Staples",
    subtitle: "Rice, dal, atta, oil and everything your kitchen needs",
    ctaText: "Shop Staples",
    linkTarget: "/products?category=staples",
    isActive: true,
  },
];
