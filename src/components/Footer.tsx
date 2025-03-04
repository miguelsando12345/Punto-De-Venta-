const Footer = () => {
  return (
    <footer className="bg-red-600 text-white text-center p-4 shadow-md fixed bottom-0 left-0 w-full">
      <div className="container mx-auto">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} RestaurantePOS. Todos los derechos
          reservados.
        </p>
        <p className="text-sm">Desarrollado por tu equipo de confianza.</p>
      </div>
    </footer>
  );
};

export default Footer;
