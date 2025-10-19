export default async function Team() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const team = [
    { name: "Alice Johnson", role: "Senior Developer", status: "online" },
    { name: "Bob Smith", role: "UI/UX Designer", status: "online" },
    { name: "Charlie Brown", role: "Product Manager", status: "away" },
    { name: "Diana Prince", role: "DevOps Engineer", status: "offline" },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-blue-700">
        Team Members (@team slot)
      </h2>
      <div className="space-y-3">
        {team.map((member) => (
          <div key={member.name} className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{member.name}</p>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
            <span
              className={`text-xs px-2 py-1 rounded ${
                member.status === "online"
                  ? "bg-green-200 text-green-800"
                  : member.status === "away"
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-gray-200 text-gray-800"
              }`}
            >
              {member.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
