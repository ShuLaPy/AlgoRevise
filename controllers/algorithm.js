import { grade_enum } from "./enums/card.enum.js";

const calculateEaseFactor = (ease_factor, quality) => {
  ease_factor =
    ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

  if (ease_factor < 1.3) ease_factor = 1.3;

  return ease_factor;
};

const calculateInterval = (quality, review_count, interval, ease_factor) => {
  if (quality < 3) {
    review_count = 0;
    interval = 1;
  } else {
    review_count += 1;
    if (review_count == 1) interval = 1;
    else if (review_count == 2) interval = 6;
    else interval = Math.round(interval * ease_factor);
  }
  return {
    review_count,
    interval,
  };
};

const getNextReviewDate = (interval) => {
  const next_review_date = new Date();
  next_review_date.setDate(next_review_date.getDate() + interval);
  return next_review_date;
};

const schedulerAlgorithm = (card) => {
  let { review_count, interval, ease_factor, grade, status } = card;
  const quality = grade_enum[grade];
  ease_factor = calculateEaseFactor(ease_factor, quality);
  const data = calculateInterval(quality, review_count, interval, ease_factor);
  review_count = data.review_count;
  interval = data.interval;
  if (review_count < 3 || quality < 3) {
    status = "learning";
  } else {
    status = "review";
  }

  const next_review_date = getNextReviewDate(interval);

  return {
    ease_factor,
    review_count,
    interval,
    status,
    next_review_date,
  };
};

export default schedulerAlgorithm;
