import { Button } from "components/ui";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <div className="w-full">
      <div className="flex h-screen relative">
        <header className="w-full h-16 flex justify-between px-44 absolute">
          <nav className="flex">
            <div className="flex gap-10 items-center">
              <Link href="/">
                <Image
                  src="/logo.svg"
                  alt="Finapp logo"
                  width={150}
                  height={60}
                />
              </Link>
              <a href="#acerca_de" className="hover:underline">
                Acerca de
              </a>
              <a href="#desarolladores" className="hover:underline">
                Desarolladores
              </a>
            </div>
          </nav>
          <nav className="flex">
            <div className="flex gap-10 items-center">
              <Link href="/dashboard" className="text-white">
                <Button variant="ghost" className="bg-[#4C49ED] text-white">
                  Ir a la app
                </Button>
              </Link>
            </div>
          </nav>
        </header>
        <div className="w-full flex items-center pl-40">
          <div className="max-w-[620px]">
            <h1 className="text-7xl font-bold mb-5">Somos Finapp</h1>
            <p className="text-lg">
              Te ofrecemos una aplicación que te ayudará a gestionar tus pagos
              de créditos vehiculares.
            </p>
          </div>
        </div>
        <div className="w-[1000px] bg-[#18191F] relative -z-10">
          <Image
            className="absolute right-16 top-28"
            src="/home/cash.png"
            width={200}
            height={200}
            alt=""
          />
          <Image
            className="absolute left-16 bottom-[calc(50%-100px)]"
            src="/home/day.png"
            width={200}
            height={200}
            alt=""
          />
          <Image
            className="absolute right-16 bottom-16"
            src="/home/card.png"
            width={200}
            height={200}
            alt=""
          />
        </div>
      </div>
      <div id="acerca_de" className="flex items-center gap-40 px-40 py-16">
        <Image src="/acerca.png" width={540} height={540} alt="" />
        <div>
          <h1 className="text-7xl font-bold mb-5">Acerca de</h1>
          <p className="text-lg max-w-[520px]">
            Finapp se desarrollo con el objetivo de ayudarte manejar
            correctamente tus pagos de créditos vehiculares.
          </p>
        </div>
      </div>
      <div
        id="desarolladores"
        className="flex flex-col items-center flex-wrap gap-16 px-36 py-24"
      >
        <div className="text-center">
          <h1 className="text-7xl font-bold mb-5">Desarolladores</h1>
          <p className="text-lg">
            Aqui presentamos al equipo encargado del desarrollo de Finapp.
          </p>
        </div>
        <ul className="flex gap-10">
          <li className="flex flex-col items-center gap-2">
            <Image src="/home/1.svg" width={70} height={70} alt="" />
            <h1 className="text-lg">JESUS ONOFRE</h1>
            <h2 className="text-sm">Estudiante de ...</h2>
          </li>
          <li className="flex flex-col items-center gap-2">
            <Image src="/home/2.svg" width={70} height={70} alt="" />
            <h1 className="text-lg">DAVID SOTO</h1>
            <h2 className="text-sm">Estudiante de ...</h2>
          </li>
          <li className="flex flex-col items-center gap-2">
            <Image src="/home/3.svg" width={70} height={70} alt="" />
            <h1 className="text-lg">EDUARD TRAVEZAÑO</h1>
            <h2 className="text-sm">Estudiante de ...</h2>
          </li>
          <li className="flex flex-col items-center gap-2">
            <Image src="/home/4.svg" width={70} height={70} alt="" />
            <h1 className="text-lg">EMERZON SOSA</h1>
            <h2 className="text-sm">Estudiante de ...</h2>
          </li>
          <li className="flex flex-col items-center gap-2">
            <Image src="/home/5.svg" width={70} height={70} alt="" />
            <h1 className="text-lg">BRUNO ROBLES</h1>
            <h2 className="text-sm">Estudiante de ...</h2>
          </li>
        </ul>
      </div>
      <footer className="bg-[#18191F] h-24 flex justify-between items-center px-36">
        <p className="text-white text-sm">
          © 2023 Finapp. Todos los derechos reservados.
        </p>
        <Image
          className="mr-10"
          src="/logo_white.svg"
          width={150}
          height={60}
          alt=""
        />
        <div className="flex items-center gap-5">
          <p className="text-white text-sm">Síguenos en </p>
          <ul className="flex items-center gap-4">
            <li>
              <a href="https://www.facebook.com/" target="_blank">
                <Image
                  src="/facebook.svg"
                  alt="facebook logo"
                  width={20}
                  height={20}
                />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/" target="_blank">
                <Image
                  src="/instagram.svg"
                  alt="instagram logo"
                  width={20}
                  height={20}
                />
              </a>
            </li>
            <li>
              <a href="https://pe.linkedin.com/" target="_blank">
                <Image
                  src="/ball.svg"
                  alt="linkedin logo"
                  width={20}
                  height={20}
                />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/" target="_blank">
                <Image
                  src="/twitter.svg"
                  alt="twitter logo"
                  width={20}
                  height={20}
                />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Home;
