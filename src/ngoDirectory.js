/* ==========================================================================
   NGO Directory data (text only: name + place + services)

   STARTER DATA — replace with your real registry.
   This is a hand-picked sample of well-known Indian NGOs so the search and
   filters can be demonstrated. It is NOT a complete list and does not imply
   membership or verification by the federation. For national coverage, load
   records from your own database or an export of NGO Darpan
   (ngodarpan.gov.in) in this same shape:

     { name: string, city: string, state: string, services: string[] }

   `services` values must come from SERVICES below so the filter works.
   ========================================================================== */

export const SERVICES = [
  'Education',
  'Healthcare',
  'Environment',
  'Women & Children',
  'Livelihood',
  'Disability',
  'Elderly Care',
  'Disaster Relief',
  'Water & Sanitation',
  'Rural Development',
  'Mental Health',
  'Wildlife & Animals',
];

// Cause slugs used on the Causes page → directory service filter
export const CAUSE_TO_SERVICE = {
  education: 'Education',
  healthcare: 'Healthcare',
  environment: 'Environment',
  'women-children': 'Women & Children',
  livelihood: 'Livelihood',
  disability: 'Disability',
};

export const STATES = [
  'Andaman & Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
  'Chandigarh', 'Chhattisgarh', 'Dadra & Nagar Haveli and Daman & Diu', 'Delhi', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu & Kashmir', 'Jharkhand', 'Karnataka',
  'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan',
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
  'West Bengal',
];

