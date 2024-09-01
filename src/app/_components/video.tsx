// import { list } from "@vercel/blob";
export function Video({
  width,
  height,
  src,
}: {
  width?: number | string;
  height?: number | string;
  src: string;
}) {
  // const { blobs } = list({
  //   prefix: src,
  //   limit: 1,
  // });
  // const { url } = blobs[0] ?? { url: "/videos/1.mp4" };
  return (
    <div>
      <video
        width={width ?? "320"}
        height={height ?? "240"}
        playsInline
        autoPlay
        muted
        loop
        preload="none"
      >
        <source src={src} type="video/mp4" />
        Your browser doesn't support video
      </video>
    </div>
  );
}
