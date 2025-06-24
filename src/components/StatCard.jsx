export default function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded shadow p-4 w-full">
      <h3 className="text-gray-600">{label}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
