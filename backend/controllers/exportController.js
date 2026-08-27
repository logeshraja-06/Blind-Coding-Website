import { QuizAttempt } from '../models/QuizAttempt.js';

export const exportPdf = async (req, res) => {
  try {
    const eventId = 'BLIND_CODING_2026';
    const attempts = await QuizAttempt.find({ eventId, status: 'COMPLETED' })
      .sort({ score: -1, timeTakenSeconds: 1 });

    // Generate clean printable HTML report with official styling
    const rows = attempts
      .map(
        (a, i) => `
      <tr style="border-bottom: 1px solid #C8D696;">
        <td style="padding: 8px; font-weight: bold; text-align: center;">#${i + 1}</td>
        <td style="padding: 8px;"><strong>${a.studentName}</strong></td>
        <td style="padding: 8px; font-family: monospace;">${a.registerNumber}</td>
        <td style="padding: 8px;">${a.department || 'CSE'}</td>
        <td style="padding: 8px;">${a.year} - ${a.class} (${a.section})</td>
        <td style="padding: 8px; font-weight: bold; color: #3971B8; text-align: center;">${a.score !== null ? a.score : 0} / 25</td>
        <td style="padding: 8px; text-align: center;">${a.percentage !== null ? a.percentage : 0}%</td>
        <td style="padding: 8px; text-align: center;">${a.totalWarnings || 0}</td>
        <td style="padding: 8px; font-family: monospace; text-align: center;">${a.timeFormatted || '--:--'}</td>
        <td style="padding: 8px; color: #343B1B; font-weight: 600; text-align: center;">${a.status}</td>
      </tr>`
      )
      .join('');

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>BLIND CODING 2026 — Official Participant Report</title>
      <style>
        body { font-family: Arial, sans-serif; color: #343B1B; background: #FBFCEE; padding: 25px; margin: 0; }
        .header { text-align: center; border-bottom: 3px solid #3971B8; padding-bottom: 15px; margin-bottom: 20px; }
        .title { color: #3971B8; font-size: 22px; font-weight: bold; margin: 5px 0; }
        .dept { font-size: 13px; font-weight: bold; color: #343B1B; text-transform: uppercase; }
        .sub { font-size: 11px; color: #555; margin: 3px 0; }
        .coordinators { display: flex; justify-content: space-between; font-size: 11px; margin: 15px 0; background: #fff; padding: 10px 14px; border-radius: 8px; border: 1px solid #C8D696; }
        table { width: 100%; border-collapse: collapse; background: #ffffff; font-size: 11px; border-radius: 6px; overflow: hidden; }
        th { background: #3971B8; color: #ffffff; padding: 10px 8px; text-align: left; font-size: 11px; }
        .footer { margin-top: 25px; font-size: 10px; text-align: center; color: #777; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="dept">Department of Computer Science and Engineering</div>
        <div class="sub">Academic Year 2025–2026 • Organized by CSE Association (TECH FORCE) & CSI Student Chapter</div>
        <div class="title">BLIND CODING — Official Event Merit Report</div>
        <div class="sub">Event Date: 31.07.2026 (Friday) • 25 Questions • 60 Minutes Duration</div>
      </div>

      <div class="coordinators">
        <div>
          <strong>Student Coordinators:</strong><br>
          • Mr. S. Logesh Raja (IV Year)<br>
          • Mr. K. V. Hari Krishnan (IV Year)
        </div>
        <div>
          <strong>Faculty Coordinators:</strong><br>
          • Mrs. S. Somiya (ASP/CSE)<br>
          • Mrs. S. Ramya (AP/CSE)
        </div>
        <div>
          <strong>Report Summary:</strong><br>
          Evaluated Candidates: ${attempts.length}<br>
          Database: Verified MongoDB Records
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th style="text-align: center;">Rank</th>
            <th>Participant Name</th>
            <th>Reg No</th>
            <th>Department</th>
            <th>Class & Section</th>
            <th style="text-align: center;">Score</th>
            <th style="text-align: center;">Accuracy</th>
            <th style="text-align: center;">Warnings</th>
            <th style="text-align: center;">Time</th>
            <th style="text-align: center;">Status</th>
          </tr>
        </thead>
        <tbody>
          ${rows.length > 0 ? rows : '<tr><td colspan="10" style="text-align:center; padding: 20px;">No completed records found.</td></tr>'}
        </tbody>
      </table>

      <div class="footer">
        Generated on ${new Date().toLocaleString()} by TECH FORCE Assessment Engine • Confidential College Record
      </div>
      <script>window.print();</script>
    </body>
    </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    return res.send(htmlContent);
  } catch (error) {
    console.error('Failed to generate PDF report from MongoDB:', error);
    return res.status(500).json({ success: false, message: 'Failed to generate PDF report stream.' });
  }
};

export const exportExcel = async (req, res) => {
  try {
    const eventId = 'BLIND_CODING_2026';
    const attempts = await QuizAttempt.find({ eventId })
      .sort({ score: -1, timeTakenSeconds: 1 });

    const headers = [
      'Rank',
      'Participant Name',
      'Register Number',
      'Department',
      'Year',
      'Class',
      'Section',
      'Score (25)',
      'Percentage (%)',
      'Time Taken',
      'Total Warnings',
      'Submission Status',
      'Submission Timestamp',
    ];

    const csvRows = [headers.join(',')];

    attempts.forEach((a, i) => {
      const rank = a.status === 'COMPLETED' ? i + 1 : 'N/A';
      csvRows.push(
        [
          `"${rank}"`,
          `"${a.studentName}"`,
          `"${a.registerNumber}"`,
          `"${a.department || 'Department of Computer Science and Engineering'}"`,
          `"${a.year}"`,
          `"${a.class}"`,
          `"${a.section}"`,
          `"${a.score !== null ? a.score : 0}"`,
          `"${a.percentage !== null ? a.percentage : 0}"`,
          `"${a.timeFormatted || '--:--'}"`,
          `"${a.totalWarnings || 0}"`,
          `"${a.status}"`,
          `"${a.submittedAt ? new Date(a.submittedAt).toISOString() : ''}"`,
        ].join(',')
      );
    });

    const csvData = csvRows.join('\r\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="BLINDCODE_2026_Participants.csv"');
    return res.send(csvData);
  } catch (error) {
    console.error('Failed to export CSV from MongoDB:', error);
    return res.status(500).json({ success: false, message: 'Failed to export spreadsheet.' });
  }
};
