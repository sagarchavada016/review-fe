import { urls } from "../Urls";
import { ReviewService } from "../http/ReviewService";

export class ReviewApi {
  static listFreelancer(data) {
    console.log("Data", data);
    let skip = data.skip ? data.skip : 0;
    let limit = data.limit ? data.limit : 10;
    let url = `${urls.freelancer.list}?skip=${skip}&limit=${limit}`;
    return ReviewService.get(url, data);
  }

  static addFreelancer(data) {
    return ReviewService.post(urls.freelancer.add, data);
  }

  static addReview(data) {
    return ReviewService.post(urls.review.add, data);
  }

  static listReviewByFreelancer(data) {
    return ReviewService.get(urls.review.listByFreelancerId, data);
  }

  static listReviews(data) {
    return ReviewService.get(urls.review.listReviews, data);
  }
}
