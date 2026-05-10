let clientPromise;
const viteEnv = import.meta.env ?? {};

export const supabaseConfig = {
  url: viteEnv.VITE_SUPABASE_URL,
  anonKey: viteEnv.VITE_SUPABASE_ANON_KEY,
};

export function hasSupabaseConfig() {
  return Boolean(supabaseConfig.url && supabaseConfig.anonKey);
}

export async function getSupabaseClient() {
  if (!hasSupabaseConfig()) {
    return null;
  }
  if (!clientPromise) {
    clientPromise = import("@supabase/supabase-js").then(({ createClient }) =>
      createClient(supabaseConfig.url, supabaseConfig.anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      }),
    );
  }
  return clientPromise;
}
