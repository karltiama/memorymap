"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function emaillogin(formData: FormData) {
	const supabase = createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		redirect("/login?message=Could not authenticate user");
	}

	revalidatePath("/", "layout");
	redirect("/dashboard");
}

export async function signup(formData: FormData) {
	const supabase = createClient();

	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await supabase.auth.signUp({
		email: data.email,
		password: data.password,
		options: {
			emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
		}
	});

	if (error) {
		redirect("/login?message=Error Signing Up");
	}

	redirect("/auth/verify-email?email=" + encodeURIComponent(data.email));
}

export async function signout() {
	const supabase = createClient();

	await supabase.auth.signOut();

	revalidatePath("/", "layout");
	redirect("/login");
}
