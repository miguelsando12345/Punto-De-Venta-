import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-red-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          RestaurantePOS
        </Link>
        <div className="flex space-x-6">
          <Link href="/inventario" className="text-white hover:underline">
            Inventario
          </Link>
          <Link href="/clientes" className="text-white hover:underline">
            producto
          </Link>
          <Link href="/ordenes" className="text-white hover:underline">
            Órdenes
          </Link>
          <Link href="/configuracion" className="text-white hover:underline">
            Configuración
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
