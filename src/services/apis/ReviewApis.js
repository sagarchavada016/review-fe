import { urls } from "../Urls";
import { ReviewService } from "../http/ReviewService";

export class ReviewApi {
  static listFreelancer(data) {
    return ReviewService.get(urls.review.list_freelancer, data);
  }
}
