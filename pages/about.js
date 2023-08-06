import Header from "../components/Header";
import Footer from "../components/Footer";
import style from "./about.module.css";

export default function Home() {

  return (
    <>
      <Header></Header>
      <div className={style.container}>
        <h1>Cómo se calcula?</h1>
        <section>
          <h2>
            Artigo 61. Complemento de dispoñibilidade
          </h2>
          <ol>
            <li>
              Aplicarase ao persoal que, previa designación pola empresa, polas características do seu posto de traballo,
              voluntariamente estea disposto a modificacións constantes da súa xornada e do seu horario de luns a domingo.
            </li>
            <ol>
              <li>
                Cómputo semanal. Percibirao o/a traballador/a que estea suxeito ás condicións do artigo 34 durante unha (1) semana.
              </li>
              <li>
                Cómputo mensual. Percibirao o/a traballador/a que estea suxeito ás condiciones do artigo 34 durante un (1) mes completo.
              </li>
            </ol>
          </ol>
        </section>
        <section>
          <h2>
            Artigo 34. Xornada superior á ordinaria
          </h2>
          <ol start="6">
            <li>
            As convocatorias respectarán o descanso entre xornadas de 12 horas e, con carácter xeral, deben respectar o límite de 9 horas por día.
Cando por necesidades da produción se supere dito límite, sen superar nunca as catorce (14) horas por xornada, as horas de exceso computaranse do seguinte xeito: 
            </li>
            <ol>
              <li>
              Cando se realicen xornadas que superando as 9 horas non superen as 12 horas, computaranse a razón de 1,5 horas por hora de exceso. 
              </li>
              <li>
              Cando pasen as 12 horas sen pasar as 14, computaranse a razón de 2 horas por hora de exceso. 
              </li>
              <li>
              Non se computará como traballo o tempo dedicado a comida ou cea, respectando o establecido no artigo 33.5.1 deste convenio.
              </li>
            </ol>
          </ol>
        </section>
      </div>
      <Footer></Footer>
    </>
  );
}
