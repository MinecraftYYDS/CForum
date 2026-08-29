import { describe, expect, it } from 'vitest';
import { getKeyFromUrl, getPublicUrl } from './s3';

describe('Supabase Storage compatibility', () => {
  it('builds a public URL for Supabase Storage objects', () => {
    const env = {
      SUPABASE_URL: 'https://example.supabase.co',
      SUPABASE_BUCKET: 'forum-images',
    } as any;

    expect(getPublicUrl(env, 'usr/1/post/123/test.png')).toBe(
      'https://example.supabase.co/storage/v1/object/public/forum-images/usr/1/post/123/test.png'
    );
  });

  it('extracts keys from Supabase public URLs', () => {
    const env = {
      SUPABASE_URL: 'https://example.supabase.co',
      SUPABASE_BUCKET: 'forum-images',
    } as any;

    expect(
      getKeyFromUrl(
        env,
        'https://example.supabase.co/storage/v1/object/public/forum-images/usr/1/post/123/test.png'
      )
    ).toBe('usr/1/post/123/test.png');
  });
});
