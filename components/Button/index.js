export default function Button ({ children, onClick, primary, disabled = false }) {
    return (
    <>
        <button onClick={onClick} disabled={disabled}>
            {children}
        </button>
        <style jsx>{`
        button {
            align-items: center;
            font-family: Montserrat;
            background: ${primary ? 'var(--text-primary)' : 'transparent'};
            border: ${primary ? 0 : '1px solid var(--primary)'};
            color: ${primary ? 'white' : "var(--primary)"};
            border-radius: 9999px;
            cursor: pointer;
            display: flex;
            font-size: 0.8rem;
            font-weight: 800;
            padding: 8px 24px;
            transition: opacity .3s ease;
        }

        button > :global(svg) {
            margin-right: 8px;
        }

        button:hover {
            opacity: .7;
        }
        `}</style>
    </>
  )
}
