export default function PhotoModal() {
  console.log("📸 PhotoModal component rendered!");

  return (
    <div className="fixed inset-0 bg-red-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          🎉 INTERCEPTING ROUTE WORKS!
        </h2>
        <p className="mb-4">This is the modal from the intercepting route.</p>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close Modal
        </button>
      </div>
    </div>
  );
}
