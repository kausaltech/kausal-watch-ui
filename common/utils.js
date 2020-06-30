/* Common utility functions */

/* Resolve image url for an action */
/* If not available fallback on category or plan image */
export function getActionImageURL(plan, action, width, height) {
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

  const params = [];
  if (height) {
    params.push(`height=${height}`);
  }
  if (width) {
    params.push(`width=${width}`);
  }
  if (params.length) {
    url += `?${params.join('&')}`;
  }
  return url;
}

export function resizeImageUrl(plan) {
  return plan;
}
