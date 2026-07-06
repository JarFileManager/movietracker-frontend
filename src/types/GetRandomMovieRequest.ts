export interface GetRandomMovieRequest {

    genreIds:number[];

    fromYear:number;

    toYear:number;

    minimumRating:number;

    includeAdult:boolean;

}