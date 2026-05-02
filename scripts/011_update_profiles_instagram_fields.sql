-- Add new Instagram-style profile fields
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS website_url text,
ADD COLUMN IF NOT EXISTS social_link text,
ADD COLUMN IF NOT EXISTS social_platform text,
ADD COLUMN IF NOT EXISTS profession text;

-- Create index for better performance on new fields
CREATE INDEX IF NOT EXISTS profiles_profession_idx ON public.profiles(profession);
