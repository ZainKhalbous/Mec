// services/test-gmail-final.js
require('dotenv').config();
const emailService = require('./emailService');

async function testGmail() {
  console.log('🧪 Final Gmail Test');
  console.log('Email:', process.env.EMAIL_USER);
  
  const testEmail = 'trader1400@gmail.com'; // Your email to receive test
  
  console.log('\n1. Testing basic email...');
  const result = await emailService.sendEmail(
    testEmail,
    '🚨 Gmail Test - Disaster Relief',
    '<h2>Gmail Test Successful!</h2><p>If you receive this, Gmail is working perfectly!</p>'
  );
  
  console.log('Result:', result);
  
  if (result.success) {
    console.log('\n🎉 GMAIL IS WORKING!');
    console.log('You can now send emergency alerts via Gmail!');
  } else {
    console.log('\n❌ Gmail still failing. Try these:');
    console.log('A. Use Ethereal Email (easier)');
    console.log('B. Contact me for alternative solutions');
  }
}

testGmail().catch(console.error);