const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zyflywdewyyqbzmahnge.supabase.co'; // replace with your project URL
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5Zmx5d2Rld3l5cWJ6bWFobmdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MTUyMzcsImV4cCI6MjA2MDE5MTIzN30.vo_Xns9JIfF2OdfYXsRDDIvYDfxYX6dB3T9WSz-inlk";
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
