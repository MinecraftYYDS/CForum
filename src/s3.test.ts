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

  it('prefers Supabase public URLs when an R2 binding is also present', () => {
    const env = {
      BUCKET: {},
      SUPABASE_URL: 'https://example.supabase.co',
      SUPABASE_BUCKET: 'forum-images',
    } as any;

    expect(getPublicUrl(env, 'usr/1/post/123/test.png', 'https://forum.example.com/r2')).toBe(
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

  it('extracts Supabase keys before falling back to R2 URL handling', () => {
    const env = {
      BUCKET: {},
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
