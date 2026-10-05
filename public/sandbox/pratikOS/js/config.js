// --- SUPABASE CONFIGURATION ---
// Credentials provided by user
const SUPABASE_URL = 'https://rxvjmdigqmhgpfhlfjrj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4dmptZGlncW1oZ3BmaGxmanJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzMTQ1OTUsImV4cCI6MjA4MTg5MDU5NX0.OriHXI03KY5Fsw85ROKsM6FXXM-WpH6JKQVjrilSDUs'; // The "anon" public key

// Initialize Client (Global Variable)
window.supabaseClient = null;

if (typeof supabase !== 'undefined' && SUPABASE_URL && SUPABASE_KEY) {
    window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log("Supabase initialized. ⚡");
} else {
    console.warn("Supabase configuration missing or library not loaded.");
}
