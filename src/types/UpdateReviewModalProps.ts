export interface UpdateReviewModalProps {

    initialRating:number;

    initialComment:string;

    onSubmit:(rating:number,comment:string)=>void;

    onSkip:()=>void;

}