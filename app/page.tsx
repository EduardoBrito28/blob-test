import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-5 ">
      <p className="text-3xl text-black">Formulário de Upload</p>
      <Link href={'/avatar/upload'}>PAGINA DE UPLOAD</Link>
    </div>
  );
}
