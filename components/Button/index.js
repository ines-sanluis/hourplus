export default function Button({
  children,
  onClick,
  primary,
  disabled = false,
}) {
  return (
    <>
      <button onClick={onClick} disabled={disabled}>
        {children}
      </button>
      <style jsx>{`
        button {
            align-items: center;
            font-family: Montserrat;
            background: ${primary ? "var(--secondary)" : "var(--white)"};
            border: ${primary ? 0 : "1px solid var(--secondary)"};
            color: ${primary ? "white" : "var(--secondary)"};
            border-radius: 999px;
            cursor: pointer;
            display: flex;
            font-size: 0.8rem;
            font-weight: 800;
            padding: 8px 24px;
            transition: opacity .3s ease;
            height: 40px;+
        }

        button > :global(svg) {
            margin-right: 8px;
        }

        button:hover {
            transform: scale(1.05);
            transition: transform .3s ease;
            opacity: 0.95;
        }
        `}</style>
    </>
  )
}
