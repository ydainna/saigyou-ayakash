export default function Home() {
  return (
    <main className="bg-body h-full">
      <div className="bg-paper shadow-md rounded-md mx-auto max-w-xl p-4">
        <h1 className="text-title text-primary">Un nom de personnage</h1>
        <p className="text-base text-secondary">Un nom</p>
        <button className="cursor-pointer text-base min-w-16 hover:bg-primary-button-hover hover:text-black text-primary-button border-2 border-primary-button rounded px-1.5 py-2">
          BUTTON
        </button>
      </div>
    </main>
  );
}
