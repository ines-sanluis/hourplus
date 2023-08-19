export default function Chip({color, background, text}) {
    return (
        <>
            <span
                style={{
                    color,
                    backgroundColor: background,
                    padding: 'var(--gutter)',
                    borderRadius: 'var(--border-radius)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    fontFamily: 'Montserrat',
                    display: 'inline-block',
                    textAlign: 'center',
                } }
            >
                {text}
            </span>
        </>
    )
}