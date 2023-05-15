import { ProductDataType } from './../types/product.type';

export const ProductDetailData: ProductDataType = {
  _id: '63fe4576c00c0875541e7838',
  name: 'ghế chơi game asus rog chariot sl300c rgb',
  code: 'gcgarcsr7219',
  images: [
    {
      url: 'http://res.cloudinary.com/dlracnnpe/image/upload/v1677608294/product/1677608292919.jpg',
      public_id: 'product/1677608292919',
      _id: '63fe4576c00c0875541e7839',
    },
    {
      url: 'http://res.cloudinary.com/dlracnnpe/image/upload/v1677608298/product/1677608296782.jpg',
      public_id: 'product/1677608296782',
      _id: '63fe4576c00c0875541e783a',
    },
    {
      url: 'http://res.cloudinary.com/dlracnnpe/image/upload/v1677608303/product/1677608301190.jpg',
      public_id: 'product/1677608301190',
      _id: '63fe4576c00c0875541e783b',
    },
    {
      url: 'http://res.cloudinary.com/dlracnnpe/image/upload/v1677608308/product/1677608306854.jpg',
      public_id: 'product/1677608306854',
      _id: '63fe4576c00c0875541e783c',
    },
  ],
  price: 16679000,
  available: 996,
  description:
    '<ul class="product-summary-item-ul d-flex flex-wrap mb-0 content-collapse" id="js-tskt-item" style="box-sizing: border-box; display: flex !important; flex-wrap: wrap !important; margin: 10px 0px !important; max-height: 134px; position: relative; overflow: hidden; padding-left: 17px; color: rgb(51, 62, 72); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 13px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><li style="box-sizing: border-box; line-height: 1.75; list-style: circle; float: left; width: 616.91px;">Chống mài mòn, chống trầy xước và chịu nhiệt độ cao</li><li style="box-sizing: border-box; line-height: 1.75; list-style: circle; float: left; width: 616.91px;">Asus ROG Chariot RGB có tính thấm khí tốt và dễ làm sạch</li><li style="box-sizing: border-box; line-height: 1.75; list-style: circle; float: left; width: 616.91px;">Asus ROG Chariot RGB được làm bằng vải PU dễ khử nhiễm nhập khẩu, bọt lạnh có độ đàn hồi cao và khung bằng thép.</li><li style="box-sizing: border-box; line-height: 1.75; list-style: circle; float: left; width: 616.91px;">Được trang bị lưng ghế ngả góc lớn, tay vịn điều chỉnh 4D đa chức năng, bánh xe vạn năng cực kỳ yên tĩnh, nâng khí chứng nhận an toàn 4 cấp và chân đế năm sao bằng hợp kim nhôm cường độ cao, có</li></ul>',
  tags: [],
  brand: 'acer00',
  selling: 0,
  subcategory: {
    _id: '63fcf963543a6c7ec93c299c',
    name: 'chair',
  },
  status: 'active',
  createdAt: '2023-02-28T18:18:30.656Z',
  updatedAt: '2023-03-20T04:24:59.128Z',
  avg_review: 5,
};

export const ratingData = [
  {
    id: 1,
    name: '5 star',
    value: 2758,
    ratio: 50.2,
  },
  {
    id: 2,
    name: '4 star',
    value: 1063,
    ratio: 19.3,
  },
  {
    id: 3,
    name: '3 star',
    value: 997,
    ratio: 18.1,
  },
  {
    id: 4,
    name: '2 star',
    value: 408,
    ratio: 7.4,
    className: 'rating__warning',
  },
  {
    id: 5,
    name: '1 star',
    value: 274,
    ratio: 5,
    className: 'rating__error',
  },
];

export const reviewData = [
  {
    id: 1,
    rating: 4.2,
    content: 'Superb sweatshirt. I loved it. It is for winter.',
    images: [
      {
        url: 'https://themesbrand.com/velzon/html/default/assets/images/small/img-12.jpg',
      },
      {
        url: 'https://themesbrand.com/velzon/html/default/assets/images/small/img-11.jpg',
      },
      {
        url: 'https://themesbrand.com/velzon/html/default/assets/images/small/img-10.jpg',
      },
    ],
    author: 'Henry',
    dateCreated: '12 Jul, 21',
  },
  {
    id: 2,
    rating: 4.0,
    content: 'Great at this price, Product quality and look is awesome.',
    author: 'Nancy',
    dateCreated: '06 Jul, 21',
  },
  {
    id: 3,
    rating: 4.2,
    content: 'Good product. I am so happy.',
    author: 'Joseph',
    dateCreated: '06 Jul, 21',
  },
  {
    id: 4,
    rating: 4.2,
    content: 'Nice Product, Good Quality.',
    author: 'Jimmy',
    dateCreated: '24 Jul, 21',
  },
];
