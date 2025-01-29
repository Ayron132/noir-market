import Link from "next/link"

export default function Footer() {
  return (
    (<footer className="bg-primary text-secondary py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Noir Market</h3>
            <p className="text-sm">Onde o exclusivo encontra o essencial.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Links Rápidos</h4>
            <ul className="text-sm">
              <li>
                <Link href="/about" className="hover:text-accent transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-accent transition-colors">
                  Termos de Serviço
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-accent transition-colors">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2">Contato</h4>
            <p className="text-sm">Email: contato@noirmarket.com</p>
            <p className="text-sm">Telefone: (11) 1234-5678</p>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2023 Noir Market. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>)
  );
}

