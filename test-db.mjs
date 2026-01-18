import postgres from 'postgres';

const sql = postgres('postgresql://postgres.haoenlhsfpvqwwshtras:a3wb70qQDrJtpNv4@aws-0-eu-central-1.pooler.supabase.com:6543/postgres', {
  connect_timeout: 10
});

try {
  const result = await sql`SELECT 1 as test`;
  console.log('Connected successfully!', result);
  process.exit(0);
} catch (e) {
  console.error('Connection Error:', e.message);
  process.exit(1);
}
