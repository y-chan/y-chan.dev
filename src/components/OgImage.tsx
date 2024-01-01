import fs from 'fs'
import satori from "satori"
import sharp from "sharp"

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
          style={{
            position: "absolute",
            top: "30px",
            left: "30px",
            height: "420px",
            width: "900px",
          }}
          src={`data:image/png;base64,${fullHeroImag}`}
        />
      )}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          background: `rgba(250, 245, 241, ${fullHeroImag ? '0.5' : '1'})`,
        }}
      />
      <img
        style={{
          position: "absolute", top: 0, left: 0
        }}
        src={`data:image/png;base64,${ogpFrame}`}
      />
      {!fullHeroImag && <img
        style={{
          position: "absolute",
          top: "230px",
          left: "40px",
          height: "200px",
        }}
        src={`data:image/png;base64,${portrait}`}
      />}
      <section
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          margin: 0,
          padding: 0,
          width: "100vw",
        }}
      >
        <h1 style={{
          fontSize: "40px",
          lineHeight: "1",
          textWrap: "pretty",
          padding: "55px",
          margin: 0
        }}>
          {text}
        </h1>
        <h2 style={{
          position: "absolute",
          top: `${480 - 30 - 75}px`,
          right: "65px",
          fontSize: "30px",
          margin: 0
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

  return await sharp(Buffer.from(svg)).png().toBuffer()
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