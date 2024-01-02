import { Resvg } from "@resvg/resvg-js"
import fs from 'fs'
import satori from "satori"


export async function getOgImage(text: string, heroImagePath?: string) {
  // const fontData = (await getFontData()) as ArrayBuffer
  const fontData = fs.readFileSync('public/fonts/LINESeedJP_OTF_Bd.otf')
  const ogpFrame = fs.readFileSync('src/assets/ogp_frame.png', 'base64')
  const portrait = fs.readFileSync('src/assets/y_chan_portrait.png', 'base64')
  const fullHeroImagePath = `src/assets/${heroImagePath}`
  console.log(fullHeroImagePath)
  let fullHeroImag: string | undefined
  if (fs.existsSync(fullHeroImagePath)) {
    fullHeroImag = fs.readFileSync(fullHeroImagePath, 'base64')
  }

  const svg = await satori(
    <main
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      {fullHeroImag && (
        <img
          src={`data:image/png;base64,${fullHeroImag}`}
          style={{
            height: "420px",
            left: "30px",
            position: "absolute",
            top: "30px",
            width: "900px",
          }}
        />
      )}
      <div
        style={{
          background: `rgba(250, 245, 241, ${fullHeroImag ? '0.5' : '1'})`,
          height: "100%",
          left: 0,
          position: "absolute",
          top: 0,
          width: "100%",
        }}
      />
      <img
        src={`data:image/png;base64,${ogpFrame}`}
        style={{
          left: 0, position: "absolute", top: 0
        }}
      />
      {!fullHeroImag && <img
        src={`data:image/png;base64,${portrait}`}
        style={{
          height: "200px",
          left: "40px",
          position: "absolute",
          top: "230px",
        }}
      />}
      <section
        style={{
          left: 0,
          margin: 0,
          padding: 0,
          position: "absolute",
          top: 0,
          width: "100vw",
        }}
      >
        <h1 style={{
          fontSize: "40px",
          lineHeight: "1",
          margin: 0,
          padding: "55px",
          textWrap: "pretty"
        }}>
          {text}
        </h1>
        <h2 style={{
          fontSize: "30px",
          margin: 0,
          position: "absolute",
          right: "65px",
          top: `${480 - 30 - 75}px`
        }}>
          y-chan's blogs
        </h2>
      </section>
      {/* <section>
        <h1 style={{ fontSize: "40px" }}>{text}</h1>
      </section> */}
    </main>,
    {
      fonts: [
        {
          data: fontData,
          name: "LINE Seed JP",
          style: "normal",
        },
      ],
      height: 480,
      width: 960,
    }
  )

  const resvg = new Resvg(svg)

  return resvg.render().asPng()
}



async function getFontData() {
  const API = `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700`

  const css = await (
    await fetch(API, {
      headers: {
        // Make sure it returns TTF.
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
      },
    })
  ).text()

  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  )

  if (!resource) return

  return await fetch(resource[1]).then((res) => res.arrayBuffer())
}