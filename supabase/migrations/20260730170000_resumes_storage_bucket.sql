-- Resume uploads for the public /apply form.
--
-- The bucket is PRIVATE. Resumes carry names, home addresses, phone numbers,
-- and full work history. A public bucket would expose every applicant's resume
-- to anyone who can guess a path, which is a real privacy incident, not a
-- theoretical one.
--
-- Access model:
--   anon (the browser)  -> INSERT only. Can drop a file in, can never read one back.
--   service_role        -> full access. This is how the recruiting-alert edge
--                          function reads the file to attach it to the email.
--   authenticated       -> SELECT, so signed-in staff tooling can read resumes.
--
-- Note the deliberate absence of an anon SELECT policy. Do not add one.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'resumes',
  'resumes',
  false,
  5242880, -- 5 MB, matches MAX_RESUME_BYTES on the apply form
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
on conflict (id) do update
  set public             = false,
      file_size_limit    = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Applicants upload from the browser with the anon key.
drop policy if exists "resumes_anon_insert" on storage.objects;
create policy "resumes_anon_insert"
  on storage.objects
  for insert
  to anon
  with check (bucket_id = 'resumes');

-- Signed-in staff may read resumes.
drop policy if exists "resumes_authenticated_select" on storage.objects;
create policy "resumes_authenticated_select"
  on storage.objects
  for select
  to authenticated
  using (bucket_id = 'resumes');

-- Deliberately NOT created:
--   * an anon SELECT policy  -> would make every resume publicly readable
--   * anon UPDATE / DELETE   -> an applicant should not be able to overwrite
--                               or remove someone else's upload
