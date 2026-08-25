import { memoryStore } from '../config/db.js';

export const exportPdf = async (req, res) => {
  try {
    const attempts = Array.from(memoryStore.quizAttempts.values())
      .filter((a) => a.status === 'COMPLETED')
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return (a.timeTakenSeconds || 0) - (b.timeTakenSeconds || 0);
      });

    // Generate clean printable HTML report with official styling
    const rows = attempts
      .map(
        (a, i) => `
      <tr style="border-bottom: 1px solid #C8D696;">
        <td style="padding: 8px; font-weight: bold;">#${i + 1}</td>
        <td style="padding: 8px;"><strong>${a.studentName}</strong></td>
        <td style="padding: 8px;">${a.registerNumber}</td>
        <td style="padding: 8px;">${a.year} - ${a.class}</td>
        <td style="padding: 8px; font-weight: bold; color: #3971B8;">${a.score} / 25</td>
        <td style="padding: 8px;">${a.percentage}%</td>
        <td style="padding: 8px; font-family: monospace;">${a.timeFormatted}</td>
        <td style="padding: 8px; color: #343B1B;">Completed</td>
      </tr>`
      )
      .join('');

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>BLIND CODING 2026 — Official Participant Report</title>
      <style>
        body { font-family: Arial, sans-serif; color: #343B1B; background: #FBFCEE; padding: 30px; margin: 0; }
        .header { text-align: center; border-bottom: 3px solid #3971B8; padding-bottom: 15px; margin-bottom: 20px; }
        .title { color: #3971B8; font-size: 24px; font-weight: bold; margin: 5px 0; }
        .dept { font-size: 14px; font-weight: bold; color: #343B1B; text-transform: uppercase; }
        .sub { font-size: 12px; color: #666; margin: 3px 0; }
        .coordinators { display: flex; justify-content: space-between; font-size: 11px; margin: 15px 0; background: #fff; padding: 10px; border-radius: 8px; border: 1px solid #C8D696; }
        table { width: 100%; border-collapse: collapse; background: #ffffff; font-size: 12px; }
        th { background: #3971B8; color: #ffffff; padding: 10px 8px; text-align: left; }
        .footer { margin-top: 30px; font-size: 10px; text-align: center; color: #888; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="dept">Department of Computer Science and Engineering</div>
        <div class="sub">Academic Year 2025–2026 • Organized by CSE Association & CSI Student Chapter</div>
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
          Total Participants: ${attempts.length}<br>
          Status: Verified Assessment Session
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Participant Name</th>
            <th>Reg No</th>
            <th>Year & Class</th>
            <th>Score</th>
            <th>Accuracy</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>

      <div class="footer">
        Generated on ${new Date().toLocaleString()} by TECH FORCE Admin Engine • Confidential College Record
      </div>
      <script>window.print();</script>
    </body>
    </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    return res.send(htmlContent);
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to generate PDF report stream.' });
  }
};

export const exportExcel = async (req, res) => {
  try {
    const attempts = Array.from(memoryStore.quizAttempts.values()).sort((a, b) => {
      if ((b.score || 0) !== (a.score || 0)) return (b.score || 0) - (a.score || 0);
      return (a.timeTakenSeconds || 0) - (b.timeTakenSeconds || 0);
    });

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
      'Status',
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
          `"${a.department}"`,
          `"${a.year}"`,
          `"${a.class}"`,
          `"${a.section}"`,
          `"${a.score !== null ? a.score : ''}"`,
          `"${a.percentage !== null ? a.percentage : ''}"`,
          `"${a.timeFormatted || ''}"`,
          `"${a.status}"`,
          `"${a.submittedAt || ''}"`,
        ].join(',')
      );
    });

    const csvData = csvRows.join('\r\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="BLINDCODE_2026_Participants.csv"');
    return res.send(csvData);
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to export spreadsheet.' });
  }
};
