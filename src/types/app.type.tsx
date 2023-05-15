export interface SubcategoryDataType {
  _id: string;
  name: string;
}

export interface CategoryDataType {
  _id: string;
  name: string;
  subcategory: SubcategoryDataType[];
}

export interface MenuItemsType {
  title: string;
  path: string;
  subMenu: boolean;
  id: number;
}
