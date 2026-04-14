
CREATE POLICY "All authenticated users can view profiles for leaderboard"
ON public.profiles
FOR SELECT
TO authenticated
USING (true);
