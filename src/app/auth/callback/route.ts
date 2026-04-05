import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import { handleAuthCallback } from "@/app/actions/auth";

export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    const origin = requestUrl.origin;
    const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();

    if (code) {
        const supabase = await createClient();
        const { data } = await supabase.auth.exchangeCodeForSession(code);

        // Auto-provision a store + profile first time after email confirmation / OAuth
        if (data?.user) {
            await handleAuthCallback(data.user.id, data.user.email!);
        }
    }

    if (redirectTo) {
        return redirect(`${origin}${redirectTo}`);
    }

    // URL to redirect to after sign up process completes
    return redirect(`${origin}/dashboard`);
}
