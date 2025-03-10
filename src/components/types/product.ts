export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: {
    _id: string;
    name: string;
  };
  imageUrls: string[];
  isActive: boolean;
  averageRating?: number;
  ratingCount?: number;
  slug?: string;
  createdAt: string;
  updatedAt: string;
  offerPrice: number;
}
