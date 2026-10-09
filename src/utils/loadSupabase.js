export const loadSupabase = async () => {
  const { supabase } = await import("./supabase");
  return supabase;
};
