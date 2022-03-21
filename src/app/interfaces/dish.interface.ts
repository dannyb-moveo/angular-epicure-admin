export default interface DishInterface {
  name: string;
  price: number;
  image: string;
  restaurant: {
    name: string;
  };
  tags: string[];
  ingredients: string[];
}
