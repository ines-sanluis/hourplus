export default function Avatar ({
  alt,
  text,
  withText,
  src
}) {

  return (
    <>
      <div>
          <img alt={alt} src={src} title={alt}/>
          {withText && <strong>{text || alt}</strong>}
      </div>
      <style jsx>{`
        div {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: var(--gutter);
          cursor: pointer;
          &:hover {
            transform: scale(1.15);
          }
        }
        img {
          border-radius: 50%;
          width: var(--gutter3x);
        }
        strong {
          margin-left: var(--gutter);
        }
      `}</style>
    </>
  )
}
