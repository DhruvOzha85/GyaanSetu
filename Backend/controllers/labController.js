import Lab from '../models/Lab.js';

// @desc    Fetch all labs
// @route   GET /api/labs
// @access  Public
export const getLabs = async (req, res) => {
  try {
    const labs = await Lab.find({});
    res.json(labs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
