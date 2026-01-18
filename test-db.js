const postgres = require('postgres');

const sql = postgres('postgresql://postgres:a3wb70qQDrJtpNv4@db.haoenlhsfpvqwwshtras.supabase.co:5432/postgres', {
  connect_timeout: 10
});

sql`SELECT 1 as test`
  .then(r => {
    console.log('Connected successfully!', r);
    process.exit(0);
  })
  .catch(e => {
    console.error('Connection Error:', e.message);
    process.exit(1);
  });
