const Footer = () => {
  return (
    <footer className="bg-red-600 text-white text-center p-4 mt-8 shadow-md">
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
