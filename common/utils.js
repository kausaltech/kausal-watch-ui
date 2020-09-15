/* Common utility functions */

/* Resolve image url for an action */
/* If not available fallback on category or plan image */
export function getActionImageURL(plan, action) {
  let url;

  if (action.imageUrl) {
    url = action.imageUrl;
  } else {
    action.categories.forEach((cat) => {
      if (url) return;
      let parent = cat;
      while (parent) {
        if (parent.imageUrl) {
          url = parent.imageUrl;
          return;
        }
        parent = parent.parent;
      }
    });
  }
  if (!url) {
    url = plan.imageUrl;
  }
  return url;
}

export function resizeImageUrl(plan) {
  return plan;
}

export function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}
