export interface ProductComponentInterface {
  data: any;
  type: string;
};

export interface ProductCategory {
  id: number;
  name: string;
  images: string[],
  parent: number;
  productsCount: number;
};