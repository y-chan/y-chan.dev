import type { APIContext } from "astro"

import { getOgImage } from "@/components/OgImage"
import { getCollection, getEntryBySlug } from "astro:content"

export async function getStaticPaths() {
  const posts = await getCollection('blog')
  return posts.map((post) => ({
    params: { slug: post.slug },
  }))
}

export async function GET({ params }: APIContext) {
  console.log("slug", params)
  if (!params.slug) return { status: 404 }
  const post = await getEntryBySlug('blog', params.slug)
  const body = await getOgImage(post?.data.title ?? "No title", post?.data.heroImage)

  return new Response(body, {
    headers: {
      "Content-Type": "image/png",
    },
  })
}