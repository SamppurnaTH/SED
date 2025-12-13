const express = require('express');
const User = require('../models/User');
const { protectAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// -----------------------------------------------------------------------------
// GET /api/admin/users
// Optional query params: role (Student|Instructor), search, page, limit
// -----------------------------------------------------------------------------
router.get('/users', protectAdmin, async (req, res) => {
  try {
    const { role, search, page = 1, limit = 20 } = req.query;
    const q = {};
    if (role) q.role = role;
    if (search) {
      q.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const users = await User.find(q)
      .select('-password -resetPasswordToken -resetPasswordExpire')
      .skip(skip)
      .limit(parseInt(limit, 10))
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(q);

    res.json({ success: true, data: users, total });
  } catch (error) {
    console.error('Admin list users error:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// -----------------------------------------------------------------------------
// DELETE /api/admin/users
// Body: { ids: ["id1", "id2"] }
// Bulk delete students/instructors
// -----------------------------------------------------------------------------
router.delete('/users', protectAdmin, async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: 'ids array required' });
    }
    await User.deleteMany({ _id: { $in: ids } });
    res.json({ success: true, message: 'Users deleted', count: ids.length });
  } catch (error) {
    console.error('Admin delete users error:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

module.exports = router;
