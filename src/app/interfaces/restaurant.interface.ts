import ChefInterface from './chef.interface';
import DishInterface from './dish.interface';

export default interface RestaurantInterface {
  name: string;
  image: string;
  chef: ChefInterface;
  signatureDish: DishInterface;
  isPopular: boolean;
}
