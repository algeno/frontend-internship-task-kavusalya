import { Card, CardContent } from "@/components/ui/card";

export default function UserCard({ user }) {
  return (
    <Card
      className="relative flex flex-col items-center bg-white hover:shadow-lg transition 
    text-center shadow-md rounded-2xl p-4 border border-transparent"
    >
      <img
        src={user.profile_image}
        alt={user.name}
        className="w-20 h-20 rounded-full -mt-8 border-2 border-gray-300 bg-white shadow"
      />

      <CardContent className="p-0 flex flex-col items-center">
        <h2 className="text-lg font-bold leading-tight mt-2">{user.name}</h2>
        <p className="text-gray-600">Age: {user.age}</p>
        <p className="text-gray-600">Favorite Food: 🍴 {user.favoriteFood}</p>
        <p className="text-gray-600">Location: 📍 {user.location}</p>
      </CardContent>

      {user.isOnline && (
        <span className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full border border-white"></span>
      )}
    </Card>
  );
}
