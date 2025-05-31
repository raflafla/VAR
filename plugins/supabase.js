import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gbwubciipgqsfuyfkjby.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdid3ViY2lpcGdxc2Z1eWZramJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3MTQyMzgsImV4cCI6MjA2NDI5MDIzOH0.TAiDVIAOPjZveKTeAfjGCxO8zi3DA74yFMVm8TzxO9U'
export const supabase = createClient(supabaseUrl, supabaseKey)