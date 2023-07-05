import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_LINK!;
const supabaseAnonKey = process.env.REACT_APP_KEY!;
const options = {
  auth: {
    persistSession: false,
  },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, options);
