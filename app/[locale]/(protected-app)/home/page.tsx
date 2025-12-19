import Container from "@/components/shared/Container";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Container className="min-h-screen flex items-center justify-center">
        <h1 className="text-primary font-extrabold uppercase text-2xl sm:text-3xl md:text-4xl tracking-wider">
          Welcome to the Home Page
        </h1>
      </Container>
    </div>
  );
}
