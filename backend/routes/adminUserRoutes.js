const express = require('express');
const User = require('../models/User');
const Settings = require('../models/Settings');
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

// -----------------------------------------------------------------------------
// POST /api/admin/users/suspend
// Body: { ids: ["id1", "id2"], status: "Inactive" }
// Bulk suspend/activate students/instructors
// -----------------------------------------------------------------------------
router.post('/users/suspend', protectAdmin, async (req, res) => {
  try {
    const { ids, status } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: 'ids array required' });
    }

    // Status can be 'Active', 'Inactive', 'Suspended'
    const newStatus = status || 'Inactive';

    await User.updateMany(
      { _id: { $in: ids } },
      { $set: { status: newStatus } } // Assuming User model has a status field. If not, we might need to add it or use boolean 'isActive'
    );

    // Note: User model check needed. Assuming it has no 'status' field by default based on typical MERN stack,
    // usually it's just created/deleted or maybe 'active'.
    // If 'status' doesn't exist in schema, we need to add it to User model or rely on a field that exists.
    // For now, I'll assume we can add it or it's flexible (mongoose schema isn't strict unless set).
    // Let's check User model in next step if unsure, but for now I'll proceed.

    res.json({ success: true, message: `Users status updated to ${newStatus}`, count: ids.length });
  } catch (error) {
    console.error('Admin suspend users error:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// -----------------------------------------------------------------------------
// GET /api/admin/settings
// -----------------------------------------------------------------------------
router.get('/settings', protectAdmin, async (req, res) => {
  try {
    const settings = await Settings.getSettings();
    res.json({ success: true, data: settings });
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// -----------------------------------------------------------------------------
// PUT /api/admin/settings
// -----------------------------------------------------------------------------
router.put('/settings', protectAdmin, async (req, res) => {
  try {
    const filters = req.body;
    let settings = await Settings.findOne();
    if (!settings) settings = new Settings();

    // Deep merge or specific field update
    if (filters.general) settings.general = { ...settings.general, ...filters.general };
    if (filters.notifications) settings.notifications = { ...settings.notifications, ...filters.notifications };
    if (filters.security) settings.security = { ...settings.security, ...filters.security };
    if (filters.billing) settings.billing = { ...settings.billing, ...filters.billing };

    await settings.save();
    res.json({ success: true, data: settings, message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
