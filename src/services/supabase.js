import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://lletzradltlgvtslqjgt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsZXR6cmFkbHRsZ3Z0c2xxamd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3ODgxMTksImV4cCI6MjA1NTM2NDExOX0.A-bd28a06T9nN1yqSqKVV6Ht2E4vMpv_BnzU4qzk2Ec";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
