import { Box, Typography, Divider } from "@mui/material";
import Stars from "../../../reusable/Stars";

export default function Reviews({ productData, isLoading, averageRating}) {
  // While loading, safely hold values
  const average = !isLoading ? averageRating : 0;

  const rawReviews = !isLoading ? productData?.reviews : [];
  // Normalize reviews into an array of plain objects
  
  const reviews = Array.isArray(rawReviews)
    ? [...rawReviews].reverse()
    : rawReviews && typeof rawReviews === "object"
    ? Object.values(rawReviews).reverse()
    : [];
  // const reviews = Array.isArray(rawReviews)
  //   ? rawReviews
  //   : rawReviews && typeof rawReviews === "object"
  //   ? Object.values(rawReviews)
  //   : [];

  const total = reviews.length;

  return (
    <>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
        Reviews
      </Typography>
      {/* Show loading spinner while fetching details */}
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
          <CircularProgress size={40} />
          <Typography variant="body2" sx={{ ml: 2, color: 'text.secondary' }}>
            Loading reviews ...
          </Typography>
        </Box>
      ) : (
        <>
        {/* Summary */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Stars rating={average} reviews={total} />
          <Typography variant="body2" color="text.secondary">
            {/* {total > 0 ? `${total} review${total === 1 ? "" : "s"}` : "No reviews yet"} */}
            {total > 0 ? ` review${total === 1 ? "" : "s"}` : "No reviews yet"}
          </Typography>
        </Box>

        {/* Review list */}
        {total > 0 ? (
          <Box sx={{ display: "grid", gap: 1.5 }}>
            {reviews.map((r, idx) => {
              // const rating = Number(r?.rating || r?.stars || 0) || 0;
              const rating = Number((r?.overall ?? 0).toFixed(2));
              const name = r?.full_name || "Customer";
              const title = r?.name || null;
              const comment = r?.comments || "";
              const date = r?.publish_date || r?.review_date || r?.created_at || null;
              const verified = r?.status === 0? 'Yes':''  || false;

              return (
                <Box
                  key={idx}
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    p: 2,
                    bgcolor: "background.paper",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
                    <Typography sx={{ fontWeight: 700 }}>
                      {name}
                      {verified && (
                        <Box
                          component="span"
                          sx={{
                            bgcolor: "#d1fae5",
                            px: 1,
                            py: 0.25,
                            borderRadius: 1,
                            ml: 1,
                            fontSize: 12,
                            color: "#065f46",
                          }}
                        >
                          Verified
                        </Box>
                      )}
                    </Typography>
                    <Stars rating={rating} reviews={null} />
                  </Box>
                  {title && (
                    <Typography sx={{ fontWeight: 600, mb: 0.5 }}>{title}</Typography>
                  )}
                  {comment && (
                    <Typography variant="body2" color="text.secondary">
                      {comment}
                    </Typography>
                  )}
                  {date && (
                    <Typography variant="caption" color="text.disabled" sx={{ display: "block", mt: 1 }}>
                      {String(date)}
                    </Typography>
                  )}
                </Box>
              );
            })}
          </Box>
        ) : (
          <Box sx={{
            border: "1px dashed",
            borderColor: "divider",
            borderRadius: 2,
            p: 2,
            bgcolor: "background.default",
          }}>
            <Typography variant="body2" color="text.secondary">
              There are no reviews for this product yet.
            </Typography>
          </Box>
        )}
        </>
      )}  
    </>
  );
}
