import { createClient } from '@supabase/supabase-js'

/**
 * Supabase keep-alive endpoint (Vercel serverless function).
 *
 * joblist-am is a pure client-side SPA, so there was no server route that
 * touches the database. UptimeRobot hitting the static homepage serves cached
 * HTML and never reaches Supabase, so the free-tier project still pauses after
 * ~7 days. This function runs one tiny, read-only query on every request so a
 * monitor pinging it keeps the database active.
 *
 * It reuses the project's existing env vars. The anon key is the same key the
 * browser already uses (it is not a secret), and the `profiles` table grants
 * SELECT to the anon role with an RLS policy of USING (true), so no elevated
 * credentials are needed. Nothing is ever written.
 *
 * 200 { ok: true }         on success
 * 500 { ok: false, error } if the query fails
 */
export default async function handler(_req, res) {
	const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL
	const supabaseAnonKey =
		process.env.VITE_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY

	if (!supabaseUrl || !supabaseAnonKey) {
		return res.status(500).json({ ok: false, error: 'Missing Supabase environment variables' })
	}

	try {
		const supabase = createClient(supabaseUrl, supabaseAnonKey)

		// Cheapest possible real read: one column, one row. HEAD + count avoids
		// transferring row data while still executing a query against Postgres.
		const { error } = await supabase
			.from('profiles')
			.select('id', { head: true, count: 'exact' })
			.limit(1)

		if (error) {
			return res.status(500).json({ ok: false, error: error.message })
		}

		return res.status(200).json({ ok: true })
	} catch (error) {
		return res.status(500).json({ ok: false, error: error.message })
	}
}
