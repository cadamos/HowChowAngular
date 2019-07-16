import { Tag } from './tag'

export class Dish {

    readonly d_id : number;

    img : string;

    name : string;

    description : string;

    tagsAssoc : Tag[];

    ratingAvg : number;

    restaurant : string;
}
