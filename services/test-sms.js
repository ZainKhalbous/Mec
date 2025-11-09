// test-sms.js
require('dotenv').config();  
const smsService = require('./smsService');

async function testSMS() {
  console.log('🧪 Testing SMS Service...');
  console.log('Twilio Number:', process.env.TWILIO_PHONE_NUMBER);
  
  // Replace with YOUR actual personal phone number
  const testPhoneNumber = '+12896980335'; 
  
  const result = await smsService.sendSMS(
    testPhoneNumber,
    '🚨 TEST: This is from your Disaster Relief App! If you get this, SMS is working! ✅'
  );
  
  console.log('📱 Test Result:', result);
}

testSMS();