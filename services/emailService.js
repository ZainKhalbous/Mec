// services/emailService.js
const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
      }
    });
  }

  async sendEmail(to, subject, htmlContent) {
    try {
      console.log('📧 Attempting Gmail send...');
      console.log('From:', process.env.EMAIL_USER);
      console.log('To:', to);
      
      const mailOptions = {
        from: `"Disaster Relief" <${process.env.EMAIL_USER}>`,
        to: to,
        subject: subject,
        html: htmlContent
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('✅ Gmail sent successfully!');
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('❌ Gmail failed:', error.message);
      
      // Detailed error analysis
      if (error.code === 'EAUTH') {
        console.log('🔐 AUTHENTICATION ISSUE - Check:');
        console.log('1. 2FA is ENABLED on Gmail');
        console.log('2. Using APP PASSWORD (16 chars), not regular password');
        console.log('3. App Password generated for "Mail" specifically');
        console.log('4. No spaces in App Password in .env file');
      }
      
      return { success: false, error: error.message };
    }
  }

  async sendEmergencyAlert(email, shelterInfo) {
    const subject = '🚨 Emergency Shelter Alert - Disaster Relief';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #dc3545; text-align: center;">🚨 Emergency Shelter Alert</h2>
        
        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #333;">${shelterInfo.name}</h3>
          <p><strong>📍 Location:</strong> ${shelterInfo.location}</p>
          <p><strong>📞 Contact:</strong> ${shelterInfo.contact}</p>
          <p><strong>🛏️ Available Spaces:</strong> ${shelterInfo.availableSpaces}</p>
        </div>
        
        <p style="color: #dc3545; font-weight: bold; text-align: center;">
          Please proceed to this shelter immediately for safety.
        </p>
        
        <hr style="margin: 30px 0;">
        <p style="color: #666; font-size: 14px; text-align: center;">
          Stay safe,<br>
          <strong>Disaster Relief Team</strong>
        </p>
      </div>
    `;

    return await this.sendEmail(email, subject, html);
  }
}

module.exports = new EmailService();