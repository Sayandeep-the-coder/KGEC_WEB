-- seed.sql — Insert authorized admin_allowlist entries

INSERT INTO admin_allowlist (email, name)
VALUES
  ('jitsaha951@gmail.com', 'Jit Saha'),
  ('sayandeep.saha.arcade25@gmail.com', 'Sayandeep Saha')
ON CONFLICT (email) DO NOTHING;
