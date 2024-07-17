import { urls } from "../Urls";
import { ReviewService } from "../http/ReviewService";

export class ReviewApi {
  static listFreelancer(data) {
    let skip = data.skip ? data.skip : 0;
    let limit = data.limit ? data.limit : 10;
    let ordering = data.ordering;
    let url = `${urls.freelancer.list}?skip=${skip}&limit=${limit}&ordering=${ordering}`;
    return ReviewService.get(url, data);
  }

  static addFreelancer(data) {
    return ReviewService.post(urls.freelancer.add, data);
  }

  static addReview(data) {
    let bodyData = {
      reviewer_name: data.reviewer_name,
      rating: data.rating,
      review_text: data.review_text,
    };
    let url = `${urls.review.add}${data.freelancerId}/`;
    return ReviewService.post(url, bodyData);
  }

  static listReviewByFreelancer(data) {
    let freelancerId = data.freelancerId;
    let skip = data.skip ? data.skip : 0;
    let limit = data.limit ? data.limit : 10;
    let ordering = data.ordering;
    let url = `${urls.review.listByFreelancerId}${freelancerId}?skip=${skip}&limit=${limit}&ordering=${ordering}`;
    return ReviewService.get(url, data);
  }

  static listReviews(data) {
    let skip = data.skip ? data.skip : 0;
    let limit = data.limit ? data.limit : 10;
    let ordering = data.ordering;
    let url = `${urls.review.listReviews}?skip=${skip}&limit=${limit}&ordering=${ordering}`;
    return ReviewService.get(url, data);
  }

  static getFreelancerDetails(data) {
    let freelancerId = data.freelancerId;
    let url = `${urls.freelancer.details}${freelancerId}`;
    return ReviewService.get(url, data);
  }

  static getReviewsAvg(data) {
    let url = `${urls.review.averageReview}`;
    return ReviewService.get(url, data);
  }

  static getFreelancerWiseAvgReview(data) {
    let freelancerId = data.freelancerId;
    let url = `/freelancers/${freelancerId}/average-rating/`;
    return ReviewService.get(url, data);
  }
}
