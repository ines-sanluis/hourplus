import style from "./styles.module.css"

function Header() {
    return (
        <div className={style.header}>
        <h1 className={style.title}>ContaHoras</h1>
        <h2>Calculadora de complemento de disponibilidade</h2>
        </div>
    )
}

export default Header