export const NGO_DIRECTORY = [
  // Delhi
  { name: 'Goonj', city: 'New Delhi', state: 'Delhi', services: ['Disaster Relief', 'Rural Development'] },
  { name: 'HelpAge India', city: 'New Delhi', state: 'Delhi', services: ['Elderly Care', 'Healthcare'] },
  { name: 'Smile Foundation', city: 'New Delhi', state: 'Delhi', services: ['Education', 'Healthcare'] },
  { name: 'Save the Children India (Bal Raksha Bharat)', city: 'New Delhi', state: 'Delhi', services: ['Women & Children', 'Education'] },
  { name: 'Deepalaya', city: 'New Delhi', state: 'Delhi', services: ['Education', 'Women & Children'] },
  { name: 'Salaam Baalak Trust', city: 'New Delhi', state: 'Delhi', services: ['Women & Children'] },
  { name: 'Sulabh International', city: 'New Delhi', state: 'Delhi', services: ['Water & Sanitation'] },
  { name: 'Centre for Science and Environment', city: 'New Delhi', state: 'Delhi', services: ['Environment'] },
  { name: 'Chintan Environmental Research and Action Group', city: 'New Delhi', state: 'Delhi', services: ['Environment', 'Livelihood'] },
  { name: 'CanSupport', city: 'New Delhi', state: 'Delhi', services: ['Healthcare'] },
  { name: 'Uday Foundation', city: 'New Delhi', state: 'Delhi', services: ['Healthcare', 'Disaster Relief'] },
  { name: 'PRADAN', city: 'New Delhi', state: 'Delhi', services: ['Livelihood', 'Rural Development'] },
  { name: 'SEEDS India', city: 'New Delhi', state: 'Delhi', services: ['Disaster Relief'] },
  { name: 'Jagori', city: 'New Delhi', state: 'Delhi', services: ['Women & Children'] },
  { name: 'Pravah', city: 'New Delhi', state: 'Delhi', services: ['Education'] },
  { name: "SOS Children's Villages of India", city: 'New Delhi', state: 'Delhi', services: ['Women & Children'] },

  // Maharashtra
  { name: 'Pratham Education Foundation', city: 'Mumbai', state: 'Maharashtra', services: ['Education'] },
  { name: 'CRY – Child Rights and You', city: 'Mumbai', state: 'Maharashtra', services: ['Women & Children', 'Education'] },
  { name: 'Teach For India', city: 'Mumbai', state: 'Maharashtra', services: ['Education'] },
  { name: 'Magic Bus India Foundation', city: 'Mumbai', state: 'Maharashtra', services: ['Education', 'Livelihood'] },
  { name: 'Akanksha Foundation', city: 'Mumbai', state: 'Maharashtra', services: ['Education'] },
  { name: 'Apnalaya', city: 'Mumbai', state: 'Maharashtra', services: ['Healthcare', 'Women & Children'] },
  { name: 'Swades Foundation', city: 'Mumbai', state: 'Maharashtra', services: ['Rural Development', 'Water & Sanitation'] },
  { name: 'Arpan', city: 'Mumbai', state: 'Maharashtra', services: ['Women & Children', 'Mental Health'] },
  { name: 'Door Step School', city: 'Pune', state: 'Maharashtra', services: ['Education'] },
  { name: 'Snehalaya', city: 'Ahmednagar', state: 'Maharashtra', services: ['Women & Children', 'Healthcare'] },
  { name: 'Maharogi Sewa Samiti (Anandwan)', city: 'Warora', state: 'Maharashtra', services: ['Disability', 'Healthcare'] },
  { name: 'Lok Biradari Prakalp', city: 'Gadchiroli', state: 'Maharashtra', services: ['Healthcare', 'Education', 'Rural Development'] },

  // Karnataka
  { name: 'The Akshaya Patra Foundation', city: 'Bengaluru', state: 'Karnataka', services: ['Education', 'Women & Children'] },
  { name: 'Agastya International Foundation', city: 'Bengaluru', state: 'Karnataka', services: ['Education'] },
  { name: 'Youth for Seva', city: 'Bengaluru', state: 'Karnataka', services: ['Education', 'Healthcare'] },
  { name: 'Samarthanam Trust for the Disabled', city: 'Bengaluru', state: 'Karnataka', services: ['Disability', 'Livelihood'] },
  { name: 'Karunashraya', city: 'Bengaluru', state: 'Karnataka', services: ['Healthcare'] },
  { name: 'Makkala Jagriti', city: 'Bengaluru', state: 'Karnataka', services: ['Education', 'Women & Children'] },
  { name: 'Hasiru Dala', city: 'Bengaluru', state: 'Karnataka', services: ['Environment', 'Livelihood'] },

  // Tamil Nadu
  { name: 'The Banyan', city: 'Chennai', state: 'Tamil Nadu', services: ['Mental Health', 'Women & Children'] },
  { name: 'Bhumi', city: 'Chennai', state: 'Tamil Nadu', services: ['Education'] },
  { name: 'Sneha Suicide Prevention Centre', city: 'Chennai', state: 'Tamil Nadu', services: ['Mental Health'] },
  { name: 'Udavum Karangal', city: 'Chennai', state: 'Tamil Nadu', services: ['Women & Children', 'Elderly Care'] },
  { name: 'Hand in Hand India', city: 'Chennai', state: 'Tamil Nadu', services: ['Livelihood', 'Women & Children'] },
  { name: 'Amar Seva Sangam', city: 'Ayikudy', state: 'Tamil Nadu', services: ['Disability'] },

  // Kerala
  { name: 'Pallium India', city: 'Thiruvananthapuram', state: 'Kerala', services: ['Healthcare'] },

  // Telangana & Andhra Pradesh
  { name: 'Naandi Foundation', city: 'Hyderabad', state: 'Telangana', services: ['Education', 'Livelihood'] },
  { name: "Dr. Reddy's Foundation", city: 'Hyderabad', state: 'Telangana', services: ['Livelihood', 'Education'] },
  { name: 'Rural Development Trust', city: 'Anantapur', state: 'Andhra Pradesh', services: ['Rural Development', 'Disability'] },

  // Gujarat
  { name: "SEWA – Self Employed Women's Association", city: 'Ahmedabad', state: 'Gujarat', services: ['Livelihood', 'Women & Children'] },
  { name: 'Manav Sadhna', city: 'Ahmedabad', state: 'Gujarat', services: ['Women & Children', 'Education'] },
  { name: "Blind People's Association", city: 'Ahmedabad', state: 'Gujarat', services: ['Disability'] },

  // Rajasthan
  { name: 'Barefoot College', city: 'Tilonia', state: 'Rajasthan', services: ['Rural Development', 'Environment'] },
  { name: 'Seva Mandir', city: 'Udaipur', state: 'Rajasthan', services: ['Rural Development', 'Education'] },
  { name: 'Tarun Bharat Sangh', city: 'Alwar', state: 'Rajasthan', services: ['Water & Sanitation', 'Environment'] },
  { name: 'Bhagwan Mahaveer Viklang Sahayata Samiti (Jaipur Foot)', city: 'Jaipur', state: 'Rajasthan', services: ['Disability'] },

  // Uttar Pradesh & Uttarakhand
  { name: 'Pardada Pardadi Educational Society', city: 'Anupshahr', state: 'Uttar Pradesh', services: ['Education', 'Women & Children'] },
  { name: 'Wildlife Trust of India', city: 'Noida', state: 'Uttar Pradesh', services: ['Wildlife & Animals', 'Environment'] },
  { name: 'HESCO – Himalayan Environmental Studies and Conservation Organization', city: 'Dehradun', state: 'Uttarakhand', services: ['Environment', 'Rural Development'] },

  // Central & East
  { name: 'Eklavya Foundation', city: 'Bhopal', state: 'Madhya Pradesh', services: ['Education'] },
  { name: 'Jan Swasthya Sahyog', city: 'Bilaspur', state: 'Chhattisgarh', services: ['Healthcare'] },
  { name: 'Ekjut', city: 'Chakradharpur', state: 'Jharkhand', services: ['Healthcare', 'Women & Children'] },
  { name: 'Sammaan Foundation', city: 'Patna', state: 'Bihar', services: ['Livelihood'] },
  { name: 'Gram Vikas', city: 'Ganjam', state: 'Odisha', services: ['Water & Sanitation', 'Rural Development'] },
  { name: 'CINI – Child in Need Institute', city: 'Kolkata', state: 'West Bengal', services: ['Healthcare', 'Women & Children'] },
  { name: 'Anudip Foundation', city: 'Kolkata', state: 'West Bengal', services: ['Livelihood'] },
  { name: 'Hope Kolkata Foundation', city: 'Kolkata', state: 'West Bengal', services: ['Women & Children', 'Healthcare'] },
  { name: 'Calcutta Rescue', city: 'Kolkata', state: 'West Bengal', services: ['Healthcare', 'Education'] },

  // North & North East
  { name: 'All India Pingalwara Charitable Society', city: 'Amritsar', state: 'Punjab', services: ['Disability', 'Healthcare'] },
  { name: 'Aaranyak', city: 'Guwahati', state: 'Assam', services: ['Wildlife & Animals', 'Environment'] },
  { name: 'Ashadeep', city: 'Guwahati', state: 'Assam', services: ['Mental Health'] },
];
