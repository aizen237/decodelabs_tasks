const db = require('../config/db');

exports.getAllApplications = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM applications ORDER BY date_applied DESC');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
};

exports.createApplication = async (req, res) => {
  try {
    const { company, role, status, date_applied, link, notes } = req.body;

    if (!company || !role || !date_applied) {
      return res.status(400).json({ error: 'Company, role, and date applied are required' });
    }

    const [result] = await db.query(
      'INSERT INTO applications (company, role, status, date_applied, link, notes) VALUES (?, ?, ?, ?, ?, ?)',
      [company, role, status || 'Applied', date_applied, link || null, notes || null]
    );

    res.status(201).json({ id: result.insertId, message: 'Application created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create application' });
  }
};

exports.updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const [result] = await db.query(
      'UPDATE applications SET status = ? WHERE id = ?',
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.status(200).json({ message: 'Application updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update application' });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM applications WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.status(200).json({ message: 'Application deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete application' });
  }
};