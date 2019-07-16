import { User } from './user';
import { Dish } from './dish';

export class Review {
    r_id: number;
    dish: Dish;
    user: User;
    rating: number;
    comment: string;
    userRating: number;
    r_date : number;
    
}

