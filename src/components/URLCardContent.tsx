// import { JSDOM } from 'jsdom'
import React, { useCallback, useEffect, useState } from 'react'


interface URLCardContentProps {
  url: string;
}

interface URLData {
  description: string;
  image: string;
  title: string;
  type: 'summary' | 'summary_large_image';
}

function getParentURL(url: string): string {
	return url.replace(/[^/]*$/, "");
}

const URLCardContent: React.FC<URLCardContentProps> = (props) => {

  const [urlData, setUrlData] = useState<URLData>({
    description: '',
    image: '',
    title: '',
    type: 'summary'
  })

  const generateUrlData = useCallback(async (): Promise<URLData> => {
    let title = ''
    let description = ''
    let image = ''
    let type: 'summary' | 'summary_large_image' = 'summary'

    const html = await(await fetch(`https://cors-proxy.y-chan.dev/?q=${encodeURIComponent(props.url)}`)).text()
    const document = new DOMParser().parseFromString(html, 'text/html')

    // const document = dom.window.document

    const metaTags = document.querySelectorAll('meta')

    for (const metaTag of metaTags) {
      const property = metaTag.getAttribute('property')
      const content = metaTag.getAttribute('content')
      const name = metaTag.getAttribute('name')

      if (content === null) {
        continue
      }

      if (property === 'og:title') {
        title = content
      }

      if (property === 'og:description' || name === 'description') {
        description = content
      }

      if (property === 'og:image' || name === 'og:image' || property === 'twitter:image' || name === 'twitter:image') {
        image = content
      }

      if (property === 'twitter:card' || name === 'twitter:card') {
        if (content === 'summary_large_image' || content === 'player') {
          type = 'summary_large_image'
        }
      }
    }

    if (title === '') {
      const titleElement = document.querySelector("title")
      if (titleElement) {
        title = titleElement.textContent || ""
      }
      if (title === '') {
        throw new Error('No title found')
      }
    }

    if (description === '') {
      const descriptionElement = document.querySelector("description")
      if (descriptionElement) {
        description = descriptionElement.getAttribute('content') || ""
      }
    }

    if (image === '') {
      const linkTags = document.querySelectorAll('link')
      const origin = new URL(props.url).origin
      for (const linkTag of linkTags) {
        const rel = linkTag.getAttribute('rel')
        const href = linkTag.getAttribute('href')

        if (rel === 'icon' || rel === 'shortcut icon') {
          if (href === null) {
            continue
          }
          if (!href.startsWith(origin)) {
            if (href.startsWith('../')) {
              if (!props.url.endsWith('/')) {
                image = getParentURL(props.url) + href
              } else {
                image = `${props.url}${href}`
              }
            } else {
              image = `${origin}/${href}`
            }
          } else {
            image = href
          }
          break
        }
      }
    }

    return {
      description,
      image,
      title,
      type
    }
  }, [props.url])

  useEffect(() => {
    void generateUrlData().then((data) => {
      setUrlData(data)
      console.log(data)
    })
  }, [])

  return (
    <div className="flex bg-white hover:bg-gray-50 border border-gray-400 w-full text-black hover:text-primary-500 rounded-lg">
      {
        urlData.type === 'summary' && (
          <div className="flex flex-row w-full items-center">
            <img alt={urlData.title} className="h-24 w-24 md:h-36 md:w-36 object-cover" src={urlData.image} />
            <div className="px-4 overflow-hidden">
              <p className="overflow-hidden text-xs m-0 text-nowrap text-gray-400">{props.url.split("/")[2]}</p>
              <p className="overflow-hidden text-lg m-0 font-semibold text-nowrap">{urlData.title}</p>
              <p className="overflow-hidden text-sm m-0 text-nowrap text-gray-500">{urlData.description}</p>
            </div>
          </div>
        )
      }
      {
        urlData.type === 'summary_large_image' && (
          <div className="flex flex-col w-full items-center">
            <img alt={urlData.title} className="w-full max-h-[400px] object-cover" src={urlData.image} />
            <div className="flex flex-col w-full mx-2 overflow-hidden">
              <p className="overflow-hidden text-xs mx-2 my-1 text-nowrap text-gray-400">{props.url.split("/")[2]}</p>
              <p className="overflow-hidden text-lg mx-2 mt-1 mb-0 font-semibold text-nowrap">{urlData.title}</p>
              <p className="overflow-hidden text-sm m-2 text-nowrap text-gray-500">{urlData.description}</p>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default URLCardContent