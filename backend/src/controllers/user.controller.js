const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

exports.getUserProfile = asyncHandler(async (req, res, next) => {
  res.status(200).json(
    new ApiResponse(200, {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      profile: req.user.profile,
      stats: req.user.stats,
      settings: req.user.settings,
    }),
    "Got user details successfully"
  );
});
