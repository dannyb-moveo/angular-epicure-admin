export default interface DishInterface {
  _id: string;
  name: string;
  price: number;
  image: string;
  restaurant: {
    name: string;
  };
  tags: string[];
  ingredients: string[];
}
