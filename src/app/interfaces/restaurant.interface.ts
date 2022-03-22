import ChefInterface from './chef.interface';
import DishInterface from './dish.interface';

export default interface RestaurantInterface {
  _id: string;
  name: string;
  image: string;
  chef: ChefInterface;
  signatureDish: DishInterface;
  isPopular: boolean;
}
