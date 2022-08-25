const router = require("express").Router();

const {
  updateMerchantGroups,
  updateMerchantApi,
  removeGroup,
  updateGroupsItems,
  updateProfileImage
} = require("../Controllers/crud.controllers");

router.put("/merchant/:id", updateMerchantApi);
router.put("/profile-image/:id", updateProfileImage);
router.put("/groups/:id", updateMerchantGroups);
router.put("/remove-groups/:id", removeGroup);
router.put("/update-groups/:id", updateGroupsItems);

module.exports = router;
