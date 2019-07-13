import { User } from './user';
import { Dish } from './dish';

export class Review {
    r_id: number;
    Dish: Dish;
    User: User;
    rating: number;
    userRating: number;
    date : string;
    r_comment: string;
}

