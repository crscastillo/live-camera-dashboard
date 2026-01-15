import camerasData from '@/data/cameras.json';

interface Camera {
  id: string;
  name: string;
  location: string;
  url: string;
}

export default function Home() {
  const cameras: Camera[] = camerasData;

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          Live Camera Dashboard
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Watch live cameras from around the world
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {cameras.map((camera) => (
            <div
              key={camera.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative pb-[56.25%]">
                <iframe
                  src={`${camera.url}?autoplay=1&mute=1`}
                  className="absolute top-0 left-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={camera.name}
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {camera.name}
                </h2>
                <p className="text-gray-600 text-sm mt-1">{camera.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
