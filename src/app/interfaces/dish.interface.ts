import RestaurantInterface from './restaurant.interface';

export default interface DishInterface {
  _id?: string;
  name: string;
  price: number;
  image: string;
  ingredients: string[];
  tags: string[];
  restaurant: RestaurantInterface;
}
