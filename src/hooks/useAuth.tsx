import { createSupabaseServerClient } from "@/lib/supabase/server";

export function useAuth() {
  async function signInWithEmailAndPassword(data: {
    email: string;
    password: string;
  }) {
    const supabase = await createSupabaseServerClient();
    const result = await supabase.auth.signInWithPassword(data);
    return JSON.stringify(result);
  }

  return { signInWithEmailAndPassword };
}
